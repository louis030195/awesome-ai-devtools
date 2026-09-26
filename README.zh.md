<div align="center">

# ⚡ OmniDev // Awesome AI DevTools

### *专为现代全栈开发者与 AI 工程师打造的开源工作台*

[![GitHub Stars](https://img.shields.io/github/stars/ilynx69/awesome-ai-devtools?style=for-the-badge&logo=github&color=38bdf8)](https://github.com/ilynx69/awesome-ai-devtools/stargazers)
[![Live Demo](https://img.shields.io/badge/演示-在线体验-10b981?style=for-the-badge&logo=github-pages&logoColor=white)](https://ilynx69.github.io/awesome-ai-devtools/)
[![许可证: MIT](https://img.shields.io/badge/许可证-MIT-c084fc?style=for-the-badge)](LICENSE)
[![多语言支持](https://img.shields.io/badge/语言架构-JS_|_Python_|_Rust_|_TS-6366f1?style=for-the-badge)]()

<br />

[**English**](README.md) • [**Русский**](README.ru.md) • [**中文 (简体)**](README.zh.md)

<br />

[**🌐 在线访问应用**](https://ilynx69.github.io/awesome-ai-devtools/) • [**✨ 核心特性**](#-核心特性) • [**⚡ 快速上手**](#-快速上手) • [**🤝 贡献代码**](#-参与贡献)

</div>

---

## 🌟 什么是 OmniDev？

**OmniDev** 是一款超快速、完全在浏览器端运行的 AI 工程师多语言集成开发控制台。

告别混乱的多标签页，在一个赛博朋克毛玻璃极简控制台中统一日常核心开发场景：
- **提示词工程工坊 (Prompt Studio)**：支持变量模板动态注入 (`{{variables}}`)。
- **内置免费 AI 协同副驾驶 (Neural Copilot & Code Lab)**：无需注册或 API 密钥即可免费调用大模型，支持代码安全审计、重构、单测生成与 Big-O 复杂度分析。
- **模型上下文协议 (MCP) 配置器**：快速勾选并生成 Claude Desktop 与 Cursor 专用的 `claude_desktop_config.json`。
- **离线开发者瑞士军刀 (DevToys)**：带倒计时的 JWT 校验器、cURL 转多语言代码 (JS/Python/Go/Rust/Node)、JSON 格式化校验、正则演练场、加密哈希、Cron 翻译与 Git 救急。
- **系统架构高并发容量估算器 (System Design Scale Calc)**：根据 DAU、读写比一键计算 QPS、峰值、年度存储增长与 80/20 缓存内存配置。
- **2026 AI 模型雷达**：横向对比每百万 Token 单价、上下文大小与代码能力评测 (Claude 3.5 Sonnet, DeepSeek R1/V3, GPT-4o, Gemini 2.0 Flash 等)。

---

## 🚀 核心特性

### 1. 🤖 免费神经模型协同副驾驶 (Neural Copilot)
* **免费云端推理集成**：直连免费云端接口 (Pollinations / DeepSeek)，开箱即用。
* **离线启发式分析引擎**：断网或无网络环境下依然提供即时代码安全审计与重构建议（100% 隐私安全）。
* **支持本地 Ollama (`localhost:11434`)** 与用户私有 API 密钥 (Groq / OpenRouter)。
* **一键快捷分析**：OWASP 漏洞检测、SOLID 规范重构、单元测试生成、转 Rust/Python 代码。

### 2. ⚡ 提示词工坊 (Prompt Studio)
* 精选资深架构师系统设计、OWASP 安全审计、SQL 调优、线上故障复盘等高价值提示词。
* 点击「发送给 AI 助手测试 🤖」一键联动 Neural Copilot 实操测试。
* 支持一键导出为 Markdown (`.md`) 文件。

### 3. 🔌 MCP (Model Context Protocol) 服务管理
* 官方与社区热门服务：Filesystem, GitHub, PostgreSQL, Brave Search, Puppeteer, Docker, Slack。
* 自动格式化输出 `claude_desktop_config.json`，并提供各操作系统放置路径指引。

### 4. 🛠️ 纯前端离线 DevToys 开发者工具箱
* **cURL 转代码转换器**：一键将 cURL 命令转换为 JavaScript `fetch()`、Python `requests`、Go `net/http`、Rust `reqwest` 或 Node.js `axios`。
* **Token 计算器与调用成本估算**：实时统计字符与 Token 数，精准对比各模型调用费用。
* **JWT 令牌解析器**：秒级解析 Header 与 Payload，高亮过期时间与倒计时状态。
* **JSON 校验与美化**：精准定位语法错误行号，支持一键压缩。
* **Git 救急指南**：撤销最近一次提交、合并提交、修复分支误提。

---

## 💻 有意义的多语言架构 (Polyglot)

* **JavaScript / HTML / CSS**：高性能浏览器端单页应用，无需任何打包构建，即开即用。
* **Python (`python/omnidev.py`)**：为算法工程师与 AI 开发者量身打造的终端 CLI。
* **Rust (`rust/src/main.rs`)**：极速底层系统级 CLI 工具，处理高性能数据计算与配置导出。
* **TypeScript (`types/index.d.ts`)**：提供标准化的强类型接口声明。

---

## ⚡ 快速上手

### 本地运行 Web 工作台
```bash
# 克隆代码仓库
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# 使用 Python 启动静态文件服务
python -m http.server 3000

# 或使用 npx
npx serve .
```
在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 运行 Python CLI 工具
```bash
python python/omnidev.py list-prompts
python python/omnidev.py calc-capacity --dau 10000000 --writes 5
python python/omnidev.py ask-ai "How does Raft consensus algorithm work?"
```

---

## 📄 开源许可证

本项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。

<div align="center">
  <b>由 <a href="https://github.com/ilynx69">@ilynx69</a> 倾情打造</b><br>
  <i>如果该项目对您有所帮助，欢迎点亮 ⭐ Star！</i>
</div>
