const LANGUAGE_STORAGE_KEY = "portfolio-language";
const languageToggle = document.querySelector("#language-toggle");

const LANGUAGE_CONTENT = {
    ".hero h1": {
        ko: "불편함 속에서<br>서비스는<br>시작됩니다.",
        en: "Great services begin<br>with understanding<br>people's needs."
    },
    ".hero-description": {
        ko: "복잡한 문제를 관찰하고 정리해, 실제로 사용할 수 있는 서비스로 연결합니다.",
        en: "I turn complex challenges into practical services people can use."
    },
    ".about .section-heading h2": {
        ko: "사람을 이해하는 마음에서<br>좋은 서비스가 시작됩니다.",
        en: "Great services begin<br>with understanding people."
    },
    ".about-copy .about-lead": {
        ko: "사람의 불편을 발견하고 복잡한 문제 속에서 핵심을 찾아내는 일을 좋아합니다.",
        en: "I enjoy identifying people's challenges and finding what matters most in complex problems."
    },
    ".about-copy p:nth-of-type(2)": {
        ko: "교육, 상담, 서비스 기획 경험을 바탕으로 AI와 웹 개발을 배우며 아이디어가 실제 제품으로 이어지는 과정을 만들어가고 있습니다.",
        en: "Building on my experience in education, consulting, and service planning, I am learning AI and web development to bring ideas into real products."
    },
    ".about-copy p:nth-of-type(3)": {
        ko: "기술 자체보다 누가, 왜, 어떻게 사용하는지를 먼저 생각합니다.",
        en: "I focus on who will use a service, why they need it, and how it can help."
    },
    ".skills .section-heading h2": {
        ko: "아이디어를 실행으로 옮기는<br>다양한 역할을 합니다.",
        en: "Bringing ideas to life<br>through different roles."
    },
    ".skill-card:nth-child(1) p": {
        ko: "사용자의 문제를 발견하고 서비스의 구조와 방향을 설계합니다.",
        en: "I identify user problems and design the structure and direction of services."
    },
    ".skill-card:nth-child(2) p": {
        ko: "AI를 활용해 아이디어를 구체화하고 서비스 가능성을 실험합니다.",
        en: "I use AI to develop ideas and explore their potential as services."
    },
    ".skill-card:nth-child(3) p": {
        ko: "HTML · CSS · JavaScript · Python으로 직접 구현합니다.",
        en: "I build solutions using HTML, CSS, JavaScript, and Python."
    },
    ".skill-card:nth-child(4) p": {
        ko: "교육 · 상담 · 문서화를 통해 복잡한 내용을 쉽게 전달합니다.",
        en: "I make complex ideas easier to understand through education, consulting, and documentation."
    },
    ".projects .project-heading h2": {
        ko: "생각을 현실로 만든<br>프로젝트들.",
        en: "Projects that turn<br>ideas into reality."
    },
    ".contact-copy h2": {
        ko: "좋은 아이디어를<br>함께 이야기해요.",
        en: "Let's talk about<br>great ideas."
    },
    ".footer a": {
        ko: "Back to top ↑",
        en: "Back to top ↑"
    }
};

// 선택한 언어를 홈페이지에 적용한다.
// WORK의 문구를 선택한 언어로 가져온다.
const WORK_TEXT = {
    ko: {
        loading: "GitHub 프로젝트를 불러오는 중입니다.",
        empty: "표시할 프로젝트가 없습니다.",
        count: count => `${count}개의 프로젝트를 표시하고 있습니다.`,
        error: "프로젝트를 불러올 수 없습니다.",
        retry: "다시 시도",
        allHint: "전체 프로젝트",
        languageHint: "GitHub에서 확인한 언어",
        technologyHint: "프로젝트 사용 기술",
        screenshotAlt: "실제 실행 화면",
        openRepo: "GitHub 저장소 열기",
        balance: "이번 달 잔액",
        income: "수입",
        expense: "지출",
        quizQuestion: "Python에서 리스트를 만드는 방법은?"
    },
    en: {
        loading: "Loading projects from GitHub...",
        empty: "No projects to display.",
        count: count => `Showing ${count} projects.`,
        error: "Unable to load projects.",
        retry: "Try again",
        allHint: "All projects",
        languageHint: "GitHub primary language",
        technologyHint: "Technologies used",
        screenshotAlt: "actual program screenshot",
        openRepo: "Open GitHub repository",
        balance: "Monthly balance",
        income: "Income",
        expense: "Expense",
        quizQuestion: "Which of these is a Python list?"
    }
};

// WORK의 번역 문구를 반환한다.
const getWorkText = (key, count) => {
    const lang = document.documentElement.lang === "en" ? "en" : "ko";
    const value = WORK_TEXT[lang][key];
    return typeof value === "function" ? value(count) : value;
};

const PROJECT_DESCRIPTIONS_EN = {
    "codyssey-b2-1-budget": "A Python budget tracker for income, expenses, and monthly summaries.",
    "codyssey-mini-npu": "A Python mini NPU simulator for matrix and MAC operations.",
    "codyssey-quiz-game": "A Python console quiz game with questions, answers, and score tracking.",
    codyssey: "A macOS development workstation configured with Git, GitHub, OrbStack, Docker, and Nginx."
};

// 프로젝트 설명을 현재 언어에 맞게 선택한다.
const getLocalizedProjectDescription = (name, overrideDescription, apiDescription) => {
    if (document.documentElement.lang === "en") {
        return PROJECT_DESCRIPTIONS_EN[name] || apiDescription || "A project managed on GitHub.";
    }
    return overrideDescription || apiDescription || "GitHub에서 관리하고 있는 프로젝트입니다.";
};

const applyLanguage = (language, switched = false) => {
    const lang = language === "en" ? "en" : "ko";
    document.documentElement.lang = lang;

    Object.entries(LANGUAGE_CONTENT).forEach(([selector, translations]) => {
        const element = document.querySelector(selector);
        if (!element) return;

        element.innerHTML = translations[lang];

        if (switched && element.matches("h1, h2")) {
            element.dataset.typed = "true";
            element.style.minHeight = "";
        }
    });

    languageToggle.textContent = lang === "ko" ? "EN" : "KR";

    languageToggle.setAttribute(
        "aria-label",
        lang === "ko" ? "Switch to English" : "한국어로 전환"
    );

    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
};

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
applyLanguage(savedLanguage === "en" ? "en" : "ko");

languageToggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "ko" ? "en" : "ko";
    applyLanguage(nextLanguage, true);

    if (STATE.projects.length) {
        renderProjectFilters();
        renderProjects();
    } else if (projectList.querySelector("#project-retry")) {
        renderProjectError();
    } else {
        projectStatus.textContent = getWorkText("loading");
    }
});