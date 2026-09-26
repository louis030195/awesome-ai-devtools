// ==========================================================================
// OmniDev - Internationalization (i18n) Engine (EN, RU, ZH)
// ==========================================================================

const I18N_DATA = {
  en: {
    brand_sub: "AI & Dev Cockpit",
    nav_prompts: "⚡ Prompt Studio",
    nav_copilot: "🤖 AI Copilot",
    nav_mcp: "🔌 MCP Hub",
    nav_radar: "🎯 AI Radar",
    nav_devtools: "🛠️ DevToys Suite",
    nav_cheatsheets: "📚 Cheats & Architecture",
    nav_directory: "⭐ Awesome AI",
    search_placeholder: "Search tools, prompts, MCPs...",
    hero_badge: "Curated for Modern Full-Stack & AI Developers",
    hero_title_prefix: "The Open-Source",
    hero_title_highlight: "AI Engineer Cockpit",
    hero_desc: "Generate production prompts, chat with free AI models, configure Model Context Protocol (MCP) servers, inspect JWTs, convert cURL to code, and benchmark top AI models.",
    stat_prompts: "Battle-tested Prompts",
    stat_mcp: "MCP Integrations",
    stat_polyglot: "Polyglot (JS, Python, Rust, TS)",
    stat_client: "100% Client-Side & Private",
    sound_tip: "Toggle Sound FX",
    theme_tip: "Toggle Light / Dark Mode",
    star_btn: "Star",

    // Prompt Studio
    ps_title: "⚡ Prompt Engineering Studio",
    ps_desc: "Select a scenario, tune variables, and test live with our built-in AI Copilot.",
    ps_search: "Search prompts...",
    ps_preview_title: "Generated Prompt Preview",
    ps_download_md: "Download .md",
    ps_copy_prompt: "Copy Prompt",
    ps_send_to_ai: "Send to AI Copilot 🤖",

    // AI Copilot
    ai_title: "🤖 Neural Copilot & AI Code Lab",
    ai_desc: "Free in-browser AI Assistant powered by cloud models and offline heuristic engines. Zero cost.",
    ai_provider_label: "AI Engine Provider",
    ai_provider_free: "Free Cloud AI (Pollinations / DeepSeek)",
    ai_provider_offline: "Offline Heuristic Analyzer (Zero-Lag / 100% Private)",
    ai_provider_ollama: "Local Ollama (localhost:11434)",
    ai_provider_custom: "Custom API (Groq / OpenRouter / OpenAI)",
    ai_custom_key_label: "API Key (Stored locally in browser):",
    ai_custom_endpoint_label: "Base URL:",
    ai_quick_audit: "🛡️ Security Audit",
    ai_quick_refactor: "✨ Clean Refactor",
    ai_quick_tests: "🧪 Generate Tests",
    ai_quick_convert: "🔄 Convert to Rust/Python",
    ai_quick_complexity: "📊 Big-O Complexity",
    ai_input_placeholder: "Paste code, ask questions, or run prompt tests here...",
    ai_btn_run: "Generate / Run AI",
    ai_btn_clear: "Clear Chat",
    ai_output_label: "AI Output & Analysis",

    // MCP Configurator
    mcp_title: "🔌 Model Context Protocol (MCP) Configurator",
    mcp_desc: "Configure MCP servers for Claude Desktop, Cursor, and autonomous agents.",
    mcp_select_all: "Select All",
    mcp_clear: "Clear",
    mcp_search: "Filter MCP servers...",
    mcp_download: "Download Config",
    mcp_copy: "Copy JSON",
    mcp_os_paths: "File location on your OS:",

    // AI Radar
    radar_title: "🎯 2026 AI Models & Performance Radar",
    radar_desc: "Context window, API pricing, inference speed, and coding benchmarks.",
    radar_search: "Search models...",
    radar_all: "All",
    radar_proprietary: "Proprietary",
    radar_open: "Open Weights",
    latency_title: "⏱️ Latency Numbers Every Developer Should Know",
    latency_desc: "Logarithmic scale comparison of hardware and network operation durations.",

    // DevToys
    toys_title: "🛠️ Developer Power Utilities (DevToys Suite)",
    toys_desc: "Offline client-side utilities: JWT, cURL Converter, JSON, Regex, Crypto, and Git.",
    tab_jwt: "🔑 JWT Inspector",
    tab_curl: "🔄 cURL to Code",
    tab_json: "✨ JSON Studio",
    tab_regex: "🔍 Regex Playground",
    tab_crypto: "🔐 Hashes & UUIDs",
    tab_tokenizer: "💰 Tokenizer & Cost",
    tab_cron: "⏰ Cron Humanizer",
    tab_git: "🐙 Git Wizard",

    // Architecture & Cheatsheets
    arch_title: "📚 Architecture & Developer References",
    arch_desc: "System design capacity planning calculator and essential cheat sheets.",
    sys_calc_title: "📐 System Design Scale & Capacity Calculator",
    sys_calc_desc: "Estimate QPS, storage, memory, and caching infrastructure based on DAU.",
    dau_label: "Daily Active Users (DAU)",
    reads_label: "Reads per User/Day",
    writes_label: "Writes per User/Day",
    payload_label: "Avg Payload Size (KB)",
    http_title: "🌐 HTTP Response Status Codes",

    // Awesome Directory
    dir_title: "⭐ Curated Awesome AI & Developer Tools",
    dir_desc: "Hand-picked top tier open-source agents, frameworks, and productivity tools.",

    // Footer
    footer_crafted: "Crafted with ❤️ by",
    footer_polyglot_notice: "Written in JavaScript, Python, Rust, and TypeScript."
  },

  ru: {
    brand_sub: "AI и Дев Кокпит",
    nav_prompts: "⚡ Промпт-Студия",
    nav_copilot: "🤖 AI Копилот",
    nav_mcp: "🔌 MCP Хаб",
    nav_radar: "🎯 AI Радар",
    nav_devtools: "🛠️ Инструменты DevToys",
    nav_cheatsheets: "📚 Архитектура и Шпаргалки",
    nav_directory: "⭐ Каталог Awesome AI",
    search_placeholder: "Поиск промптов, MCP, утилит...",
    hero_badge: "Создано для Full-Stack разработчиков и AI-инженеров",
    hero_title_prefix: "Open-Source Кокпит для",
    hero_title_highlight: "AI-Инженеров и Разработчиков",
    hero_desc: "Создавайте продакшен-промпты, общайтесь с бесплатной нейросетью, настраивайте Model Context Protocol (MCP), разбирайте JWT, конвертируйте cURL в код и рассчитывайте архитектуру.",
    stat_prompts: "Проверенных промптов",
    stat_mcp: "MCP Интеграций",
    stat_polyglot: "Полиглот (JS, Python, Rust, TS)",
    stat_client: "100% В браузере и конфиденциально",
    sound_tip: "Вкл/выкл звук интерфейса",
    theme_tip: "Сменить тему (Светлая / Тёмная)",
    star_btn: "Поставить звезду",

    // Prompt Studio
    ps_title: "⚡ Студия Промпт-Инжиниринга",
    ps_desc: "Выберите сценарий, настройте переменные и протестируйте результат прямо во встроенной нейросети.",
    ps_search: "Поиск промптов...",
    ps_preview_title: "Предпросмотр скомпилированного промпта",
    ps_download_md: "Скачать .md",
    ps_copy_prompt: "Копировать",
    ps_send_to_ai: "Отправить в AI Копилот 🤖",

    // AI Copilot
    ai_title: "🤖 Нейросеть-Копилот и AI Code Lab",
    ai_desc: "Бесплатный AI-ассистент в браузере: облачные модели и локальный эвристический анализатор без затрат.",
    ai_provider_label: "Источник нейросети:",
    ai_provider_free: "Бесплатный облачный AI (Pollinations / DeepSeek)",
    ai_provider_offline: "Офлайн-анализатор (Мгновенно / 100% Приватно)",
    ai_provider_ollama: "Локальная Ollama (localhost:11434)",
    ai_provider_custom: "Свой API-ключ (Groq / OpenRouter / OpenAI)",
    ai_custom_key_label: "API Ключ (хранится локально в браузере):",
    ai_custom_endpoint_label: "Базовый URL:",
    ai_quick_audit: "🛡️ Аудит безопасности",
    ai_quick_refactor: "✨ Чистый рефакторинг",
    ai_quick_tests: "🧪 Написать Unit-тесты",
    ai_quick_convert: "🔄 Перевести на Rust/Python",
    ai_quick_complexity: "📊 Оценка Big-O сложности",
    ai_input_placeholder: "Вставьте код, задайте вопрос или проверьте промпт...",
    ai_btn_run: "Запустить анализ / Отправить",
    ai_btn_clear: "Очистить",
    ai_output_label: "Ответ нейросети и результат:",

    // MCP Configurator
    mcp_title: "🔌 Конфигуратор Model Context Protocol (MCP)",
    mcp_desc: "Настройте MCP-серверы для Claude Desktop, Cursor и автономных AI-агентов.",
    mcp_select_all: "Выбрать все",
    mcp_clear: "Сброс",
    mcp_search: "Фильтр MCP серверов...",
    mcp_download: "Скачать файл",
    mcp_copy: "Копировать JSON",
    mcp_os_paths: "Куда сохранить файл в вашей ОС:",

    // AI Radar
    radar_title: "🎯 AI Радар Моделей и Бенчмарки 2026",
    radar_desc: "Контекст, цены за миллион токенов, скорость генерации и тесты на программирование.",
    radar_search: "Поиск модели...",
    radar_all: "Все",
    radar_proprietary: "Проприетарные",
    radar_open: "Open-Source веса",
    latency_title: "⏱️ Таблица задержек, которую обязан знать разработчик",
    latency_desc: "Логарифмическое сравнение скорости процессора, кэша, памяти и сетевых вызовов.",

    // DevToys
    toys_title: "🛠️ Набор инструментов разработчика (DevToys)",
    toys_desc: "Офлайн-утилиты прямо в браузере: JWT, конвертер cURL, JSON, Regex, хэши и Git.",
    tab_jwt: "🔑 Декодер JWT",
    tab_curl: "🔄 cURL в Код",
    tab_json: "✨ Студия JSON",
    tab_regex: "🔍 Песочница Regex",
    tab_crypto: "🔐 Хэши и UUID",
    tab_tokenizer: "💰 Токенайзер и Стоимость",
    tab_cron: "⏰ Расшифровка Cron",
    tab_git: "🐙 Мастер Git",

    // Architecture & Cheatsheets
    arch_title: "📚 Архитектура и Шпаргалки",
    arch_desc: "Калькулятор масштабирования систем и справочники для архитекторов.",
    sys_calc_title: "📐 Калькулятор масштаба и нагрузки (System Design)",
    sys_calc_desc: "Оценка QPS, размера диска, памяти и кэша на основе дневной аудитории (DAU).",
    dau_label: "Дневная аудитория (DAU)",
    reads_label: "Запросов на чтение от пользователя в день",
    writes_label: "Запросов на запись от пользователя в день",
    payload_label: "Средний размер записи (КБ)",
    http_title: "🌐 Справочник HTTP-статусов",

    // Awesome Directory
    dir_title: "⭐ Каталог лучших AI-инструментов",
    dir_desc: "Отборные AI-агенты для кодинга, библиотеки и инфраструктура.",

    // Footer
    footer_crafted: "Сделано с ❤️ разработчиком",
    footer_polyglot_notice: "Написано на JavaScript, Python, Rust и TypeScript."
  },

  zh: {
    brand_sub: "AI 与开发者工作台",
    nav_prompts: "⚡ 提示词工坊",
    nav_copilot: "🤖 AI 协同副驾驶",
    nav_mcp: "🔌 MCP 枢纽",
    nav_radar: "🎯 AI 模型雷达",
    nav_devtools: "🛠️ 开发者工具箱",
    nav_cheatsheets: "📚 架构与速查表",
    nav_directory: "⭐ 精选 AI 导航",
    search_placeholder: "全局搜索提示词、MCP、工具...",
    hero_badge: "为现代全栈与 AI 工程师量身打造",
    hero_title_prefix: "开源一站式",
    hero_title_highlight: "AI 工程师驾驶舱",
    hero_desc: "动态生成生产级提示词、集成免费神经大模型、可视化配置模型上下文协议 (MCP)、调试 JWT、cURL 转多语言代码、系统架构容量估算。",
    stat_prompts: "实战生产提示词",
    stat_mcp: "MCP 协议生态",
    stat_polyglot: "多语言支持 (JS, Python, Rust, TS)",
    stat_client: "100% 纯前端运行与隐私保护",
    sound_tip: "开启/关闭 UI 音效",
    theme_tip: "切换浅色/深色主题",
    star_btn: "点赞 Star",

    // Prompt Studio
    ps_title: "⚡ 提示词工程工坊 (Prompt Studio)",
    ps_desc: "选择架构与审查场景，实时注入参数，并可直接发送至内置 AI 运行测试。",
    ps_search: "搜索提示词...",
    ps_preview_title: "编译后提示词预览",
    ps_download_md: "下载 .md 文件",
    ps_copy_prompt: "复制提示词",
    ps_send_to_ai: "发送给 AI 助手测试 🤖",

    // AI Copilot
    ai_title: "🤖 神经大模型协同与代码实验室",
    ai_desc: "免费浏览器内运行的 AI 助手：集成免费云端大模型与离线启发式分析引擎，零成本使用。",
    ai_provider_label: "AI 模型驱动源：",
    ai_provider_free: "免费云端大模型 (Pollinations / DeepSeek)",
    ai_provider_offline: "离线启发式代码分析器 (零延迟 / 100% 隐私)",
    ai_provider_ollama: "本地 Ollama (localhost:11434)",
    ai_provider_custom: "自定义 API 密钥 (Groq / OpenRouter / OpenAI)",
    ai_custom_key_label: "API 密钥 (仅本地存储在浏览器中):",
    ai_custom_endpoint_label: "API 端点 URL:",
    ai_quick_audit: "🛡️ OWASP 安全审查",
    ai_quick_refactor: "✨ 架构重构优化",
    ai_quick_tests: "🧪 自动生成单元测试",
    ai_quick_convert: "🔄 转换为 Rust/Python 代码",
    ai_quick_complexity: "📊 复杂度 (Big-O) 分析",
    ai_input_placeholder: "在此粘贴代码、输入提示词或提问...",
    ai_btn_run: "运行分析 / 发送请求",
    ai_btn_clear: "清空内容",
    ai_output_label: "AI 模型输出与分析结果：",

    // MCP Configurator
    mcp_title: "🔌 模型上下文协议 (MCP) 配置生成器",
    mcp_desc: "为 Claude Desktop、Cursor 以及自主 Agent 快速生成标准化配置。",
    mcp_select_all: "全选",
    mcp_clear: "清空",
    mcp_search: "筛选 MCP 服务...",
    mcp_download: "下载配置文件",
    mcp_copy: "复制 JSON",
    mcp_os_paths: "各操作系统中的配置存放路径：",

    // AI Radar
    radar_title: "🎯 2026 AI 模型能力雷达与基准评测",
    radar_desc: "对比上下文窗口、每百万 Token 定价、推理速度与代码生成评测成绩。",
    radar_search: "搜索模型...",
    radar_all: "全部",
    radar_proprietary: "闭源商业模型",
    radar_open: "开源权重模型",
    latency_title: "⏱️ 程序员必须掌握的系统延迟数字",
    latency_desc: "对数刻度对比 CPU 缓存、内存访问、固态硬盘与跨数据中心网络延迟。",

    // DevToys
    toys_title: "🛠️ 开发者瑞士军刀 (DevToys)",
    toys_desc: "纯前端离线利器：JWT 解析、cURL 转换器、JSON 校验、正则、哈希与 Git 救急。",
    tab_jwt: "🔑 JWT 令牌解析",
    tab_curl: "🔄 cURL 转代码",
    tab_json: "✨ JSON 工作台",
    tab_regex: "🔍 正则演练场",
    tab_crypto: "🔐 哈希与 UUID",
    tab_tokenizer: "💰 Token 计算与成本",
    tab_cron: "⏰ Cron 表达式翻译",
    tab_git: "🐙 Git 救急指南",

    // Architecture & Cheatsheets
    arch_title: "📚 系统架构与开发者速查表",
    arch_desc: "系统设计高并发容量规划计算器与必备参考速查。",
    sys_calc_title: "📐 系统设计容量与负载估算器",
    sys_calc_desc: "根据日活 (DAU) 与请求读写比估算 QPS、存储吞吐量与 80/20 缓存内存需求。",
    dau_label: "日活跃用户数 (DAU)",
    reads_label: "每用户每日读取请求次数",
    writes_label: "每用户每日写入请求次数",
    payload_label: "平均数据写入大小 (KB)",
    http_title: "🌐 HTTP 响应状态码大全",

    // Awesome Directory
    dir_title: "⭐ 精选顶级 AI 与开发者工具库",
    dir_desc: "精选开源顶级自主 Agent、开发框架与核心基础设施。",

    // Footer
    footer_crafted: "由开发者用心打造",
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
        btn.classList.add('bg-sky-500/20', 'text-sky-400', 'border-sky-500/50');
        btn.classList.remove('text-slate-400');
      } else {
        btn.classList.remove('bg-sky-500/20', 'text-sky-400', 'border-sky-500/50');
        btn.classList.add('text-slate-400');
      }
    });

    if (window.showToast && triggerSound) {
      const names = { en: 'English', ru: 'Русский', zh: '中文' };
      window.showToast(`Language switched to ${names[lang]}`, 'info');
    }
  }

  t(key) {
    const dict = I18N_DATA[this.currentLang] || I18N_DATA.en;
    return dict[key] || key;
  }
}

window.i18n = new I18nManager();
