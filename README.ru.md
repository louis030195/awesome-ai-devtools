<div align="center">

# ⚡ OmniDev // Awesome AI DevTools

### *Ультимативный Open-Source Кокпит для AI-Инженеров и Разработчиков*

[![GitHub Stars](https://img.shields.io/github/stars/ilynx69/awesome-ai-devtools?style=for-the-badge&logo=github&color=38bdf8)](https://github.com/ilynx69/awesome-ai-devtools/stargazers)
[![Live Demo](https://img.shields.io/badge/Демо-Открыть_Сайт-10b981?style=for-the-badge&logo=github-pages&logoColor=white)](https://ilynx69.github.io/awesome-ai-devtools/)
[![Лицензия: MIT](https://img.shields.io/badge/Лицензия-MIT-c084fc?style=for-the-badge)](LICENSE)
[![Языки](https://img.shields.io/badge/Языки-JS_|_Python_|_Rust_|_TS-6366f1?style=for-the-badge)]()

<br />

[**English**](README.md) • [**Русский**](README.ru.md) • [**中文 (简体)**](README.zh.md)

<br />

[**🌐 Открыть рабочий сайт**](https://ilynx69.github.io/awesome-ai-devtools/) • [**✨ Возможности**](#-ключевой-функционал) • [**⚡ Быстрый старт**](#-быстрый-старт) • [**🤝 Участие**](#-участие-в-разработке)

</div>

---

## 🌟 Что такое OmniDev?

**OmniDev** — это сверхбыстрый, работающий на 100% в браузере дашборд и CLI-инструментарий для **AI-инженеров, архитекторов и разработчиков**.

Он избавляет от десятков открытых вкладок, объединяя ежедневные задачи в единый стильный интерфейс:
- **Промпт-Студия** с параметризацией и динамической подстановкой `{{variables}}`.
- **Встроенная бесплатная нейросеть (AI Copilot & Code Lab)**: аудит безопасности OWASP, рефакторинг, юнит-тесты и Big-O анализ прямо на сайте без регистрации и ключей.
- **Model Context Protocol (MCP) Хаб**: визуальный выбор серверов и генерация `claude_desktop_config.json` в один клик.
- **DevToys Suite**: декодер JWT с таймером истечения, конвертер cURL в JavaScript/Python/Go/Rust, студия JSON, песочница Regex, хэши/UUID, расшифровка Cron и спасение в Git.
- **Калькулятор емкости System Design**: расчет QPS, дискового хранилища в год, трафика и объема RAM для кэширования по правилу 80/20.
- **AI Радар моделей 2026**: сравнение цен за 1M токенов, контекста и скорости моделей (Claude 3.5 Sonnet, DeepSeek R1/V3, GPT-4o, Gemini 2.0 Flash, Llama 3.3).

---

## 🚀 Ключевой функционал

### 1. 🤖 Бесплатный AI Копилот и Code Lab
* **Бесплатный облачный доступ** (Pollinations / DeepSeek) без обязательного API-ключа.
* **Встроенный локальный эвристический анализатор**: мгновенно отвечает даже без интернета (100% приватность).
* **Поддержка локальной Ollama** (`http://localhost:11434`) и кастомных ключей (Groq, OpenRouter).
* **Быстрые действия в 1 клик**: аудит безопасности OWASP, чистый рефакторинг SOLID, генерация тестов, перевод кода на Rust и Python.

### 2. ⚡ Промпт-Студия (Prompt Engineering)
* Готовые архитектурные и инженерные шаблоны (Senior Architect, OWASP Audit, SQL Tuning, Incident Post-Mortem, OpenAPI 3.1).
* Прямая отправка готового промпта в AI Копилот кнопкой «Отправить в AI Копилот 🤖».
* Скачивание готового промпта в формате `.md`.

### 3. 🔌 Конфигуратор Model Context Protocol (MCP)
* Готовые интеграции: Filesystem, GitHub, PostgreSQL, Brave Search, Puppeteer, Memory, Docker, Slack.
* Автоматическая валидация и генерация `claude_desktop_config.json`.
* Подсказки путей для Windows (`%APPDATA%`), macOS и Linux.

### 4. 🛠️ Набор офлайн-инструментов DevToys
* **Конвертер cURL**: преобразует curl-запрос в нативный JavaScript `fetch()`, Python `requests`, Go `http`, Rust `reqwest` или Node.js `axios`.
* **AI Токенайзер и калькулятор цен**: считает примерное количество токенов BPE и стоимость запроса в топ моделях.
* **JWT Inspector**: парсит payload и заголовок, наглядно отображает оставшееся время жизни токена.
* **JSON Studio**: форматирование с отступами 2 или 4 пробела, валидация с указанием строки ошибки и минификация.
* **Regex Playground**: тестирование регулярных выражений с популярными пресетами (Email, URL, IPv4, SemVer).
* **Git Wizard**: понятные рецепты решения проблем («отменить коммит без потери изменений», «сквош 3 коммитов», «случайный коммит в main»).

### 5. 📐 Калькулятор масштаба архитектуры (System Design)
* Введите DAU, количество чтений/записей на пользователя и размер пакета данных:
* Получите точный средний и пиковый QPS, прирост диска в год, требования к пропускной способности сети и объем RAM для кэша (правило Парето 80/20).

---

## 💻 Полиглотная структура проекта

OmniDev спроектирован на 4 ключевых языках со смыслом:
* **JavaScript / HTML / CSS**: Быстрый, реактивный интерфейс без сложного процесса сборки (работает прямо на GitHub Pages).
* **Python (`python/omnidev.py`)**: Полноценный консольный CLI-инструмент для AI-инженеров и работы в терминале.
* **Rust (`rust/src/main.rs`)**: Высокопроизводительный системный CLI для молниеносных вычислений и экспорта конфигураций.
* **TypeScript (`types/index.d.ts`)**: Строгие типизированные контракты и интерфейсы данных.

---

## ⚡ Быстрый старт

### Запуск локально
```bash
# Клонируйте репозиторий
git clone https://github.com/ilynx69/awesome-ai-devtools.git
cd awesome-ai-devtools

# Запустите локальный сервер (Python 3)
python -m http.server 3000

# Или через Node.js npx
npx serve .
```
Откройте [http://localhost:3000](http://localhost:3000) в любом браузере.

### Использование Python CLI
```bash
python python/omnidev.py list-prompts
python python/omnidev.py calc-capacity --dau 10000000 --writes 5
python python/omnidev.py ask-ai "How to design a distributed cache?"
```

---

## ⌨️ Горячие клавиши

| Сочетание | Действие |
| :--- | :--- |
| <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>Cmd</kbd> + <kbd>K</kbd> | Открыть командную палитру и глобальный поиск |
| <kbd>ESC</kbd> | Закрыть модальное окно / поиск |

---

## 📄 Лицензия

Распространяется под лицензией MIT. Подробнее в файле [LICENSE](LICENSE).

<div align="center">
  <b>Разработано <a href="https://github.com/ilynx69">@ilynx69</a></b><br>
  <i>Поставьте ⭐, если проект оказался полезен!</i>
</div>
