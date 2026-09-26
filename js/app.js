// ==========================================================================
// OmniDev - Main Application Controller & Orchestrator
// ==========================================================================

const App = {
  currentTab: 'prompt-studio',
  searchIndex: [],

  init() {
    this.initTheme();
    this.buildSearchIndex();
    this.bindGlobalEvents();
    this.renderAwesomeDirectory();
    this.renderCheatsheets();

    // Initialize Submodules
    PromptStudio.init();
    MCPBuilder.init();
    AIRadar.init();
    DevTools.init();

    // Check URL hash for direct tab linking
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`tab-${hash}`)) {
      this.switchTab(hash);
    } else {
      this.switchTab('prompt-studio');
    }
  },

  switchTab(tabId) {
    window.soundEngine.playClick();
    this.currentTab = tabId;
    window.location.hash = tabId;

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('tab-active');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('tab-active');
        btn.classList.add('text-slate-400');
      }
    });

    document.querySelectorAll('.main-tab-content').forEach(section => {
      if (section.id === `tab-${tabId}`) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // ------------------------------------------------------------------------
  // Command Palette & Global Search
  // ------------------------------------------------------------------------
  buildSearchIndex() {
    this.searchIndex = [];

    // Index prompts
    OMNI_DATA.prompts.forEach(p => {
      this.searchIndex.push({
        title: p.title,
        subtitle: `Prompt: ${p.category}`,
        action: () => {
          this.switchTab('prompt-studio');
          PromptStudio.selectPrompt(p.id);
        }
      });
    });

    // Index MCP servers
    OMNI_DATA.mcpServers.forEach(s => {
      this.searchIndex.push({
        title: s.name,
        subtitle: `MCP Server (${s.category})`,
        action: () => {
          this.switchTab('mcp-builder');
        }
      });
    });

    // Index DevTools
    const tools = [
      { name: "JWT Inspector & Decoder", id: "jwt" },
      { name: "JSON Formatter & Validator", id: "json" },
      { name: "Regex Playground & Tester", id: "regex" },
      { name: "Cryptographic Hash & UUID Studio", id: "crypto" },
      { name: "Cron Expression Humanizer", id: "cron" },
      { name: "Git Disaster Recovery Wizard", id: "git" }
    ];

    tools.forEach(t => {
      this.searchIndex.push({
        title: t.name,
        subtitle: "Developer Power Tool",
        action: () => {
          this.switchTab('dev-tools');
          DevTools.switchTool(t.id);
        }
      });
    });

    // Index AI Models
    OMNI_DATA.aiModels.forEach(m => {
      this.searchIndex.push({
        title: `${m.name} (${m.provider})`,
        subtitle: `AI Model: ${m.codingScore}`,
        action: () => {
          this.switchTab('ai-radar');
        }
      });
    });
  },

  openCommandPalette() {
    window.soundEngine.playClick();
    const modal = document.getElementById('command-palette-modal');
    const input = document.getElementById('palette-input');
    if (!modal || !input) return;

    modal.classList.remove('hidden');
    input.value = '';
    this.filterPalette('');
    setTimeout(() => input.focus(), 50);
  },

  closeCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    if (modal) modal.classList.add('hidden');
  },

  filterPalette(query) {
    const resultsContainer = document.getElementById('palette-results');
    if (!resultsContainer) return;

    const q = query.toLowerCase().trim();
    const filtered = this.searchIndex.filter(item => 
      item.title.toLowerCase().includes(q) || 
      item.subtitle.toLowerCase().includes(q)
    ).slice(0, 8);

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-500">No matching commands or tools found.</div>`;
      return;
    }

    resultsContainer.innerHTML = filtered.map((item, idx) => `
      <div 
        onclick="App.executePaletteItem(${idx})"
        class="palette-item p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-sky-500/20 hover:text-white transition-all text-slate-300">
        <div>
          <div class="font-medium text-xs">${item.title}</div>
          <div class="text-[11px] text-slate-500">${item.subtitle}</div>
        </div>
        <span class="text-[10px] text-slate-500 font-mono">Jump ↵</span>
      </div>
    `).join('');

    this.currentFilteredPalette = filtered;
  },

  executePaletteItem(index) {
    if (this.currentFilteredPalette && this.currentFilteredPalette[index]) {
      this.currentFilteredPalette[index].action();
      this.closeCommandPalette();
    }
  },

  // ------------------------------------------------------------------------
  // Cheatsheets (HTTP Status & Docker)
  // ------------------------------------------------------------------------
  renderCheatsheets() {
    const httpCodes = [
      { code: 200, name: "OK", desc: "Standard response for successful HTTP requests." },
      { code: 201, name: "Created", desc: "The request has been fulfilled, resulting in the creation of a new resource." },
      { code: 204, name: "No Content", desc: "The server successfully processed the request and is not returning any content." },
      { code: 301, name: "Moved Permanently", desc: "This and all future requests should be directed to the given URI." },
      { code: 304, name: "Not Modified", desc: "Indicates that the resource has not been modified since the version specified by the request headers." },
      { code: 400, name: "Bad Request", desc: "The server cannot or will not process the request due to an apparent client error." },
      { code: 401, name: "Unauthorized", desc: "Authentication is required and has failed or has not yet been provided." },
      { code: 403, name: "Forbidden", desc: "The request was valid, but the server is refusing action. The user might not have necessary permissions." },
      { code: 404, name: "Not Found", desc: "The requested resource could not be found but may be available in the future." },
      { code: 409, name: "Conflict", desc: "Indicates that the request could not be processed because of conflict in the current state of the resource." },
      { code: 429, name: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time (Rate Limited)." },
      { code: 500, name: "Internal Server Error", desc: "A generic error message, given when an unexpected condition was encountered." },
      { code: 502, name: "Bad Gateway", desc: "The server was acting as a gateway or proxy and received an invalid response from upstream." },
      { code: 503, name: "Service Unavailable", desc: "The server cannot handle the request (because it is overloaded or down for maintenance)." },
      { code: 504, name: "Gateway Timeout", desc: "The server was acting as a gateway or proxy and did not receive a timely response." }
    ];

    const httpContainer = document.getElementById('cheatsheet-http-grid');
    if (httpContainer) {
      httpContainer.innerHTML = httpCodes.map(c => {
        let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
        if (c.code >= 300 && c.code < 400) badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/30';
        if (c.code >= 400 && c.code < 500) badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
        if (c.code >= 500) badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';

        return `
          <div class="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge-tech font-mono ${badgeColor}">${c.code}</span>
              <span class="font-semibold text-xs text-slate-200">${c.name}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${c.desc}</p>
          </div>
        `;
      }).join('');
    }
  },

  // ------------------------------------------------------------------------
  // Awesome Directory
  // ------------------------------------------------------------------------
  renderAwesomeDirectory() {
    const container = document.getElementById('awesome-tools-grid');
    if (!container) return;

    container.innerHTML = OMNI_DATA.awesomeTools.map(tool => `
      <a href="${tool.url}" target="_blank" rel="noopener noreferrer" 
         class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 glass-panel-hover transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-bold text-sm text-slate-200 group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
              ${tool.name}
              <svg class="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </h4>
            <span class="badge-tech bg-slate-800 text-slate-400 text-[10px]">${tool.license}</span>
          </div>
          <span class="text-[11px] font-mono text-sky-400 block mb-1.5">${tool.category}</span>
          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">${tool.description}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Popularity</span>
          <span class="text-amber-400 font-semibold">★ ${tool.stars}</span>
        </div>
      </a>
    `).join('');
  },

  // ------------------------------------------------------------------------
  // Theme & Sound Controls
  // ------------------------------------------------------------------------
  initTheme() {
    const isLight = localStorage.getItem('omnidev_theme') === 'light';
    if (isLight) document.body.classList.add('light-theme');
    this.updateSoundIcon();
  },

  toggleTheme() {
    window.soundEngine.playClick();
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('omnidev_theme', isLight ? 'light' : 'dark');
    this.showToast(`Switched to ${isLight ? 'Light' : 'Dark'} Mode`, 'info');
  },

  toggleSound() {
    const enabled = window.soundEngine.toggle();
    this.updateSoundIcon();
    this.showToast(`Sound FX ${enabled ? 'Enabled' : 'Muted'}`, 'info');
  },

  updateSoundIcon() {
    const btn = document.getElementById('sound-toggle-btn');
    if (!btn) return;
    if (window.soundEngine.enabled) {
      btn.innerHTML = `
        <svg class="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      `;
    }
  },

  bindGlobalEvents() {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openCommandPalette();
      }
      // Escape
      if (e.key === 'Escape') {
        this.closeCommandPalette();
      }
    });

    const paletteInput = document.getElementById('palette-input');
    if (paletteInput) {
      paletteInput.addEventListener('input', (e) => this.filterPalette(e.target.value));
    }
  }
};

// Global Toast System
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  let borderColor = 'border-sky-500/40';
  let dotColor = 'bg-sky-400';
  if (type === 'success') {
    borderColor = 'border-emerald-500/40';
    dotColor = 'bg-emerald-400';
  } else if (type === 'error') {
    borderColor = 'border-rose-500/40';
    dotColor = 'bg-rose-400';
  }

  toast.className = `toast-animate pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/95 backdrop-blur-md border ${borderColor} text-slate-100 text-xs font-medium shadow-xl shadow-black/40`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${dotColor}"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 2500);
};

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
