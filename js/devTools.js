// ==========================================================================
// OmniDev - Developer Power Utilities (DevToys Suite)
// ==========================================================================

const DevTools = {
  activeTool: 'jwt',

  init() {
    this.renderToolSelector();
    this.switchTool('jwt');
    this.bindEvents();
    this.initGitWizard();
  },

  renderToolSelector() {
    // Nav handled via data-dev-tool attributes
  },

  switchTool(toolId) {
    window.soundEngine.playClick();
    this.activeTool = toolId;

    document.querySelectorAll('.dev-tool-tab-btn').forEach(btn => {
      if (btn.getAttribute('data-tool') === toolId) {
        btn.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
        btn.classList.remove('bg-slate-900/50', 'text-slate-400', 'border-slate-800');
      } else {
        btn.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/40');
        btn.classList.add('bg-slate-900/50', 'text-slate-400', 'border-slate-800');
      }
    });

    document.querySelectorAll('.dev-tool-panel').forEach(panel => {
      if (panel.id === `dev-tool-${toolId}`) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  },

  // ------------------------------------------------------------------------
  // 1. JWT Inspector
  // ------------------------------------------------------------------------
  decodeJWT() {
    const raw = (document.getElementById('jwt-input')?.value || '').trim();
    const headerEl = document.getElementById('jwt-header-output');
    const payloadEl = document.getElementById('jwt-payload-output');
    const statusEl = document.getElementById('jwt-status');

    if (!raw) {
      headerEl.textContent = '// Header will appear here...';
      payloadEl.textContent = '// Payload will appear here...';
      statusEl.innerHTML = '<span class="text-slate-500">Paste a JWT token to decode</span>';
      return;
    }

    const parts = raw.split('.');
    if (parts.length !== 3) {
      statusEl.innerHTML = '<span class="text-rose-400 font-semibold">⚠️ Invalid JWT format (expected 3 parts separated by dots)</span>';
      window.soundEngine.playError();
      return;
    }

    try {
      const decodeBase64Url = (str) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return decodeURIComponent(escape(atob(base64)));
      };

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      headerEl.textContent = JSON.stringify(header, null, 2);
      payloadEl.textContent = JSON.stringify(payload, null, 2);

      // Check Expiration
      if (payload.exp) {
        const expTime = payload.exp * 1000;
        const now = Date.now();
        const diff = expTime - now;

        if (diff > 0) {
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          statusEl.innerHTML = `
            <span class="text-emerald-400 font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Valid Token (Expires in ${minutes}m ${seconds}s)
            </span>
          `;
        } else {
          statusEl.innerHTML = `
            <span class="text-rose-400 font-semibold flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              Expired (${new Date(expTime).toLocaleString()})
            </span>
          `;
        }
      } else {
        statusEl.innerHTML = '<span class="text-sky-400 font-semibold">Valid JWT (No "exp" claim found)</span>';
      }

      window.soundEngine.playSuccess();
    } catch (e) {
      statusEl.innerHTML = `<span class="text-rose-400 font-semibold">⚠️ Failed to decode: ${e.message}</span>`;
      window.soundEngine.playError();
    }
  },

  loadSampleJWT() {
    const sample = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEyMzQ1NiIsIm5hbWUiOiJBbGV4IFZlcnNlbiIsImVtYWlsIjoiYWxleEBleGFtcGxlLmRldiIsInJvbGVzIjpbImFkbWluIiwiZGV2ZWxvcGVyIl0sImlhdCI6MTczNTAwMDAwMCwiZXhwIjoyMDgwMDAwMDAwfQ.s_H7yZ5_aXF5k8d9U3q1L9Q9vL5vP8l7m4A2C1Z";
    const input = document.getElementById('jwt-input');
    if (input) {
      input.value = sample;
      this.decodeJWT();
    }
  },

  // ------------------------------------------------------------------------
  // 2. JSON Formatter & Validator
  // ------------------------------------------------------------------------
  formatJSON(spaces = 2) {
    const inputEl = document.getElementById('json-input');
    const msgEl = document.getElementById('json-message');
    if (!inputEl) return;

    try {
      const parsed = JSON.parse(inputEl.value);
      inputEl.value = JSON.stringify(parsed, null, spaces);
      msgEl.innerHTML = `<span class="text-emerald-400">✓ Valid JSON formatted with ${spaces} spaces</span>`;
      window.soundEngine.playSuccess();
      window.showToast("Formatted JSON", "success");
    } catch (e) {
      msgEl.innerHTML = `<span class="text-rose-400">⚠️ Syntax Error: ${e.message}</span>`;
      window.soundEngine.playError();
      window.showToast("Invalid JSON syntax", "error");
    }
  },

  minifyJSON() {
    const inputEl = document.getElementById('json-input');
    const msgEl = document.getElementById('json-message');
    if (!inputEl) return;

    try {
      const parsed = JSON.parse(inputEl.value);
      inputEl.value = JSON.stringify(parsed);
      msgEl.innerHTML = `<span class="text-emerald-400">✓ JSON Minified successfully</span>`;
      window.soundEngine.playSuccess();
      window.showToast("Minified JSON", "success");
    } catch (e) {
      msgEl.innerHTML = `<span class="text-rose-400">⚠️ Syntax Error: ${e.message}</span>`;
      window.soundEngine.playError();
    }
  },

  loadSampleJSON() {
    const sample = {
      project: "OmniDev Suite",
      version: "1.0.0",
      features: ["Prompt Studio", "MCP Builder", "AI Radar", "DevToys"],
      config: {
        theme: "cyber-glass",
        telemetry: false,
        performance: { cacheTime: 3600, retries: 3 }
      },
      tags: ["developer-tools", "ai-engineer", "productivity"]
    };
    const inputEl = document.getElementById('json-input');
    if (inputEl) {
      inputEl.value = JSON.stringify(sample, null, 2);
      this.formatJSON(2);
    }
  },

  // ------------------------------------------------------------------------
  // 3. Regex Playground
  // ------------------------------------------------------------------------
  testRegex() {
    const patternStr = document.getElementById('regex-pattern')?.value || '';
    const flags = document.getElementById('regex-flags')?.value || 'g';
    const testStr = document.getElementById('regex-test-string')?.value || '';
    const outputEl = document.getElementById('regex-output');
    const matchCountEl = document.getElementById('regex-match-count');

    if (!patternStr) {
      outputEl.innerHTML = testStr;
      matchCountEl.textContent = '0 matches';
      return;
    }

    try {
      const re = new RegExp(patternStr, flags);
      const matches = [...testStr.matchAll(re)];
      matchCountEl.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'}`;

      if (matches.length === 0) {
        outputEl.innerHTML = testStr;
        return;
      }

      // Safe escape and highlight matches
      let lastIndex = 0;
      let html = '';
      matches.forEach((m, idx) => {
        const start = m.index;
        const end = start + m[0].length;
        html += this.escapeHTML(testStr.slice(lastIndex, start));
        html += `<mark class="bg-amber-400/30 text-amber-200 border-b-2 border-amber-400 px-0.5 rounded font-bold">${this.escapeHTML(m[0])}</mark>`;
        lastIndex = end;
      });
      html += this.escapeHTML(testStr.slice(lastIndex));
      outputEl.innerHTML = html;
    } catch (e) {
      matchCountEl.textContent = `Regex Error: ${e.message}`;
    }
  },

  applyRegexPreset(pattern, flags, sample) {
    window.soundEngine.playClick();
    document.getElementById('regex-pattern').value = pattern;
    document.getElementById('regex-flags').value = flags;
    document.getElementById('regex-test-string').value = sample;
    this.testRegex();
    window.showToast("Applied preset regex", "info");
  },

  // ------------------------------------------------------------------------
  // 4. Crypto & Hash Generator
  // ------------------------------------------------------------------------
  async updateHashes() {
    const input = document.getElementById('hash-input')?.value || '';

    // Base64
    try {
      document.getElementById('hash-base64').value = btoa(unescape(encodeURIComponent(input)));
    } catch (_) {
      document.getElementById('hash-base64').value = '';
    }

    // URL Encode
    document.getElementById('hash-url').value = encodeURIComponent(input);

    // SHA-256
    if (crypto && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', data);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      document.getElementById('hash-sha256').value = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      // SHA-512
      const hashBuffer512 = await crypto.subtle.digest('SHA-512', data);
      const hashArray512 = Array.from(new Uint8Array(hashBuffer512));
      document.getElementById('hash-sha512').value = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  },

  generateUUID(count = 1) {
    window.soundEngine.playClick();
    const uuids = [];
    for (let i = 0; i < count; i++) {
      uuids.push(crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      }));
    }
    const outputEl = document.getElementById('uuid-output');
    if (outputEl) {
      outputEl.value = uuids.join('\n');
      window.showToast(`Generated ${count} UUID(s)`, "success");
    }
  },

  // ------------------------------------------------------------------------
  // 5. Cron Humanizer
  // ------------------------------------------------------------------------
  explainCron() {
    const raw = (document.getElementById('cron-input')?.value || '').trim();
    const descEl = document.getElementById('cron-description');
    const parts = raw.split(/\s+/);

    if (parts.length < 5) {
      descEl.textContent = 'Please enter a valid 5-part cron expression (e.g. */15 * * * *)';
      return;
    }

    const [min, hour, dom, mon, dow] = parts;
    let description = 'Runs ';

    if (min === '*' && hour === '*') {
      description += 'every minute';
    } else if (min.startsWith('*/')) {
      description += `every ${min.replace('*/', '')} minutes`;
    } else if (min === '0' && hour.startsWith('*/')) {
      description += `every ${hour.replace('*/', '')} hours at minute 0`;
    } else if (hour === '*' && min !== '*') {
      description += `at minute ${min} of every hour`;
    } else {
      description += `at ${hour.padStart(2, '0')}:${min.padStart(2, '0')}`;
    }

    if (dom !== '*') description += ` on day of month ${dom}`;
    if (mon !== '*') description += ` in month ${mon}`;
    if (dow !== '*') description += ` on weekday ${dow}`;

    descEl.textContent = description;
  },

  // ------------------------------------------------------------------------
  // 6. Git Scenario Wizard
  // ------------------------------------------------------------------------
  initGitWizard() {
    const container = document.getElementById('git-scenarios-list');
    if (!container) return;

    container.innerHTML = OMNI_DATA.gitRecipes.map((r, i) => `
      <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all">
        <h4 class="font-semibold text-sm text-slate-200 mb-1 flex items-center justify-between">
          <span>${r.scenario}</span>
          <button 
            onclick="DevTools.copySnippet(\`${r.command.replace(/`/g, '\\`')}\`)"
            class="text-xs text-sky-400 hover:text-sky-300 font-mono px-2 py-1 rounded bg-sky-500/10 border border-sky-500/30">
            Copy
          </button>
        </h4>
        <pre class="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-sky-300 overflow-x-auto my-2">${r.command}</pre>
        <p class="text-xs text-slate-400">${r.explanation}</p>
      </div>
    `).join('');
  },

  copySnippet(text) {
    navigator.clipboard.writeText(text).then(() => {
      window.soundEngine.playCopy();
      window.showToast("Command copied to clipboard!", "success");
    });
  },

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  },

  bindEvents() {
    document.getElementById('jwt-input')?.addEventListener('input', () => this.decodeJWT());
    document.getElementById('regex-pattern')?.addEventListener('input', () => this.testRegex());
    document.getElementById('regex-flags')?.addEventListener('input', () => this.testRegex());
    document.getElementById('regex-test-string')?.addEventListener('input', () => this.testRegex());
    document.getElementById('hash-input')?.addEventListener('input', () => this.updateHashes());
    document.getElementById('cron-input')?.addEventListener('input', () => this.explainCron());
  }
};
