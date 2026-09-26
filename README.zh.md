<div align="center">

# OmniDev // Awesome AI DevTools

### *专为现代开发者与 AI 工程师打造的极简工作台*

[![GitHub Stars](https://img.shields.io/github/stars/ilynx69/awesome-ai-devtools?style=for-the-badge&logo=github&color=38bdf8)](https://github.com/ilynx69/awesome-ai-devtools/stargazers)
[![Live Demo](https://img.shields.io/badge/演示-在线体验-10b981?style=for-the-badge&logo=github-pages&logoColor=white)](https://ilynx69.github.io/awesome-ai-devtools/)
[![许可证: MIT](https://img.shields.io/badge/许可证-MIT-c084fc?style=for-the-badge)](LICENSE)
[![多语言架构](https://img.shields.io/badge/语言架构-JS_|_Python_|_Rust_|_TS-6366f1?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-f59e0b?style=for-the-badge)](CONTRIBUTING.md)

<br />

[**English**](README.md) • [**Русский**](README.ru.md) • [**中文 (简体)**](README.zh.md)

<br />

[**在线访问应用**](https://ilynx69.github.io/awesome-ai-devtools/) • [**功能概览**](#功能概览) • [**架构设计**](#多语言架构) • [**快速上手**](#快速上手) • [**参与贡献**](#参与贡献)

<br />

</div>

---

## 项目简介

**OmniDev** 是一款专为 **AI 工程师、系统架构师与全栈开发者** 设计的高性能、纯前端、零网络延迟的专业工作台。

界面采用源自 Linear 与 Vercel Geist 的极简工程美学，整合高频开发工作流：

- **AI 代码协同与实验台**：集成免费云端大模型与离线启发式分析引擎，无需注册或 API 密钥即可完成安全审查、代码重构与单测生成。
- **提示词工程工坊**：实战生产级提示词模板，支持参数动态注入 (`{{system_name}}`, `{{code}}`) 与一键 AI 实测。
- **模型上下文协议 (MCP) 配置器**：可视化选择核心服务，一键生成合规的 `claude_desktop_config.json` 配置文件。
- **系统架构高并发容量估算器**：根据日活跃用户数 (DAU) 与请求读写比计算 QPS、年度存储增量、带宽与 80/20 缓存内存需求。
- **cURL 转多语言代码转换器**：一键将网络请求转换为 JavaScript `fetch()`、Python `requests`、Go `http`、Rust `reqwest` 或 Node.js `axios`。
- **Token 计算与模型调用成本估算**：实时统计 Token 数，精准对比各大前沿大模型的调用单价。
- **开发者瑞士军刀 (DevToys)**：带倒计时校验的 JWT 解析器、JSON 校验与美化、正则演练场、加密哈希、UUID 生成器与 Git 救急。
- **全界面多语言支持**：支持英文、中文与俄文即时一键切换。

---

## 功能概览

### 1. AI 代码协同与实验台
* **免费云端推理**：直连免费推理服务，开箱即用。
* **离线本地引擎**：100% 浏览器内运行，保障敏感代码数据不出本地。
* **支持本地 Ollama 与自定义 API**：可无缝接入 `http://localhost:11434` 或填写 Groq / OpenRouter 密钥。
* **快捷分析**：OWASP 漏洞扫描、SOLID 重构、单元测试生成、转 Rust/Python 代码、Big-O 复杂度分析。

### 2. 提示词工坊
* **动态参数注入**：实时编译并高亮显示替换后的提示词内容。
* **联动 AI 测试**：点击一键将编译后提示词输入至 AI 助手查看效果。
* **文档导出**：支持一键下载标准 Markdown (`.md`) 格式文件。

### 3. MCP 服务配置
* **服务生态**：内置 Filesystem, PostgreSQL, GitHub, Brave Search, Puppeteer, Docker, Slack 配置。
* **标准生成**：格式化输出符合 Claude Desktop 与 Cursor 规范的 JSON 文件。
* **路径参考**：指引各操作系统配置文件存放位置。

### 4. 开发者实用工具箱
* **cURL 转换**：单行命令转 5 大主流语言生产级代码。
* **Token 计数**：评估 Prompt 长度及调用花销。
* **JWT 解析**：格式化展示 Header 与 Payload，高亮过期状态。
* **JSON 工作台**：支持 2/4 空格缩进排版，语法错误行号提示，一键压缩。
* **正则演练**：内置常用邮箱、URL、IP、语义化版本正则预设。
* **Git 救急**：撤销最近提交、合并提交、拯救分支误操作。

### 5. 系统设计容量估算器
* 输入日活跃用户数、读写频次及数据包大小。
* 自动计算平均 QPS、峰值 QPS、年度存储容量增长及帕累托 80/20 缓存所需内存。

---

## 多语言架构

OmniDev 采用有针对性的多语言工程架构：

| 语言 | 目录路径 | 用途 |
| :--- | :--- | :--- |
| **JavaScript (ES6+)** | `js/`, `index.html` | 纯前端单页应用，直连 GitHub Pages，零打包负担。 |
| **Python** | `python/omnidev.py` | 专为 AI 工程师设计的终端 CLI 工具：提示词编译、容量计算与 AI 查询。 |
| **Rust** | `rust/src/main.rs` | 高性能底层系统命令行工具，用于极速数据运算与配置导出。 |
| **TypeScript** | `types/index.d.ts` | 项目核心数据契约与接口类型定义。 |
| **Bash / Shell** | `scripts/setup.sh` | 自动化环境启动脚本。 |

---

## 快速上手

### 本地运行 Web 工作台
```bash
# 克隆代码仓库
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# 使用 Python 启动静态文件服务
python -m http.server 3000

# 或使用 Node.js
npx serve .
```
在浏览器中访问 [http://localhost:3000](http://localhost:3000)。

### 运行 Python CLI 工具
```bash
python python/omnidev.py list-prompts
python python/omnidev.py calc-capacity --dau 10000000 --writes 5
python python/omnidev.py ask-ai "Explain the CAP theorem and distributed consensus"
```

---

## 快捷键

| 快捷键 | 功能 |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | 打开全局命令面板与模糊搜索 |
| <kbd>ESC</kbd> | 关闭模态窗口 / 退出搜索 |

---

## 开源许可证

本项目基于 MIT 许可证开源。详情请参阅 [LICENSE](LICENSE) 文件。

<div align="center">
  <b>由 <a href="https://github.com/ilynx69">@ilynx69</a> 精心打造</b>
</div>
