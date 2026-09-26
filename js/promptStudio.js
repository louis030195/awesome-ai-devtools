// ==========================================================================
// OmniDev - Prompt Engineering Studio Logic
// ==========================================================================

const PromptStudio = {
  currentPrompt: null,
  activeCategory: 'All',

  init() {
    this.renderCategories();
    this.renderPromptCards();
    this.selectPrompt(OMNI_DATA.prompts[0].id);
    this.bindEvents();
  },

  renderCategories() {
    const container = document.getElementById('prompt-categories');
    if (!container) return;

    const categories = ['All', ...new Set(OMNI_DATA.prompts.map(p => p.category))];
    container.innerHTML = categories.map(cat => `
      <button 
        onclick="PromptStudio.filterCategory('${cat}')"
        class="tab-btn ${this.activeCategory === cat ? 'tab-active' : ''} text-xs">
        ${cat}
      </button>
    `).join('');
  },

  filterCategory(category) {
    if (window.soundEngine) window.soundEngine.playClick();
    this.activeCategory = category;
    this.renderCategories();
    this.renderPromptCards();
  },

  renderPromptCards() {
    const container = document.getElementById('prompt-cards-list');
    if (!container) return;

    const searchTerm = (document.getElementById('prompt-search')?.value || '').toLowerCase();
    const filtered = OMNI_DATA.prompts.filter(p => {
      const matchesCat = this.activeCategory === 'All' || p.category === this.activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchTerm) || 
                            p.description.toLowerCase().includes(searchTerm) ||
                            p.category.toLowerCase().includes(searchTerm);
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="p-6 text-center text-zinc-500 text-xs">No prompts found matching "${searchTerm}".</div>`;
      return;
    }

    container.innerHTML = filtered.map(p => {
      const isSelected = this.currentPrompt && this.currentPrompt.id === p.id;
      return `
        <div 
          onclick="PromptStudio.selectPrompt('${p.id}')"
          class="p-3 rounded-lg cursor-pointer transition-all border ${isSelected ? 'bg-zinc-800/80 border-zinc-600 text-white' : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700 text-zinc-300'}">
          <div class="flex items-center justify-between gap-2 mb-1">
            <span class="badge-clean text-[10px]">${p.category}</span>
            <span class="text-[10px] text-zinc-500 font-mono">${p.badge}</span>
          </div>
          <h4 class="font-medium text-xs text-zinc-200 line-clamp-1">${p.title}</h4>
          <p class="text-[11px] text-zinc-400 mt-0.5 line-clamp-2">${p.description}</p>
        </div>
      `;
    }).join('');
  },

  selectPrompt(id) {
    if (window.soundEngine) window.soundEngine.playClick();
    const prompt = OMNI_DATA.prompts.find(p => p.id === id);
    if (!prompt) return;
    this.currentPrompt = prompt;
    this.renderPromptCards();
    this.renderVariableInputs();
    this.updatePreview();
  },

  renderVariableInputs() {
    const container = document.getElementById('prompt-variables-form');
    if (!container || !this.currentPrompt) return;

    document.getElementById('prompt-detail-title').textContent = this.currentPrompt.title;
    document.getElementById('prompt-detail-desc').textContent = this.currentPrompt.description;

    if (!this.currentPrompt.variables || this.currentPrompt.variables.length === 0) {
      container.innerHTML = `<p class="text-xs text-zinc-500">No variables required for this prompt.</p>`;
      return;
    }

    container.innerHTML = this.currentPrompt.variables.map(v => {
      const isLong = v.default.length > 50 || v.default.includes('\n');
      return `
        <div class="space-y-1">
          <label class="block text-xs font-medium text-zinc-300 font-mono flex items-center justify-between">
            <span>{{${v.key}}}</span>
            <span class="text-[11px] font-normal text-zinc-400">${v.label}</span>
          </label>
          ${isLong ? `
            <textarea 
              data-var="${v.key}" 
              rows="3" 
              class="clean-input w-full p-2.5 text-xs text-zinc-200 resize-y"
              oninput="PromptStudio.updatePreview()">${v.default}</textarea>
          ` : `
            <input 
              type="text" 
              data-var="${v.key}" 
              value="${v.default}" 
              class="clean-input w-full p-2 text-xs text-zinc-200"
              oninput="PromptStudio.updatePreview()" />
          `}
        </div>
      `;
    }).join('');
  },

  updatePreview() {
    if (!this.currentPrompt) return;
    const previewEl = document.getElementById('prompt-preview-output');
    if (!previewEl) return;

    let output = this.currentPrompt.template;
    const inputs = document.querySelectorAll('#prompt-variables-form [data-var]');
    inputs.forEach(input => {
      const key = input.getAttribute('data-var');
      const val = input.value;
      const regex = new RegExp(`{{${key}}}`, 'g');
      output = output.replace(regex, val);
    });

    previewEl.value = output;
  },

  sendToCopilot() {
    const previewEl = document.getElementById('prompt-preview-output');
    if (!previewEl || !previewEl.value) return;
    if (window.AIEngine) {
      window.AIEngine.sendPromptFromStudio(previewEl.value);
      if (window.soundEngine) window.soundEngine.playSuccess();
      window.showToast("Sent to AI Copilot!", "success");
    }
  },

  copyPrompt() {
    const previewEl = document.getElementById('prompt-preview-output');
    if (!previewEl) return;
    navigator.clipboard.writeText(previewEl.value).then(() => {
      window.soundEngine.playCopy();
      window.showToast("Prompt copied to clipboard!", "success");
    }).catch(() => {
      window.showToast("Failed to copy", "error");
    });
  },

  downloadPrompt() {
    const previewEl = document.getElementById('prompt-preview-output');
    if (!previewEl || !this.currentPrompt) return;

    const blob = new Blob([previewEl.value], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.currentPrompt.id}-${this.currentPrompt.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
    window.soundEngine.playSuccess();
    window.showToast("Downloaded prompt as Markdown!", "success");
  },

  bindEvents() {
    const searchInput = document.getElementById('prompt-search');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderPromptCards());
    }
  }
};
