// ==========================================================================
// OmniDev - Model Context Protocol (MCP) Configurator
// ==========================================================================

const MCPBuilder = {
  selectedServers: new Set(['mcp-filesystem', 'mcp-github']),
  serverConfigs: {},

  init() {
    this.initDefaultConfigs();
    this.renderServerList();
    this.updateConfigPreview();
    this.bindEvents();
  },

  initDefaultConfigs() {
    OMNI_DATA.mcpServers.forEach(server => {
      this.serverConfigs[server.id] = {
        command: server.command,
        args: [...server.args],
        env: { ...server.env }
      };
    });
  },

  renderServerList() {
    const container = document.getElementById('mcp-servers-grid');
    if (!container) return;

    const searchTerm = (document.getElementById('mcp-search')?.value || '').toLowerCase();
    const filtered = OMNI_DATA.mcpServers.filter(s => 
      s.name.toLowerCase().includes(searchTerm) || 
      s.description.toLowerCase().includes(searchTerm) ||
      s.category.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 col-span-full text-center text-zinc-500 text-xs">No MCP servers match "${searchTerm}".</div>`;
      return;
    }

    container.innerHTML = filtered.map(s => {
      const isSelected = this.selectedServers.has(s.id);
      return `
        <div class="clean-panel p-3.5 transition-all ${isSelected ? 'border-zinc-500 bg-zinc-850/60' : 'bg-zinc-900/40'}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="check-${s.id}" 
                ${isSelected ? 'checked' : ''} 
                onchange="MCPBuilder.toggleServer('${s.id}')"
                class="w-3.5 h-3.5 rounded text-blue-600 bg-zinc-950 border-zinc-700 focus:ring-0 cursor-pointer" />
              <label for="check-${s.id}" class="font-medium text-xs text-zinc-200 cursor-pointer">${s.name}</label>
            </div>
            <span class="badge-clean text-[10px]">${s.category}</span>
          </div>

          <p class="text-xs text-zinc-400 mt-1.5 mb-2.5 leading-relaxed">${s.description}</p>
          
          <div class="text-[11px] font-mono bg-zinc-950 p-2 rounded border border-zinc-800 text-zinc-300 overflow-x-auto">
            <span class="text-zinc-400">${s.command}</span> ${s.args.join(' ')}
          </div>
        </div>
      `;
    }).join('');
  },

  toggleServer(id) {
    window.soundEngine.playClick();
    if (this.selectedServers.has(id)) {
      this.selectedServers.delete(id);
    } else {
      this.selectedServers.add(id);
    }
    this.renderServerList();
    this.updateConfigPreview();
  },

  selectAll() {
    window.soundEngine.playClick();
    OMNI_DATA.mcpServers.forEach(s => this.selectedServers.add(s.id));
    this.renderServerList();
    this.updateConfigPreview();
    window.showToast("Selected all MCP servers", "info");
  },

  clearAll() {
    window.soundEngine.playClick();
    this.selectedServers.clear();
    this.renderServerList();
    this.updateConfigPreview();
    window.showToast("Cleared selection", "info");
  },

  updateConfigPreview() {
    const previewEl = document.getElementById('mcp-config-json');
    if (!previewEl) return;

    const mcpServersObj = {};
    this.selectedServers.forEach(id => {
      const serverDef = OMNI_DATA.mcpServers.find(s => s.id === id);
      if (!serverDef) return;

      const serverKey = serverDef.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const conf = this.serverConfigs[id] || { command: serverDef.command, args: serverDef.args, env: serverDef.env };

      const entry = {
        command: conf.command,
        args: conf.args
      };

      if (conf.env && Object.keys(conf.env).length > 0) {
        entry.env = conf.env;
      }

      mcpServersObj[serverKey] = entry;
    });

    const fullConfig = {
      mcpServers: mcpServersObj
    };

    previewEl.textContent = JSON.stringify(fullConfig, null, 2);
  },

  copyConfig() {
    const previewEl = document.getElementById('mcp-config-json');
    if (!previewEl) return;
    navigator.clipboard.writeText(previewEl.textContent).then(() => {
      window.soundEngine.playCopy();
      window.showToast("Config JSON copied to clipboard!", "success");
    }).catch(() => {
      window.showToast("Failed to copy JSON", "error");
    });
  },

  downloadConfig() {
    const previewEl = document.getElementById('mcp-config-json');
    if (!previewEl) return;

    const blob = new Blob([previewEl.textContent], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claude_desktop_config.json`;
    a.click();
    URL.revokeObjectURL(url);
    window.soundEngine.playSuccess();
    window.showToast("Downloaded claude_desktop_config.json!", "success");
  },

  bindEvents() {
    const search = document.getElementById('mcp-search');
    if (search) {
      search.addEventListener('input', () => this.renderServerList());
    }
  }
};
