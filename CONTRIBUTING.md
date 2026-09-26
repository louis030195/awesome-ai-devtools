# Contributing to OmniDev 🚀

First off, thank you for considering contributing to **OmniDev**! It is an open-source hub built to help software engineers, AI developers, and system architects thrive.

## 💡 Ways to Contribute

1. **Add Battle-Tested Prompts**:
   - Open `js/data.js`.
   - Add a new prompt object under `OMNI_DATA.prompts` specifying `title`, `category`, `variables`, and `template`.
2. **Add MCP Servers**:
   - Add new Model Context Protocol implementations under `OMNI_DATA.mcpServers`.
3. **Submit New DevToys Utilities**:
   - Build new client-side tools (e.g. Markdown to HTML, Diff Checker, Color Contrast, SQL Formatter).
4. **Report Bugs & Suggest Features**:
   - Open an issue on GitHub with reproduction steps.

## 🛠️ Local Development

OmniDev is crafted with zero-friction architecture: no complex npm build step required to test.

```bash
# Clone the repository
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# Run with any local server (Python 3)
python -m http.server 3000

# Or using Node.js npx
npx serve .
```

Open `http://localhost:3000` in your favorite browser.

## 📜 Pull Request Guidelines

- Ensure your code adheres to standard ES6+ JavaScript.
- Avoid introducing heavy dependencies; keep everything fast and client-side.
- Ensure all variable placeholders are properly formatted with `{{variable_name}}`.

Thank you for making open source better! ⭐
