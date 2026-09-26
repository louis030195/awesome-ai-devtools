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
      container.innerHTML = `<tr><td colspan="7" class="p-6 text-center text-slate-500 text-sm">No models found.</td></tr>`;
      return;
    }

    container.innerHTML = filtered.map(m => `
      <tr class="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors">
        <td class="p-3.5 font-semibold text-slate-200">
          <div class="flex items-center gap-2">
            <span>${m.name}</span>
            <span class="badge-tech ${m.type === 'Proprietary' ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'} text-[10px]">
              ${m.badge}
            </span>
          </div>
          <div class="text-[11px] text-slate-500 font-mono mt-0.5">${m.provider}</div>
        </td>
        <td class="p-3.5 font-mono text-xs text-sky-400">${m.context}</td>
        <td class="p-3.5 font-mono text-xs text-slate-300">
          <div><span class="text-slate-500">In:</span> ${m.inputPrice}</div>
          <div><span class="text-slate-500">Out:</span> ${m.outputPrice}</div>
        </td>
        <td class="p-3.5 text-xs text-emerald-400 font-mono font-medium">${m.codingScore}</td>
        <td class="p-3.5 text-xs text-slate-400 font-mono">${m.speed}</td>
        <td class="p-3.5 text-xs text-slate-300 max-w-xs">${m.bestFor}</td>
      </tr>
    `).join('');
  },

  filterType(type) {
    window.soundEngine.playClick();
    this.activeTypeFilter = type;
    document.querySelectorAll('.radar-filter-btn').forEach(b => {
      if (b.getAttribute('data-type') === type) {
        b.className = 'radar-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm';
      } else {
        b.className = 'radar-filter-btn px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800/40 text-slate-400 hover:text-white border border-slate-700/50';
      }
    });
    this.renderModelsTable();
  },

  renderLatencyCheatsheet() {
    const container = document.getElementById('latency-list');
    if (!container) return;

    container.innerHTML = OMNI_DATA.latencyNumbers.map(item => {
      // Calculate a visual log scale bar width (from 0.5ns to 150ms)
      const logVal = Math.log10(item.timeNs + 1);
      const percent = Math.min(100, Math.max(3, (logVal / 8.2) * 100));

      return `
        <div class="p-3 rounded-xl bg-slate-900/40 border border-slate-800 hover:border-sky-500/30 transition-all">
          <div class="flex items-center justify-between text-xs mb-1.5">
            <span class="font-semibold text-slate-200">${item.operation}</span>
            <div class="flex items-center gap-3">
              <span class="font-mono text-sky-400 font-medium">${item.humanTime}</span>
              <span class="text-[11px] text-slate-500 italic hidden sm:inline">(~${item.comparative})</span>
            </div>
          </div>
          <div class="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div class="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full" style="width: ${percent}%;"></div>
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
