// ==========================================================================
// OmniDev - Developer Power Utilities (DevToys Suite + Converters & Calculators)
// ==========================================================================

const DevTools = {
  activeTool: 'jwt',

  init() {
    this.switchTool('jwt');
    this.bindEvents();
    this.initGitWizard();
    this.initSystemDesignCalc();
  },

  switchTool(toolId) {
    if (window.soundEngine) window.soundEngine.playClick();
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

    if (toolId === 'curl') this.convertCurl();
    if (toolId === 'tokenizer') this.calculateTokens();
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
      if (headerEl) headerEl.textContent = '// Header will appear here...';
      if (payloadEl) payloadEl.textContent = '// Payload will appear here...';
      if (statusEl) statusEl.innerHTML = '<span class="text-slate-500">Paste a JWT token to decode</span>';
      return;
    }

    const parts = raw.split('.');
    if (parts.length !== 3) {
      if (statusEl) statusEl.innerHTML = '<span class="text-rose-400 font-semibold">⚠️ Invalid JWT format (expected 3 parts separated by dots)</span>';
      if (window.soundEngine) window.soundEngine.playError();
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

      if (headerEl) headerEl.textContent = JSON.stringify(header, null, 2);
      if (payloadEl) payloadEl.textContent = JSON.stringify(payload, null, 2);

      // Check Expiration
      if (payload.exp && statusEl) {
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
      } else if (statusEl) {
        statusEl.innerHTML = '<span class="text-sky-400 font-semibold">Valid JWT (No "exp" claim found)</span>';
      }

      if (window.soundEngine) window.soundEngine.playSuccess();
    } catch (e) {
      if (statusEl) statusEl.innerHTML = `<span class="text-rose-400 font-semibold">⚠️ Failed to decode: ${e.message}</span>`;
      if (window.soundEngine) window.soundEngine.playError();
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
  // 2. cURL to Polyglot Code Converter (JS, Python, Go, Rust, Node.js)
  // ------------------------------------------------------------------------
  convertCurl() {
    const curlInput = (document.getElementById('curl-input')?.value || '').trim();
    if (!curlInput) return;

    // Simple robust cURL parser
    let url = 'https://api.example.com/v1/resource';
    let method = 'GET';
    const headers = {};
    let data = null;

    const urlMatch = curlInput.match(/curl\s+(?:-[A-Za-z]+\s+)*['"]?([^'"]+)['"]?/);
    if (urlMatch) {
      const candidate = urlMatch[1].trim();
      if (candidate.startsWith('http')) url = candidate;
    }

    if (curlInput.includes('-X POST') || curlInput.includes('--request POST')) method = 'POST';
    else if (curlInput.includes('-X PUT') || curlInput.includes('--request PUT')) method = 'PUT';
    else if (curlInput.includes('-X DELETE') || curlInput.includes('--request DELETE')) method = 'DELETE';
    else if (curlInput.includes('-d ') || curlInput.includes('--data ') || curlInput.includes('--data-raw ')) method = 'POST';

    // Headers
    const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = headerRegex.exec(curlInput)) !== null) {
      const parts = match[1].split(':');
      if (parts.length >= 2) {
        headers[parts[0].trim()] = parts.slice(1).join(':').trim();
      }
    }

    // Data
    const dataMatch = curlInput.match(/(?:-d|--data|--data-raw)\s+['"]([^'"]+)['"]/);
    if (dataMatch) {
      data = dataMatch[1];
    }

    // Output target language
    const lang = document.getElementById('curl-target-lang')?.value || 'fetch';
    const outputEl = document.getElementById('curl-output');
    if (!outputEl) return;

    let result = '';

    if (lang === 'fetch') {
      result = `// Browser JavaScript fetch()\nconst response = await fetch('${url}', {\n  method: '${method}',\n  headers: ${JSON.stringify(headers, null, 4)}${data ? `,\n  body: ${data.startsWith('{') ? `JSON.stringify(${data})` : `'${data}'`}` : ''}\n});\nconst data = await response.json();\nconsole.log(data);`;
    } else if (lang === 'python') {
      result = `# Python requests\nimport requests\n\nurl = "${url}"\nheaders = ${JSON.stringify(headers, null, 4)}\n${data ? `payload = ${data}\nresponse = requests.${method.toLowerCase()}(url, json=payload, headers=headers)` : `response = requests.${method.toLowerCase()}(url, headers=headers)`}\n\nprint(response.status_code)\nprint(response.json())`;
    } else if (lang === 'go') {
      result = `// Go net/http\npackage main\n\nimport (\n\t"fmt"\n\t"net/http"\n\t"io"\n\t"strings"\n)\n\nfunc main() {\n\turl := "${url}"\n\tclient := &http.Client{}\n\treq, err := http.NewRequest("${method}", url, ${data ? `strings.NewReader(\`${data}\`)` : 'nil'})\n\tif err != nil { panic(err) }\n\n`;
      for (const [k, v] of Object.entries(headers)) {
        result += `\treq.Header.Set("${k}", "${v}")\n`;
      }
      result += `\n\tresp, err := client.Do(req)\n\tif err != nil { panic(err) }\n\tdefer resp.Body.Close()\n\tbody, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(body))\n}`;
    } else if (lang === 'rust') {
      result = `// Rust (reqwest)\nuse reqwest::header::HeaderMap;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn std.error::Error>> {\n    let client = reqwest::Client::new();\n    let res = client.${method.toLowerCase()}("${url}")\n`;
      for (const [k, v] of Object.entries(headers)) {
        result += `        .header("${k}", "${v}")\n`;
      }
      if (data) {
        result += `        .body(r#"${data}"#)\n`;
      }
      result += `        .send()\n        .await?;\n\n    println!("Status: {}", res.status());\n    let body = res.text().await?;\n    println!("Body: {}", body);\n    Ok(())\n}`;
    } else if (lang === 'axios') {
      result = `// Node.js Axios\nconst axios = require('axios');\n\nconst config = {\n  method: '${method.toLowerCase()}',\n  url: '${url}',\n  headers: ${JSON.stringify(headers, null, 4)}${data ? `,\n  data: ${data}` : ''}\n};\n\ntry {\n  const response = await axios(config);\n  console.log(response.data);\n} catch (error) {\n  console.error(error);\n}`;
    }

    outputEl.textContent = result;
  },

  loadSampleCurl() {
    const sample = `curl -X POST "https://api.github.com/repos/ilynx69/awesome-ai-devtools/issues" \\\n  -H "Authorization: Bearer ghp_token_here" \\\n  -H "Accept: application/vnd.github+json" \\\n  -H "Content-Type: application/json" \\\n  -d '{"title": "Bug found in parser", "body": "Steps to reproduce..."}'`;
    const input = document.getElementById('curl-input');
    if (input) {
      input.value = sample;
      this.convertCurl();
    }
  },

  // ------------------------------------------------------------------------
  // 3. AI Tokenizer & Cost Estimator
  // ------------------------------------------------------------------------
  calculateTokens() {
    const text = (document.getElementById('tokenizer-input')?.value || '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    // Approximated token count (avg 3.8 - 4 chars per token for English/code)
    const tokens = chars === 0 ? 0 : Math.ceil(chars / 3.9);

    const tokenCountEl = document.getElementById('token-count-val');
    const wordCountEl = document.getElementById('token-words-val');
    const charCountEl = document.getElementById('token-chars-val');

    if (tokenCountEl) tokenCountEl.textContent = tokens.toLocaleString();
    if (wordCountEl) wordCountEl.textContent = words.toLocaleString();
    if (charCountEl) charCountEl.textContent = chars.toLocaleString();

    // Cost Breakdown per 1,000 queries
    const costClaude = (tokens / 1000000) * 3.0; // $3 / 1M input
    const costGpt4o = (tokens / 1000000) * 2.5; // $2.5 / 1M input
    const costDeepSeek = (tokens / 1000000) * 0.14; // $0.14 / 1M input
    const costGemini = (tokens / 1000000) * 0.10; // $0.10 / 1M input

    const costListEl = document.getElementById('token-costs-list');
    if (costListEl) {
      costListEl.innerHTML = `
        <div class="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs">
          <span class="text-slate-300 font-medium">DeepSeek V3 ($0.14/1M)</span>
          <span class="font-mono text-emerald-400 font-bold">$${costDeepSeek.toFixed(6)}</span>
        </div>
        <div class="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs">
          <span class="text-slate-300 font-medium">Gemini 2.0 Flash ($0.10/1M)</span>
          <span class="font-mono text-emerald-400 font-bold">$${costGemini.toFixed(6)}</span>
        </div>
        <div class="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs">
          <span class="text-slate-300 font-medium">Claude 3.5 Sonnet ($3.00/1M)</span>
          <span class="font-mono text-sky-400 font-bold">$${costClaude.toFixed(6)}</span>
        </div>
        <div class="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-xs">
          <span class="text-slate-300 font-medium">GPT-4o ($2.50/1M)</span>
          <span class="font-mono text-sky-400 font-bold">$${costGpt4o.toFixed(6)}</span>
        </div>
      `;
    }
  },

  // ------------------------------------------------------------------------
  // 4. System Design Scale & Capacity Calculator
  // ------------------------------------------------------------------------
  initSystemDesignCalc() {
    this.calculateSystemCapacity();
  },

  calculateSystemCapacity() {
    const dau = parseFloat(document.getElementById('sys-dau')?.value || 10000000);
    const readsPerUser = parseFloat(document.getElementById('sys-reads')?.value || 50);
    const writesPerUser = parseFloat(document.getElementById('sys-writes')?.value || 5);
    const payloadKb = parseFloat(document.getElementById('sys-payload')?.value || 2);

    const secondsPerDay = 86400;

    // Total Requests
    const totalReads = dau * readsPerUser;
    const totalWrites = dau * writesPerUser;

    // QPS
    const readQps = Math.round(totalReads / secondsPerDay);
    const writeQps = Math.round(totalWrites / secondsPerDay);
    const totalQps = readQps + writeQps;
    const peakQps = totalQps * 2.5; // Standard 2.5x peak multiplier

    // Storage
    const dailyStorageMb = (totalWrites * payloadKb) / 1024;
    const dailyStorageGb = dailyStorageMb / 1024;
    const yearlyStorageTb = (dailyStorageGb * 365) / 1024;

    // Bandwidth
    const bandwidthIngressMbps = ((totalWrites * payloadKb * 8) / secondsPerDay) / 1024;
    const bandwidthEgressMbps = ((totalReads * payloadKb * 8) / secondsPerDay) / 1024;

    // 80/20 Caching Rule (Cache 20% of daily read data in RAM)
    const dailyReadGb = ((totalReads * payloadKb) / 1024) / 1024;
    const cacheRamGb = dailyReadGb * 0.2;

    const resTotalQps = document.getElementById('sys-res-qps');
    const resPeakQps = document.getElementById('sys-res-peak-qps');
    const resStorageYear = document.getElementById('sys-res-storage-year');
    const resCacheRam = document.getElementById('sys-res-ram');
    const resBandwidth = document.getElementById('sys-res-bandwidth');

    if (resTotalQps) resTotalQps.textContent = `${totalQps.toLocaleString()} QPS (${readQps.toLocaleString()} read / ${writeQps.toLocaleString()} write)`;
    if (resPeakQps) resPeakQps.textContent = `${Math.round(peakQps).toLocaleString()} QPS`;
    if (resStorageYear) resStorageYear.textContent = `${yearlyStorageTb.toFixed(2)} TB / year (${dailyStorageGb.toFixed(2)} GB / day)`;
    if (resCacheRam) resCacheRam.textContent = `${Math.ceil(cacheRamGb).toLocaleString()} GB RAM (80/20 Pareto rule)`;
    if (resBandwidth) resBandwidth.textContent = `In: ${bandwidthIngressMbps.toFixed(1)} Mbps | Out: ${bandwidthEgressMbps.toFixed(1)} Mbps`;
  },

  // ------------------------------------------------------------------------
  // 5. JSON Formatter & Validator
  // ------------------------------------------------------------------------
  formatJSON(spaces = 2) {
    const inputEl = document.getElementById('json-input');
    const msgEl = document.getElementById('json-message');
    if (!inputEl) return;

    try {
      const parsed = JSON.parse(inputEl.value);
      inputEl.value = JSON.stringify(parsed, null, spaces);
      if (msgEl) msgEl.innerHTML = `<span class="text-emerald-400">✓ Valid JSON formatted with ${spaces} spaces</span>`;
      if (window.soundEngine) window.soundEngine.playSuccess();
      window.showToast("Formatted JSON", "success");
    } catch (e) {
      if (msgEl) msgEl.innerHTML = `<span class="text-rose-400">⚠️ Syntax Error: ${e.message}</span>`;
      if (window.soundEngine) window.soundEngine.playError();
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
      if (msgEl) msgEl.innerHTML = `<span class="text-emerald-400">✓ JSON Minified successfully</span>`;
      if (window.soundEngine) window.soundEngine.playSuccess();
      window.showToast("Minified JSON", "success");
    } catch (e) {
      if (msgEl) msgEl.innerHTML = `<span class="text-rose-400">⚠️ Syntax Error: ${e.message}</span>`;
      if (window.soundEngine) window.soundEngine.playError();
    }
  },

  loadSampleJSON() {
    const sample = {
      project: "OmniDev Suite",
      version: "1.5.0",
      polyglot: ["JavaScript", "Python", "Rust", "TypeScript"],
      features: ["Prompt Studio", "Neural Copilot", "MCP Builder", "DevToys", "System Capacity"],
      systemCapacity: {
        targetDAU: 10000000,
        cachePolicy: "80/20 Pareto Memory",
        storageType: "Distributed NVMe SSD"
      }
    };
    const inputEl = document.getElementById('json-input');
    if (inputEl) {
      inputEl.value = JSON.stringify(sample, null, 2);
      this.formatJSON(2);
    }
  },

  // ------------------------------------------------------------------------
  // 6. Regex Playground
  // ------------------------------------------------------------------------
  testRegex() {
    const patternStr = document.getElementById('regex-pattern')?.value || '';
    const flags = document.getElementById('regex-flags')?.value || 'g';
    const testStr = document.getElementById('regex-test-string')?.value || '';
    const outputEl = document.getElementById('regex-output');
    const matchCountEl = document.getElementById('regex-match-count');

    if (!patternStr) {
      if (outputEl) outputEl.innerHTML = testStr;
      if (matchCountEl) matchCountEl.textContent = '0 matches';
      return;
    }

    try {
      const re = new RegExp(patternStr, flags);
      const matches = [...testStr.matchAll(re)];
      if (matchCountEl) matchCountEl.textContent = `${matches.length} match${matches.length === 1 ? '' : 'es'}`;

      if (matches.length === 0) {
        if (outputEl) outputEl.innerHTML = testStr;
        return;
      }

      let lastIndex = 0;
      let html = '';
      matches.forEach((m) => {
        const start = m.index;
        const end = start + m[0].length;
        html += this.escapeHTML(testStr.slice(lastIndex, start));
        html += `<mark class="bg-amber-400/30 text-amber-200 border-b-2 border-amber-400 px-0.5 rounded font-bold">${this.escapeHTML(m[0])}</mark>`;
        lastIndex = end;
      });
      html += this.escapeHTML(testStr.slice(lastIndex));
      if (outputEl) outputEl.innerHTML = html;
    } catch (e) {
      if (matchCountEl) matchCountEl.textContent = `Regex Error: ${e.message}`;
    }
  },

  applyRegexPreset(pattern, flags, sample) {
    if (window.soundEngine) window.soundEngine.playClick();
    const p = document.getElementById('regex-pattern');
    const f = document.getElementById('regex-flags');
    const s = document.getElementById('regex-test-string');
    if (p) p.value = pattern;
    if (f) f.value = flags;
    if (s) s.value = sample;
    this.testRegex();
    window.showToast("Applied preset regex", "info");
  },

  // ------------------------------------------------------------------------
  // 7. Crypto & Hash Generator
  // ------------------------------------------------------------------------
  async updateHashes() {
    const input = document.getElementById('hash-input')?.value || '';

    try {
      const b64El = document.getElementById('hash-base64');
      if (b64El) b64El.value = btoa(unescape(encodeURIComponent(input)));
    } catch (_) {}

    const urlEl = document.getElementById('hash-url');
    if (urlEl) urlEl.value = encodeURIComponent(input);

    if (crypto && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer256 = await crypto.subtle.digest('SHA-256', data);
      const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
      const sha256El = document.getElementById('hash-sha256');
      if (sha256El) sha256El.value = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

      const hashBuffer512 = await crypto.subtle.digest('SHA-512', data);
      const hashArray512 = Array.from(new Uint8Array(hashBuffer512));
      const sha512El = document.getElementById('hash-sha512');
      if (sha512El) sha512El.value = hashArray512.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  },

  generateUUID(count = 1) {
    if (window.soundEngine) window.soundEngine.playClick();
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
  // 8. Cron Humanizer
  // ------------------------------------------------------------------------
  explainCron() {
    const raw = (document.getElementById('cron-input')?.value || '').trim();
    const descEl = document.getElementById('cron-description');
    if (!descEl) return;
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
  // 9. Git Wizard
  // ------------------------------------------------------------------------
  initGitWizard() {
    const container = document.getElementById('git-scenarios-list');
    if (!container || !OMNI_DATA.gitRecipes) return;

    container.innerHTML = OMNI_DATA.gitRecipes.map((r) => `
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
      if (window.soundEngine) window.soundEngine.playCopy();
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
    document.getElementById('curl-input')?.addEventListener('input', () => this.convertCurl());
    document.getElementById('curl-target-lang')?.addEventListener('change', () => this.convertCurl());
    document.getElementById('tokenizer-input')?.addEventListener('input', () => this.calculateTokens());

    // System Design Calc inputs
    ['sys-dau', 'sys-reads', 'sys-writes', 'sys-payload'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calculateSystemCapacity());
    });
  }
};
