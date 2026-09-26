// ==========================================================================
// OmniDev - Main Application Controller & Orchestrator
// ==========================================================================

const App = {
  currentTab: 'prompt-studio',
  searchIndex: [],

  init() {
    this.initTheme();
    if (window.i18n) window.i18n.init();
    this.buildSearchIndex();
    this.bindGlobalEvents();
    this.renderAwesomeDirectory();
    this.renderCheatsheets();

    // Initialize Submodules
    PromptStudio.init();
    if (window.AIEngine) window.AIEngine.init();
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
    if (window.soundEngine) window.soundEngine.playClick();
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

    // Neural Copilot
    this.searchIndex.push({
      title: "Neural Copilot (Free AI Assistant)",
      subtitle: "AI Assistant, Code Lab & Vulnerability Auditor",
      action: () => this.switchTab('neural-copilot')
    });

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
      { name: "cURL to Polyglot Code Converter", id: "curl" },
      { name: "JSON Formatter & Validator", id: "json" },
      { name: "Regex Playground & Tester", id: "regex" },
      { name: "Cryptographic Hash & UUID Studio", id: "crypto" },
      { name: "AI Tokenizer & Cost Estimator", id: "tokenizer" },
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
      { code: 403, name: "Forbidden", desc: "The request was valid, but the server is refusing action. Permissions missing." },
      { code: 404, name: "Not Found", desc: "The requested resource could not be found but may be available in the future." },
      { code: 409, name: "Conflict", desc: "Indicates conflict in the current state of the target resource." },
      { code: 429, name: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time (Rate Limited)." },
      { code: 500, name: "Internal Server Error", desc: "A generic error message, given when an unexpected condition was encountered." },
      { code: 502, name: "Bad Gateway", desc: "The server was acting as a gateway or proxy and received an invalid response." },
      { code: 503, name: "Service Unavailable", desc: "The server cannot handle the request (overloaded or maintenance)." },
      { code: 504, name: "Gateway Timeout", desc: "The server did not receive a timely response from the upstream server." }
    ];

    const httpContainer = document.getElementById('cheatsheet-http-grid');
    if (httpContainer) {
      httpContainer.innerHTML = httpCodes.map(c => {
        let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if (c.code >= 300 && c.code < 400) badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        if (c.code >= 400 && c.code < 500) badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        if (c.code >= 500) badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/20';

        return `
          <div class="clean-panel p-3">
            <div class="flex items-center gap-2 mb-1">
              <span class="badge-clean ${badgeColor}">${c.code}</span>
              <span class="font-medium text-xs text-zinc-200">${c.name}</span>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed">${c.desc}</p>
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
    if (!container || !OMNI_DATA.awesomeTools) return;

    container.innerHTML = OMNI_DATA.awesomeTools.map(tool => `
      <a href="${tool.url}" target="_blank" rel="noopener noreferrer" 
         class="clean-panel p-3.5 flex flex-col justify-between group transition-all">
        <div>
          <div class="flex items-center justify-between mb-1.5">
            <h4 class="font-semibold text-xs text-zinc-200 group-hover:text-blue-400 transition-colors flex items-center gap-1">
              ${tool.name}
              <svg class="w-3 h-3 opacity-40 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </h4>
            <span class="badge-clean text-[10px]">${tool.license}</span>
          </div>
          <span class="text-[11px] font-mono text-zinc-400 block mb-1">${tool.category}</span>
          <p class="text-xs text-zinc-400 line-clamp-2 leading-relaxed">${tool.description}</p>
        </div>
        <div class="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Popularity</span>
          <span class="text-zinc-300 font-medium">★ ${tool.stars}</span>
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
    if (window.soundEngine) window.soundEngine.playClick();
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
        <svg class="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg class="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      `;
    }
  },

  bindGlobalEvents() {
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openCommandPalette();
      }
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

// Minimalist Toast System
window.showToast = function(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 z-50 flex flex-col gap-1.5 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  let dotColor = 'bg-zinc-400';
  if (type === 'success') dotColor = 'bg-emerald-400';
  else if (type === 'error') dotColor = 'bg-rose-400';

  toast.className = 'toast-clean pointer-events-auto';
  toast.innerHTML = `
    <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(6px)';
    toast.style.transition = 'all 0.15s ease';
    setTimeout(() => toast.remove(), 150);
  }, 2200);
};

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
