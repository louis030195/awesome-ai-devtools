// ==========================================================================
// OmniDev - Internationalization (i18n) Engine (EN, RU, ZH)
// Clean, Human-Crafted Terminology
// ==========================================================================

const I18N_DATA = {
  en: {
    brand_sub: "Developer & AI Toolbox",
    nav_prompts: "Prompts",
    nav_copilot: "AI Copilot",
    nav_mcp: "MCP Hub",
    nav_radar: "Benchmarks",
    nav_devtools: "DevTools",
    nav_cheatsheets: "Architecture & Scale",
    nav_directory: "Ecosystem",
    search_placeholder: "Search tools, prompts, MCPs...",
    hero_badge: "Production Developer Toolkit",
    hero_title_prefix: "The Modern Suite for",
    hero_title_highlight: "AI & Software Engineers",
    hero_desc: "A focused, zero-latency workbench. System design capacity calculator, free in-browser AI code assistant, dynamic prompt compiler, MCP configuration generator, and offline utilities.",
    stat_prompts: "Production Prompts",
    stat_mcp: "MCP Integrations",
    stat_polyglot: "Polyglot (JS, Python, Rust, TS)",
    stat_client: "100% Client-Side",
    sound_tip: "Toggle Sound FX",
    theme_tip: "Toggle Theme",
    star_btn: "Star on GitHub",

    // Prompt Studio
    ps_title: "Prompt Engineering Studio",
    ps_desc: "Production-ready prompt templates with live variable compilation and direct AI testing.",
    ps_search: "Search prompts...",
    ps_preview_title: "Compiled Prompt Output",
    ps_download_md: "Export Markdown",
    ps_copy_prompt: "Copy Prompt",
    ps_send_to_ai: "Test with AI",

    // AI Copilot
    ai_title: "AI Code Copilot & Lab",
    ai_desc: "Interactive code assistant. Run security audits, clean refactoring, and test synthesis with free cloud or offline heuristic engines.",
    ai_provider_label: "Engine:",
    ai_provider_neural: "OmniDev Neural Core (Instant & Zero-Lag)",
    ai_provider_free: "Free Cloud AI (DeepSeek / Web Gateway)",
    ai_provider_chrome: "Chrome Built-in AI (Gemini Nano)",
    ai_provider_ollama: "Local Ollama (localhost:11434)",
    ai_provider_custom: "Custom API (Groq / OpenRouter)",
    ai_custom_key_label: "API Key (Stored locally in browser):",
    ai_custom_endpoint_label: "Base URL:",
    ai_quick_audit: "Security Audit",
    ai_quick_refactor: "Clean Refactor",
    ai_quick_tests: "Generate Unit Tests",
    ai_quick_convert: "Convert to Rust/Python",
    ai_quick_complexity: "Big-O Complexity",
    ai_input_placeholder: "Paste code, ask questions, or run prompt tests here...",
    ai_btn_run: "Run Analysis",
    ai_btn_clear: "Clear",
    ai_output_label: "Analysis & Output",

    // MCP Configurator
    mcp_title: "Model Context Protocol (MCP) Configurator",
    mcp_desc: "Select servers to instantly generate a validated claude_desktop_config.json file.",
    mcp_select_all: "Select All",
    mcp_clear: "Deselect All",
    mcp_search: "Filter MCP servers...",
    mcp_download: "Download Config",
    mcp_copy: "Copy JSON",
    mcp_os_paths: "Configuration file path by OS:",

    // AI Radar
    radar_title: "AI Model Benchmarks & Comparison",
    radar_desc: "Compare context windows, inference pricing, generation speed, and coding benchmarks.",
    radar_search: "Search models...",
    radar_all: "All",
    radar_proprietary: "Proprietary",
    radar_open: "Open Weights",
    latency_title: "Latency Numbers Every Developer Should Know",
    latency_desc: "Logarithmic scale comparison of hardware and network operation durations.",

    // DevToys
    toys_title: "Developer Power Tools",
    toys_desc: "Essential offline utilities running entirely in your browser with zero latency.",
    tab_jwt: "JWT Inspector",
    tab_curl: "cURL to Code",
    tab_json: "JSON Formatter",
    tab_regex: "Regex Playground",
    tab_crypto: "Hashes & UUIDs",
    tab_tokenizer: "Token Counter",
    tab_cron: "Cron Parser",
    tab_git: "Git Recipes",

    // Architecture & Cheatsheets
    arch_title: "Architecture & System Design",
    arch_desc: "High-concurrency capacity calculator and essential developer cheat sheets.",
    sys_calc_title: "System Design Capacity Calculator",
    sys_calc_desc: "Estimate QPS, storage growth, bandwidth, and cache RAM requirements based on DAU.",
    dau_label: "Daily Active Users (DAU)",
    reads_label: "Reads per User / Day",
    writes_label: "Writes per User / Day",
    payload_label: "Average Payload Size (KB)",
    http_title: "HTTP Response Status Codes",

    // Awesome Directory
    dir_title: "Curated AI Ecosystem",
    dir_desc: "Hand-picked, high-impact open-source developer tools, agents, and frameworks.",

    // Footer
    footer_crafted: "Designed and built by",
    footer_polyglot_notice: "Polyglot codebase in JavaScript, Python, Rust, and TypeScript."
  },

  ru: {
    brand_sub: "Инструментарий для AI и разработки",
    nav_prompts: "Промпты",
    nav_copilot: "AI Копилот",
    nav_mcp: "MCP Хаб",
    nav_radar: "Бенчмарки",
    nav_devtools: "Инструменты",
    nav_cheatsheets: "Архитектура и расчеты",
    nav_directory: "Экосистема",
    search_placeholder: "Поиск инструментов, промптов, MCP...",
    hero_badge: "Инженерный инструментарий",
    hero_title_prefix: "Современная среда для",
    hero_title_highlight: "Разработчиков и AI-инженеров",
    hero_desc: "Удобный рабочий стол без лишнего визуального шума: расчет нагрузки System Design, бесплатный AI-ассистент, компилятор промптов, конфигуратор MCP и офлайн-утилиты.",
    stat_prompts: "Продакшен-промптов",
    stat_mcp: "MCP Интеграций",
    stat_polyglot: "Полиглот (JS, Python, Rust, TS)",
    stat_client: "100% В браузере",
    sound_tip: "Звук интерфейса",
    theme_tip: "Сменить тему",
    star_btn: "Звезда на GitHub",

    // Prompt Studio
    ps_title: "Студия промпт-инжиниринга",
    ps_desc: "Готовые проверенные промпты с динамической компиляцией переменных и тестированием в AI.",
    ps_search: "Поиск промптов...",
    ps_preview_title: "Скомпилированный промпт",
    ps_download_md: "Скачать .md",
    ps_copy_prompt: "Копировать",
    ps_send_to_ai: "Проверить в AI",

    // AI Copilot
    ai_title: "AI Копилот и лаборатория кода",
    ai_desc: "Интерактивный помощник разработчика. Проверка безопасности OWASP, рефакторинг кода и юнит-тесты без регистрации и API-ключей.",
    ai_provider_label: "Движок:",
    ai_provider_neural: "OmniDev Neural Core (Мгновенно и без задержек)",
    ai_provider_free: "Бесплатный облачный AI (DeepSeek / Web Gateway)",
    ai_provider_chrome: "Встроенный AI браузера (Chrome Gemini Nano)",
    ai_provider_ollama: "Локальная Ollama (localhost:11434)",
    ai_provider_custom: "Свой API-ключ (Groq / OpenRouter)",
    ai_custom_key_label: "API Ключ (хранится локально в браузере):",
    ai_custom_endpoint_label: "Базовый URL:",
    ai_quick_audit: "Аудит безопасности",
    ai_quick_refactor: "Рефакторинг SOLID",
    ai_quick_tests: "Сгенерировать тесты",
    ai_quick_convert: "Конвертировать в Rust/Python",
    ai_quick_complexity: "Сложность Big-O",
    ai_input_placeholder: "Вставьте код, задайте вопрос или протестируйте промпт...",
    ai_btn_run: "Запустить анализ",
    ai_btn_clear: "Очистить",
    ai_output_label: "Результат анализа",

    // MCP Configurator
    mcp_title: "Конфигуратор Model Context Protocol (MCP)",
    mcp_desc: "Выберите нужные сервисы для мгновенной генерации claude_desktop_config.json.",
    mcp_select_all: "Выбрать все",
    mcp_clear: "Сбросить",
    mcp_search: "Поиск MCP серверов...",
    mcp_download: "Скачать файл",
    mcp_copy: "Копировать JSON",
    mcp_os_paths: "Расположение файла конфигурации в вашей ОС:",

    // AI Radar
    radar_title: "Сравнение и бенчмарки AI-моделей",
    radar_desc: "Сопоставление размера контекста, стоимости токенов, скорости и результатов тестов на программирование.",
    radar_search: "Поиск модели...",
    radar_all: "Все",
    radar_proprietary: "Проприетарные",
    radar_open: "Open Weights",
    latency_title: "Таблица задержек разработчика",
    latency_desc: "Сравнение времени отклика кэша процессора, оперативной памяти, SSD и межсетевых вызовов.",

    // DevToys
    toys_title: "Инструменты разработчика",
    toys_desc: "Набор быстрых офлайн-утилит прямо в браузере: JWT, cURL в код, JSON, Regex и Git.",
    tab_jwt: "JWT Декодер",
    tab_curl: "cURL в Код",
    tab_json: "JSON Студия",
    tab_regex: "Regex Песочница",
    tab_crypto: "Хэши и UUID",
    tab_tokenizer: "Токенайзер",
    tab_cron: "Парсер Cron",
    tab_git: "Рецепты Git",

    // Architecture & Cheatsheets
    arch_title: "Архитектура и System Design",
    arch_desc: "Интерактивный калькулятор емкости распределенных систем и справочные таблицы.",
    sys_calc_title: "Калькулятор емкости и нагрузки системы",
    sys_calc_desc: "Оценка QPS, годового объема диска, сетевого трафика и размера кэша по числу пользователей.",
    dau_label: "Дневная аудитория (DAU)",
    reads_label: "Чтений на пользователя в день",
    writes_label: "Записей на пользователя в день",
    payload_label: "Размер записи (КБ)",
    http_title: "HTTP Статусы ответов",

    // Awesome Directory
    dir_title: "Экосистема инструментов",
    dir_desc: "Отобранные проверенные открытые решения для разработки и работы с нейросетями.",

    // Footer
    footer_crafted: "Разработано",
    footer_polyglot_notice: "Создано на JavaScript, Python, Rust и TypeScript."
  },

  zh: {
    brand_sub: "AI 与开发者效率工具箱",
    nav_prompts: "提示词",
    nav_copilot: "AI 助手",
    nav_mcp: "MCP 枢纽",
    nav_radar: "模型评测",
    nav_devtools: "开发工具",
    nav_cheatsheets: "架构与容量估算",
    nav_directory: "生态导航",
    search_placeholder: "搜索工具、提示词、MCP...",
    hero_badge: "工程师级专业工具集",
    hero_title_prefix: "专为现代工程师打造的",
    hero_title_highlight: "AI 与全栈开发工作台",
    hero_desc: "专注、极简、零延迟的工作平台：系统架构容量估算、免注册即用 AI 编程助手、提示词动态编译器、MCP 配置一键生成与离线纯前端工具箱。",
    stat_prompts: "生产级提示词",
    stat_mcp: "MCP 服务生态",
    stat_polyglot: "多语言工程 (JS, Python, Rust, TS)",
    stat_client: "100% 浏览器本地运行",
    sound_tip: "UI 音效开关",
    theme_tip: "切换主题",
    star_btn: "在 GitHub 上点赞",

    // Prompt Studio
    ps_title: "提示词工程工坊",
    ps_desc: "实战架构与开发提示词模板，支持动态参数注入与即时 AI 运行测试。",
    ps_search: "搜索提示词...",
    ps_preview_title: "编译后提示词输出",
    ps_download_md: "导出 Markdown",
    ps_copy_prompt: "复制提示词",
    ps_send_to_ai: "发送至 AI 测试",

    // AI Copilot
    ai_title: "AI 代码协同与实验台",
    ai_desc: "交互式编程助手。无需 API Key 即可进行 OWASP 安全审查、代码重构、单测生成与复杂度评估。",
    ai_provider_label: "模型源：",
    ai_provider_neural: "OmniDev 神经核心引擎 (零延迟 / 极速响应)",
    ai_provider_free: "免费云端模型 (DeepSeek / Web 网关)",
    ai_provider_chrome: "Chrome 原生内置 AI (Gemini Nano)",
    ai_provider_ollama: "本地 Ollama (localhost:11434)",
    ai_provider_custom: "自定义 API (Groq / OpenRouter)",
    ai_custom_key_label: "API 密钥 (仅保存在本地浏览器):",
    ai_custom_endpoint_label: "API 端点 URL:",
    ai_quick_audit: "安全审查",
    ai_quick_refactor: "重构优化",
    ai_quick_tests: "生成单测",
    ai_quick_convert: "转 Rust/Python",
    ai_quick_complexity: "Big-O 复杂度",
    ai_input_placeholder: "在此粘贴代码、输入问题或测试提示词...",
    ai_btn_run: "执行分析",
    ai_btn_clear: "清空",
    ai_output_label: "分析结果",

    // MCP Configurator
    mcp_title: "模型上下文协议 (MCP) 配置器",
    mcp_desc: "勾选常用服务，即时生成标准化合规的 claude_desktop_config.json 配置文件。",
    mcp_select_all: "全选",
    mcp_clear: "取消全选",
    mcp_search: "筛选 MCP 服务...",
    mcp_download: "下载配置",
    mcp_copy: "复制 JSON",
    mcp_os_paths: "各操作系统中的配置路径：",

    // AI Radar
    radar_title: "AI 模型能力对比与评测",
    radar_desc: "横向对比上下文窗口、每百万 Token 定价、推理速度与编码基准测试。",
    radar_search: "搜索模型...",
    radar_all: "全部",
    radar_proprietary: "商业闭源",
    radar_open: "开源权重",
    latency_title: "程序员必备延迟参考表",
    latency_desc: "对数刻度对比 CPU 缓存、内存访问、SSD 读取与跨网络耗时。",

    // DevToys
    toys_title: "开发者瑞士军刀",
    toys_desc: "完全在浏览器端运行的高频实用工具，零网络延迟与隐私保障。",
    tab_jwt: "JWT 解析",
    tab_curl: "cURL 转代码",
    tab_json: "JSON 格式化",
    tab_regex: "正则测试",
    tab_crypto: "哈希与 UUID",
    tab_tokenizer: "Token 计算器",
    tab_cron: "Cron 表达式",
    tab_git: "Git 救急",

    // Architecture & Cheatsheets
    arch_title: "系统架构与容量规划",
    arch_desc: "高并发架构容量估算器与核心开发速查表。",
    sys_calc_title: "系统架构容量与负载估算器",
    sys_calc_desc: "根据日活 DAU 与读写频率快速推算 QPS、年度存储增量、带宽与 80/20 缓存配置。",
    dau_label: "日活跃用户数 (DAU)",
    reads_label: "每用户日均读取次数",
    writes_label: "每用户日均写入次数",
    payload_label: "平均数据包大小 (KB)",
    http_title: "HTTP 响应状态码速查",

    // Awesome Directory
    dir_title: "精选开发者生态",
    dir_desc: "严选高价值开源工具、自主 Agent 与核心技术框架。",

    // Footer
    footer_crafted: "精心设计与开发：",
    footer_polyglot_notice: "项目由 JavaScript、Python、Rust 和 TypeScript 联合构建。"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('omnidev_lang') || 'en';
  }

  init() {
    this.setLanguage(this.currentLang, false);
  }

  setLanguage(lang, triggerSound = true) {
    if (!I18N_DATA[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem('omnidev_lang', lang);

    if (triggerSound && window.soundEngine) {
      window.soundEngine.playClick();
    }

    const dict = I18N_DATA[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.title = dict[key];
      }
    });

    // Update active state in switcher UI
    document.querySelectorAll('.lang-select-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('bg-zinc-800', 'text-zinc-100', 'font-medium');
        btn.classList.remove('text-zinc-400');
      } else {
        btn.classList.remove('bg-zinc-800', 'text-zinc-100', 'font-medium');
        btn.classList.add('text-zinc-400');
      }
    });

    if (window.showToast && triggerSound) {
      const names = { en: 'English', ru: 'Русский', zh: '中文' };
      window.showToast(`Language: ${names[lang]}`, 'info');
    }
  }

  t(key) {
    const dict = I18N_DATA[this.currentLang] || I18N_DATA.en;
    return dict[key] || key;
  }
}

window.i18n = new I18nManager();
