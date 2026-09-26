<div align="center">

# ⚡ OmniDev // Awesome AI DevTools

### *The Ultimate All-in-One AI Engineer & Modern Developer Cockpit*

[![GitHub Stars](https://img.shields.io/github/stars/ilynx69/awesome-ai-devtools?style=for-the-badge&logo=github&color=38bdf8)](https://github.com/ilynx69/awesome-ai-devtools/stargazers)
[![Live Demo](https://img.shields.io/badge/Demo-Live_Website-10b981?style=for-the-badge&logo=github-pages&logoColor=white)](https://ilynx69.github.io/awesome-ai-devtools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-c084fc?style=for-the-badge)](LICENSE)
[![Polyglot Architecture](https://img.shields.io/badge/Languages-JS_|_Python_|_Rust_|_TS-6366f1?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f59e0b?style=for-the-badge)](CONTRIBUTING.md)

<br />

[**English**](README.md) • [**Русский**](README.ru.md) • [**中文 (简体)**](README.zh.md)

<br />

[**🌐 Explore Live Demo**](https://ilynx69.github.io/awesome-ai-devtools/) • [**✨ Features**](#-key-features) • [**💻 Polyglot Architecture**](#-meaningful-polyglot-architecture) • [**⚡ Quickstart**](#-quickstart) • [**🤝 Contributing**](#-contributing)

<br />

```text
  ___                      _ ____              
 / _ \ _ __ ___  _ __ (_)  _ \  _____   __
| | | | '_ ` _ \| '_ \| | | | |/ _ \ \ / /
| |_| | | | | | | | | | | |_| |  __/\ V / 
 \___/|_| |_| |_|_| |_|_|____/ \___| \_/  
       >> NEXT-GEN AI DEVELOPER SUITE <<
```

</div>

---

## 🌟 What is OmniDev?

**OmniDev** is an ultra-fast, client-side, zero-latency dashboard and polyglot developer toolkit engineered for **AI engineers, software architects, and full-stack developers**. 

It eliminates tab clutter by unifying your most essential daily workflows into a sleek, cyberpunk-inspired glassmorphic interface:
- **Interactive Free AI Copilot & Code Lab**: Chat with free cloud models and offline heuristic engines for security audits, refactoring, and test generation with zero cost and no API keys required.
- **Multilingual Support**: Instant 1-click localization between **English**, **Russian (Русский)**, and **Chinese (中文)**.
- **Prompt Engineering Studio** with variable template injection (`{{system_name}}`, `{{code}}`).
- **Model Context Protocol (MCP)** visual server selector & configuration builder for Claude Desktop and Cursor.
- **System Design Scale & Capacity Calculator**: Estimate QPS, yearly storage growth, network bandwidth, and Pareto 80/20 RAM cache memory based on DAU.
- **cURL to Polyglot Code Converter**: Convert cURL commands into JavaScript `fetch()`, Python `requests`, Go `http`, Rust `reqwest`, or Node.js `axios`.
- **AI Tokenizer & Cost Estimator**: Count tokens and estimate inference costs across Claude 3.5 Sonnet, GPT-4o, DeepSeek V3, and Gemini 2.0 Flash.
- **Offline DevToys Suite**: JWT Inspector with live expiration timer, JSON Studio, Regex Playground, Cryptographic Hashes & UUIDs, Cron Explainer, and Git Wizard.

---

## 🚀 Key Features

### 🤖 1. Free Neural Copilot & AI Code Lab
- **Free Cloud AI Access**: Ready out of the box using free AI endpoints with zero setup friction.
- **Intelligent Offline Heuristic Engine**: Works 100% offline and privately, providing OWASP vulnerability audits, SOLID refactoring, and unit test synthesis even without internet access.
- **Local Ollama & Custom Key Support**: Seamlessly connect to `localhost:11434` or use your own Groq / OpenRouter API keys.
- **1-Click Quick Actions**: Security Audit, Clean Refactor, Unit Test Generation, Convert to Rust/Python, Big-O Complexity Analysis.

### ⚡ 2. Interactive Prompt Engineering Studio
- **Dynamic Variable Injection**: Fill in variables and watch your prompt compile in real time.
- **Direct AI Testing**: Click **"Send to AI Copilot 🤖"** to immediately test the prompt with live AI output.
- **Export & Download**: One-click download as clean `.md` Markdown files.

### 🔌 3. Model Context Protocol (MCP) Configurator
- **Official & Community Catalog**: Filesystem, PostgreSQL, GitHub, Brave Search, Puppeteer, Memory Graph, Docker, Slack.
- **Instant `claude_desktop_config.json` Generation**: Toggle the servers you need and copy or download the generated configuration.
- **OS Path Hints**: Quick guide on config locations across Windows (`%APPDATA%`), macOS (`~/Library`), and Linux (`~/.config`).

### 🛠️ 4. Expanded DevToys Utilities
- 🔄 **cURL to Polyglot Converter**: Convert cURL to JavaScript, Python, Go, Rust, and Node.js.
- 💰 **AI Tokenizer**: Approximate BPE token count and cost comparison table.
- 🔑 **JWT Inspector**: Decode headers & payload claims with live countdown expiration checker.
- ✨ **JSON Studio**: Beautify (2 or 4 spaces), validate with line error reporting, and minify.
- 🔍 **Regex Playground**: Real-time evaluation against test strings with pre-configured recipes (Email, URL, IPv4, SemVer).
- 🔐 **Cryptographic Hashes & UUID Studio**: Instant client-side SHA-256, SHA-512, Base64, URL encoding, and batch UUID v4 generation.
- ⏰ **Cron Humanizer**: Natural English translation of 5-part cron expressions.
- 🐙 **Git Disaster Recovery Wizard**: Interactive remedies for undoing commits, squashing, and fixing branches.

### 📐 5. System Design Capacity & Scale Calculator
- Enter target DAU, read/write ratio, and average payload size:
- Computes exact Average QPS, Peak QPS (2.5x), Yearly Storage (TB), Network Bandwidth (Mbps), and RAM needed for 80/20 Caching.

---

## 💻 Meaningful Polyglot Architecture

OmniDev is not just a web page; it is built with purpose across multiple modern programming languages:

| Language | Path | Purpose & Functionality |
| :--- | :--- | :--- |
| **JavaScript (ES6+)** | `js/`, `index.html` | High-performance client-side web application running natively on GitHub Pages with zero build step. |
| **Python** | `python/omnidev.py` | Command-line CLI companion for AI and ML engineers to compile prompts, query free AI, and compute capacity. |
| **Rust** | `rust/src/main.rs` | Blazing-fast native systems binary for capacity calculations and MCP configuration export. |
| **TypeScript** | `types/index.d.ts` | Strict type definitions and data contracts for Prompts, MCPs, and System Capacity schemas. |
| **Bash / Shell** | `scripts/setup.sh` | Automated Linux / macOS / Git Bash setup scripts. |

---

## ⚡ Quickstart

### Run the Web Dashboard
```bash
# Clone the repository
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# Start a lightweight static server (Python or Node)
python -m http.server 3000

# Or with npx:
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the Python CLI
```bash
python python/omnidev.py list-prompts
python python/omnidev.py calc-capacity --dau 10000000 --writes 5
python python/omnidev.py ask-ai "How to design a distributed cache?"
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Open Global Command Palette & Fuzzy Search |
| <kbd>ESC</kbd> | Close Modal / Command Palette |

---

## 🤝 Contributing

Contributions are warmly welcomed! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting new prompts, MCP servers, or tools.

---

## 📈 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ilynx69/awesome-ai-devtools&type=Date)](https://star-history.com/#ilynx69/awesome-ai-devtools&Date)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<div align="center">
  <b>Developed with passion by <a href="https://github.com/ilynx69">@ilynx69</a></b><br>
  <i>Give a ⭐ if you found this repository helpful!</i>
</div>
