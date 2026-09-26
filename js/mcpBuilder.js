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
      container.innerHTML = `<div class="p-6 col-span-full text-center text-slate-500 text-sm">No MCP servers match "${searchTerm}".</div>`;
      return;
    }

    container.innerHTML = filtered.map(s => {
      const isSelected = this.selectedServers.has(s.id);
      return `
        <div class="p-4 rounded-xl border transition-all ${isSelected ? 'bg-sky-500/10 border-sky-500/50 shadow-md shadow-sky-500/10' : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'}">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="check-${s.id}" 
                ${isSelected ? 'checked' : ''} 
                onchange="MCPBuilder.toggleServer('${s.id}')"
                class="w-4 h-4 rounded text-sky-500 bg-slate-950 border-slate-700 focus:ring-sky-500 cursor-pointer" />
              <label for="check-${s.id}" class="font-semibold text-sm text-slate-200 cursor-pointer">${s.name}</label>
            </div>
            <span class="badge-tech bg-slate-800/80 text-slate-300 border border-slate-700/50 text-[10px]">${s.category}</span>
          </div>

          <p class="text-xs text-slate-400 mt-2 mb-3 leading-relaxed">${s.description}</p>
          
          <div class="text-[11px] font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800/70 text-slate-300 overflow-x-auto">
            <span class="text-sky-400">${s.command}</span> ${s.args.join(' ')}
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
