// ==========================================================================
// OmniDev - AI Radar & Interactive Latency Numbers
// ==========================================================================

const AIRadar = {
  activeTypeFilter: 'All',

  init() {
    this.renderModelsTable();
    this.renderLatencyCheatsheet();
    this.bindEvents();
  },

  renderModelsTable() {
    const container = document.getElementById('ai-models-tbody');
    if (!container) return;

    const searchTerm = (document.getElementById('ai-model-search')?.value || '').toLowerCase();
    const filtered = OMNI_DATA.aiModels.filter(m => {
      const matchType = this.activeTypeFilter === 'All' || m.type === this.activeTypeFilter;
      const matchSearch = m.name.toLowerCase().includes(searchTerm) ||
                          m.provider.toLowerCase().includes(searchTerm) ||
                          m.bestFor.toLowerCase().includes(searchTerm);
      return matchType && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-zinc-500 text-xs">No models found.</td></tr>`;
      return;
    }

    container.innerHTML = filtered.map(m => `
      <tr class="hover:bg-zinc-850/50 transition-colors">
        <td class="p-3 font-medium text-zinc-200">
          <div class="flex items-center gap-1.5">
            <span>${m.name}</span>
            <span class="badge-clean text-[10px]">
              ${m.badge}
            </span>
          </div>
          <div class="text-[11px] text-zinc-500 font-mono mt-0.5">${m.provider}</div>
        </td>
        <td class="p-3 font-mono text-xs text-zinc-300">${m.context}</td>
        <td class="p-3 font-mono text-xs text-zinc-300">
          <div><span class="text-zinc-500">In:</span> ${m.inputPrice}</div>
          <div><span class="text-zinc-500">Out:</span> ${m.outputPrice}</div>
        </td>
        <td class="p-3 text-xs text-emerald-400 font-mono font-medium">${m.codingScore}</td>
        <td class="p-3 text-xs text-zinc-400 font-mono">${m.speed}</td>
        <td class="p-3 text-xs text-zinc-300 max-w-xs">${m.bestFor}</td>
      </tr>
    `).join('');
  },

  filterType(type) {
    if (window.soundEngine) window.soundEngine.playClick();
    this.activeTypeFilter = type;
    document.querySelectorAll('.radar-filter-btn').forEach(b => {
      if (b.getAttribute('data-type') === type) {
        b.className = 'radar-filter-btn tab-btn tab-active text-xs';
      } else {
        b.className = 'radar-filter-btn tab-btn text-xs';
      }
    });
    this.renderModelsTable();
  },

  renderLatencyCheatsheet() {
    const container = document.getElementById('latency-list');
    if (!container) return;

    container.innerHTML = OMNI_DATA.latencyNumbers.map(item => {
      const logVal = Math.log10(item.timeNs + 1);
      const percent = Math.min(100, Math.max(3, (logVal / 8.2) * 100));

      return `
        <div class="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850 hover:border-zinc-700 transition-all">
          <div class="flex items-center justify-between text-xs mb-1">
            <span class="font-medium text-zinc-300">${item.operation}</span>
            <div class="flex items-center gap-2">
              <span class="font-mono text-zinc-200 font-medium">${item.humanTime}</span>
              <span class="text-[11px] text-zinc-500 hidden sm:inline">(~${item.comparative})</span>
            </div>
          </div>
          <div class="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden">
            <div class="h-full bg-blue-500 rounded-full" style="width: ${percent}%;"></div>
          </div>
        </div>
      `;
    }).join('');
  },

  bindEvents() {
    const search = document.getElementById('ai-model-search');
    if (search) {
      search.addEventListener('input', () => this.renderModelsTable());
    }
  }
};
