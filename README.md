<div align="center">

# OmniDev // Awesome AI DevTools

### *The Modern Developer & AI Engineering Suite*

[![GitHub Stars](https://img.shields.io/github/stars/ilynx69/awesome-ai-devtools?style=for-the-badge&logo=github&color=38bdf8)](https://github.com/ilynx69/awesome-ai-devtools/stargazers)
[![Live Demo](https://img.shields.io/badge/Demo-Live_Website-10b981?style=for-the-badge&logo=github-pages&logoColor=white)](https://ilynx69.github.io/awesome-ai-devtools/)
[![License: MIT](https://img.shields.io/badge/License-MIT-c084fc?style=for-the-badge)](LICENSE)
[![Polyglot Architecture](https://img.shields.io/badge/Languages-JS_|_Python_|_Rust_|_TS-6366f1?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f59e0b?style=for-the-badge)](CONTRIBUTING.md)

<br />

[**English**](README.md) • [**Русский**](README.ru.md) • [**中文 (简体)**](README.zh.md)

<br />

[**Explore Live Demo**](https://ilynx69.github.io/awesome-ai-devtools/) • [**Features**](#features) • [**Architecture**](#polyglot-architecture) • [**Quickstart**](#quickstart) • [**Contributing**](#contributing)

<br />

</div>

---

## Overview

**OmniDev** is a focused, zero-latency workbench and polyglot developer toolkit engineered for **AI engineers, software architects, and full-stack developers**. 

It eliminates tab clutter by unifying essential engineering workflows into a clean, minimalist developer interface inspired by Linear and Vercel Geist:

- **AI Code Copilot & Lab**: In-browser assistant for security audits, refactoring, and test generation powered by free cloud models and private offline heuristic engines.
- **Prompt Engineering Studio**: Production-ready prompt templates with live variable compilation (`{{system_name}}`, `{{code}}`) and direct AI testing.
- **Model Context Protocol (MCP) Configurator**: Visual catalog to select servers and generate validated `claude_desktop_config.json` configurations.
- **System Design Capacity Calculator**: Estimate QPS, annual storage growth, network throughput, and Pareto 80/20 RAM cache memory based on DAU.
- **cURL to Polyglot Code Converter**: Transform cURL requests into idiomatic JavaScript `fetch()`, Python `requests`, Go `http`, Rust `reqwest`, or Node.js `axios`.
- **AI Tokenizer & Cost Estimator**: Approximate BPE token count and compute inference pricing across Claude 3.5 Sonnet, GPT-4o, DeepSeek V3, and Gemini 2.0 Flash.
- **Developer Power Tools (DevToys Suite)**: Decoders for JWT with live countdown expiration checker, JSON formatter/validator, Regex playground, cryptographic hashes, UUID generation, Cron parser, and Git disaster recovery recipes.
- **Multilingual Support**: Instant 1-click localization between **English**, **Russian (Русский)**, and **Chinese (中文)**.

---

## Features

### 1. AI Code Copilot & Workbench
- **Free Cloud AI Access**: Direct connection to free endpoints for quick inference without mandatory registration or API keys.
- **Offline Heuristic Engine**: Runs 100% locally and privately in your browser for instant code reviews and audits without sending data over the network.
- **Local Ollama & Custom Provider Support**: Connect directly to your local instance at `http://localhost:11434` or bring your own Groq / OpenRouter API keys.
- **One-Click Actions**: Security Audit (OWASP), Clean Refactor (SOLID), Unit Test Generation, Language Conversion (Rust/Python), and Big-O Complexity Evaluation.

### 2. Prompt Engineering Studio
- **Dynamic Variable Injection**: Edit template parameters in real-time and inspect the compiled output.
- **Direct AI Testing**: Send compiled prompts directly to the built-in AI Copilot with one click.
- **Markdown Export**: Download prompts as clean, structured `.md` files.

### 3. Model Context Protocol (MCP) Configurator
- **Curated Server Catalog**: Pre-configured setups for Filesystem, PostgreSQL, GitHub, Brave Search, Puppeteer, Memory Graph, Docker, and Slack.
- **Automated JSON Compilation**: Generates standardized, valid `claude_desktop_config.json` for Claude Desktop and Cursor.
- **Path Reference**: Direct guidance on target paths across Windows (`%APPDATA%`), macOS (`~/Library`), and Linux (`~/.config`).

### 4. Developer Power Tools (DevToys)
- **cURL Converter**: Convert cURL snippets into ready-to-run code across 5 programming languages.
- **Token Counter**: Real-time token estimation with multi-model cost comparisons.
- **JWT Inspector**: Decode headers and payload claims with live expiration status tracking.
- **JSON Studio**: Format with custom indentation (2 or 4 spaces), validate with syntax error pinpointing, and minify.
- **Regex Playground**: Test patterns in real-time with curated recipes (Email, URL, IPv4, SemVer).
- **Crypto & UUIDs**: Generate SHA-256, SHA-512, Base64, URL encoding, and batch UUID v4 identifiers.
- **Git Recipes**: Practical solutions for common Git operations (undoing commits, squashing, branch recovery).

### 5. System Design Capacity & Scale Calculator
- Input DAU, read/write ratios, and payload size.
- Calculates Average QPS, Peak QPS (2.5x), Annual Storage Growth (TB), Network Bandwidth (Mbps), and RAM Cache sizing (80/20 Pareto rule).

---

## Polyglot Architecture

OmniDev is built across multiple modern programming languages:

| Language | Path | Purpose |
| :--- | :--- | :--- |
| **JavaScript (ES6+)** | `js/`, `index.html` | Client-side web dashboard running natively on GitHub Pages with zero build step. |
| **Python** | `python/omnidev.py` | Command-line CLI companion for AI and ML engineers to compile prompts, query free AI, and compute capacity. |
| **Rust** | `rust/src/main.rs` | High-performance native systems binary for capacity calculations and MCP configuration export. |
| **TypeScript** | `types/index.d.ts` | Strict type definitions and data contracts for Prompts, MCPs, and System Capacity schemas. |
| **Bash / Shell** | `scripts/setup.sh` | Automated Linux / macOS / Git Bash setup scripts. |

---

## Quickstart

### Run the Web Dashboard Locally
```bash
# Clone the repository
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# Start a lightweight static server (Python 3)
python -m http.server 3000

# Or with Node.js
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the Python CLI Companion
```bash
python python/omnidev.py list-prompts
python python/omnidev.py calc-capacity --dau 10000000 --writes 5
python python/omnidev.py ask-ai "Explain the CAP theorem and distributed consensus"
```

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Open Command Palette & Fuzzy Search |
| <kbd>ESC</kbd> | Close Modal / Command Palette |

---

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting new prompts, MCP servers, or tools.

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ilynx69/awesome-ai-devtools&type=Date)](https://star-history.com/#ilynx69/awesome-ai-devtools&Date)

---

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<div align="center">
  <b>Designed and built by <a href="https://github.com/ilynx69">@ilynx69</a></b>
</div>
