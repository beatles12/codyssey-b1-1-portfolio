const THEME_STORAGE_KEY = "portfolio-theme-v3";
const THEME_SOURCE_KEY = "portfolio-theme-source-v3";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

// 저장된 수동 선택이 없으면 시스템 테마를 사용한다.
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const themeSource = localStorage.getItem(THEME_SOURCE_KEY);

    if (themeSource === "manual" && ["light", "dark"].includes(savedTheme)) {
        return savedTheme;
    }

    return systemTheme.matches ? "dark" : "light";
};

const STATE = {
    theme: getInitialTheme(),
    themeSource: localStorage.getItem(THEME_SOURCE_KEY) === "manual"
        ? "manual"
        : "system",
    menuOpen: false,
    projects: [],
    filter: "All",
    formErrors: {}
};

const GITHUB_USERNAME = "beatles12";
const PREFERRED_PROJECTS = [
    "codyssey-b2-1-budget",
    "codyssey-mini-npu",
    "codyssey-quiz-game",
    "codyssey"
];

const PROJECT_OVERRIDES = {
    codyssey: {
        description: "macOS에서 Git·GitHub·OrbStack·Docker·Nginx를 직접 구성한 개발 워크스테이션 구축 프로젝트입니다.",
        tech: "Git · Docker · Nginx"
    },
    "codyssey-b2-1-budget": { tech: "Python" },
    "codyssey-mini-npu": { tech: "Python" },
    "codyssey-quiz-game": { tech: "Python" }
};

const siteHeader = document.querySelector("#site-header");
const themeToggle = document.querySelector("#theme-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const navMenu = document.querySelector("#nav-menu");
const navLinks = document.querySelectorAll("#nav-menu a");
const backToTop = document.querySelector("#back-to-top");
const projectStatus = document.querySelector("#project-status");
const projectFilters = document.querySelector("#project-filters");
const projectList = document.querySelector("#project-list");
const contactForm = document.querySelector("#contact-form");
const profileImage = document.querySelector("#profile-image");
const profilePlaceholder = document.querySelector("#profile-placeholder");

// 현재 테마를 화면에 적용한다.
const renderTheme = () => {
    document.documentElement.dataset.theme = STATE.theme;
    themeToggle.textContent = STATE.theme === "dark" ? "Light" : "Dark";
    themeToggle.setAttribute(
        "aria-label",
        STATE.theme === "dark" ? "라이트 모드로 변경" : "다크 모드로 변경"
    );
};

// 사용자가 직접 테마를 전환하고 선택을 저장한다.
const toggleTheme = () => {
    STATE.theme = STATE.theme === "light" ? "dark" : "light";
    STATE.themeSource = "manual";

    localStorage.setItem(THEME_STORAGE_KEY, STATE.theme);
    localStorage.setItem(THEME_SOURCE_KEY, "manual");

    renderTheme();
};

// 시스템 테마를 다시 확인해 화면에 적용한다.
const syncSystemTheme = () => {
    if (STATE.themeSource === "manual") return;

    const nextTheme = systemTheme.matches ? "dark" : "light";

    if (STATE.theme === nextTheme) return;

    STATE.theme = nextTheme;
    renderTheme();
};

// 시스템 테마가 변경되면 자동으로 반영한다.
const handleSystemThemeChange = event => {
    if (STATE.themeSource === "manual") return;

    STATE.theme = event.matches ? "dark" : "light";
    renderTheme();
};

// 모바일 메뉴 상태를 화면에 적용한다.
const renderMenu = () => {
    navMenu.classList.toggle("active", STATE.menuOpen);
    menuToggle.setAttribute("aria-expanded", String(STATE.menuOpen));
};

// 모바일 메뉴를 열고 닫는다.
const toggleMenu = () => {
    STATE.menuOpen = !STATE.menuOpen;
    renderMenu();
};

// 모바일 메뉴를 닫는다.
const closeMenu = () => {
    STATE.menuOpen = false;
    renderMenu();
};

// 스크롤 위치에 따라 화면 요소를 변경한다.
const handleScroll = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY >= 60);
    backToTop.classList.toggle("visible", window.scrollY >= 300);
};

// 페이지 맨 위로 이동한다.
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

// HTML 특수문자를 안전하게 변환한다.
const escapeHtml = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

// 프로젝트별 미니 화면을 만든다.
const getProjectVisual = name => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("budget")) {
        return `
            <div class="project-visual mini-budget" aria-hidden="true">
                <div class="mini-budget-head"><span>이번 달 잔액</span><strong>₩245,000</strong></div>
                <div class="mini-money"><span>수입</span><b>+320,000</b></div>
                <div class="mini-money expense"><span>지출</span><b>-75,000</b></div>
                <div class="mini-chart"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
        `;
    }

    if (lowerName.includes("npu")) {
        return `
            <div class="project-visual mini-npu" aria-hidden="true">
                <div class="npu-labels">
                    <span>INPUT</span>
                    <span>CONVOLUTION</span>
                    <span>FEATURE MAP</span>
                </div>
                <div class="npu-flow">
                    <div class="matrix">
                        <i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                    </div>
                    <b>→</b>
                    <div class="chip">NPU</div>
                    <b>→</b>
                    <div class="matrix output">
                        <i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                        <i></i><i></i><i></i>
                    </div>
                </div>
            </div>
        `;
    }

    if (lowerName.includes("quiz")) {
        return `
            <div class="project-visual mini-quiz" aria-hidden="true">
                <div class="quiz-head"><strong>Q.</strong><span>3 / 5</span></div>
                <p>Python에서 리스트를 만드는 방법은?</p>
                <div class="quiz-option active">
                    <b>A</b><span>[1, 2, 3]</span>
                </div>
                <div class="quiz-option">
                    <b>B</b><span>(1, 2, 3)</span>
                </div>
                <div class="quiz-option">
                    <b>C</b><span>{1, 2, 3}</span>
                </div>
            </div>
        `;
    }

    return `
        <div class="project-visual mini-workstation" aria-hidden="true">
            <div class="terminal-top">
                <div><i></i><i></i><i></i></div>
                <span>developer workstation</span>
            </div>
            <div class="terminal-body">
                <p><b>$</b> docker ps</p>
                <div class="docker-row">
                    <span>nginx</span><strong>RUNNING</strong>
                </div>
                <p><b>$</b> git status</p>
                <div class="git-row">
                    <span>branch</span><strong>main ✓</strong>
                </div>
            </div>
            <div class="workstation-tags">
                <span>Git</span>
                <span>Docker</span>
                <span>Nginx</span>
            </div>
        </div>
    `;
};

// 실제 프로젝트 실행 화면의 이미지 경로를 관리한다.
const PROJECT_SCREENSHOTS = {
    "codyssey-b2-1-budget": "images/budget.png",
    "codyssey-mini-npu": "images/miniNPU.png",
    "codyssey-quiz-game": "images/quiz_game.png",
    "codyssey": "images/workstation.png"
};

// GitHub 프로젝트 카드 HTML을 만든다.
const createProjectCard = (project, index) => {
    const { name, description: apiDescription, language, html_url: htmlUrl } = project;
    const number = String(index + 1).padStart(2, "0");
    const override = PROJECT_OVERRIDES[name] || {};
    const safeName = escapeHtml(name);
    const description = escapeHtml(
        override.description || apiDescription || "GitHub에서 관리하고 있는 프로젝트입니다."
    );
    const tech = escapeHtml(override.tech || language || "Project");
    const url = escapeHtml(htmlUrl);
    const imagePath = PROJECT_SCREENSHOTS[name];
    const screenshot = imagePath
        ? `<img class="project-screenshot" src="${escapeHtml(imagePath)}" alt="${safeName} 실제 실행 화면" loading="lazy">`
        : "";

    return `
        <article class="project-card" data-project="${safeName}">
            ${getProjectVisual(name)}
            ${screenshot}
            <span class="project-card-number">${number}</span>
            <h3>${safeName}</h3>
            <p>${description}</p>
            <span class="project-tech">${tech}</span>
            <a class="project-card-link" href="${url}" target="_blank"
                rel="noopener noreferrer"
                aria-label="${safeName} GitHub 저장소 열기">→</a>
        </article>
    `;
};

// 이미지가 정상 로드된 카드에서만 전환 효과를 활성화한다.
projectList.addEventListener("load", event => {
    if (!event.target.classList.contains("project-screenshot")) return;
    event.target.closest(".project-card").classList.add("has-screenshot");
}, true);

// 선택한 언어 또는 기술에 맞는 프로젝트를 출력한다.
const renderProjects = () => {
    const projects = STATE.projects.filter(project => {
        if (STATE.filter === "All") return true;
        if (STATE.filter.startsWith("lang:")) {
            return project.language === STATE.filter.slice(5);
        }
        if (STATE.filter.startsWith("tech:")) {
            const tech = PROJECT_OVERRIDES[project.name]?.tech || project.language || "";
            const technologies = tech.split("·").map(item => item.trim());
            return technologies.includes(STATE.filter.slice(5));
        }
        return false;
    });

    if (!projects.length) {
        projectList.innerHTML = "";
        projectStatus.textContent = "표시할 프로젝트가 없습니다.";
        return;
    }

    projectList.innerHTML = projects.map(createProjectCard).join("");
    projectStatus.textContent = `${projects.length}개의 프로젝트를 표시하고 있습니다.`;
};

// GitHub 언어 필터와 프로젝트 기술 필터를 만든다.
const renderProjectFilters = () => {
    const languages = [...new Set(
        STATE.projects.map(project => project.language).filter(Boolean)
    )];

    const filters = [
        { value: "All", label: "All", hint: "전체 프로젝트" },
        ...languages.map(language => ({
            value: `lang:${language}`,
            label: language,
            hint: "GitHub에서 확인한 언어"
        })),
        { value: "tech:Python", label: "Python", hint: "프로젝트 사용 기술" },
        { value: "tech:Docker", label: "Docker", hint: "프로젝트 사용 기술" }
    ];

    projectFilters.innerHTML = "";

    filters.forEach(filter => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `filter-button${STATE.filter === filter.value ? " active" : ""}`;
        button.textContent = filter.label;
        button.title = filter.hint;
        button.setAttribute("aria-pressed", String(STATE.filter === filter.value));

        button.addEventListener("click", () => {
            STATE.filter = filter.value;
            renderProjectFilters();
            renderProjects();
        });

        projectFilters.appendChild(button);
    });
};
// 프로젝트 로딩 실패 상태를 출력한다.
const renderProjectError = () => {
    projectStatus.textContent = "프로젝트를 불러올 수 없습니다.";
    projectList.innerHTML =
        '<button id="project-retry" class="filter-button" type="button">다시 시도</button>';

    document
        .querySelector("#project-retry")
        .addEventListener("click", loadProjects);
};

// 원하는 저장소를 우선순위대로 정렬한다.
const sortPreferredProjects = projects => [...projects].sort((a, b) => {
    const aIndex = PREFERRED_PROJECTS.indexOf(a.name);
    const bIndex = PREFERRED_PROJECTS.indexOf(b.name);
    const aPriority = aIndex === -1 ? 999 : aIndex;
    const bPriority = bIndex === -1 ? 999 : bIndex;

    if (aPriority !== bPriority) {
        return aPriority - bPriority;
    }

    return new Date(b.updated_at) - new Date(a.updated_at);
});

// GitHub API에서 프로젝트 목록을 가져온다.
const loadProjects = async () => {
    projectStatus.textContent = "GitHub 프로젝트를 불러오는 중입니다.";
    projectList.innerHTML = "";
    projectFilters.innerHTML = "";

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error(`GitHub API 오류: ${response.status}`);
        }

        const projects = await response.json();
        const usableProjects = projects.filter(
            project => !project.fork && !project.archived
        );

        STATE.projects = sortPreferredProjects(usableProjects).slice(0, 4);

        if (!STATE.projects.length) {
            projectStatus.textContent = "표시할 프로젝트가 없습니다.";
            return;
        }

        renderProjectFilters();
        renderProjects();
    } catch (error) {
        renderProjectError();
    }
};

// 이메일 형식이 올바른지 검사한다.
const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// 문의 폼 입력값을 검사한다.
const validateForm = formData => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = "이름을 입력해 주세요.";
    }

    if (!formData.email.trim()) {
        errors.email = "이메일을 입력해 주세요.";
    } else if (!validateEmail(formData.email)) {
        errors.email = "올바른 이메일 형식을 입력해 주세요.";
    }

    if (!formData.message.trim()) {
        errors.message = "메시지를 입력해 주세요.";
    }

    return errors;
};

// 문의 폼 오류 메시지를 출력한다.
const renderFormErrors = () => {
    ["name", "email", "message"].forEach(field => {
        document.querySelector(`#${field}-error`).textContent =
            STATE.formErrors[field] || "";
    });
};

// 문의 폼을 검사하고 Formspree로 전송한다.
const handleFormSubmit = async event => {
    event.preventDefault();
    const formData = {
        name: contactForm.elements.namedItem("name").value,
        email: contactForm.elements.namedItem("email").value,
        message: contactForm.elements.namedItem("message").value
    };
    STATE.formErrors = validateForm(formData);
    renderFormErrors();

    const status = document.querySelector("#form-success");
    if (Object.keys(STATE.formErrors).length) {
        status.textContent = "";
        return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (!submitButton || submitButton.disabled) return;

    submitButton.disabled = true;
    status.setAttribute("role", "status");
    status.textContent = "메시지를 전송하는 중입니다...";

    try {
        const body = new FormData();
        body.append("name", formData.name.trim());
        body.append("email", formData.email.trim());
        body.append("message", formData.message.trim());

        const response = await fetch("https://formspree.io/f/mvkzqbrk", {
            method: "POST",
            body,
            headers: { Accept: "application/json" }
        });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        status.textContent = "메시지가 정상적으로 전송되었습니다. 감사합니다.";
        contactForm.reset();
        STATE.formErrors = {};
        renderFormErrors();
    } catch (error) {
        status.textContent = `전송 실패 (${error.message}). 잠시 후 다시 시도해 주세요.`;
    } finally {
        submitButton.disabled = false;
    }
};
// 입력 중인 필드의 오류를 다시 검사한다.
const validateField = event => {
    const field = event.target.name;

    const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
    };

    const errors = validateForm(formData);

    STATE.formErrors[field] = errors[field] || "";
    renderFormErrors();
};

// 프로필 이미지가 없으면 기본 디자인을 표시한다.
const handleProfileImage = () => {
    const hasImage =
        profileImage.complete && profileImage.naturalWidth > 0;

    profileImage.style.display = hasImage ? "block" : "none";
    profilePlaceholder.style.display = hasImage ? "none" : "grid";
};

// 제목 높이를 먼저 확보하고 텍스트 노드를 준비한다.
const prepareTypingParts = element => {
    const fullHeight = element.getBoundingClientRect().height;

    element.style.minHeight = `${fullHeight}px`;

    const walker = document.createTreeWalker(
        element,
        NodeFilter.SHOW_TEXT
    );

    const parts = [];

    while (walker.nextNode()) {
        const node = walker.currentNode;
        const text = node.nodeValue.replace(/\s+/g, " ");

        if (text.trim()) {
            parts.push({ node, text });
        }
    }

    parts.forEach(part => {
        part.node.nodeValue = "";
    });

    return parts;
};

// 확보된 제목 공간에서 한 글자씩 천천히 표시한다.
const typeHeading = element => {
    if (element.dataset.typed === "true") return;

    element.dataset.typed = "true";

    const parts = prepareTypingParts(element);

    let partIndex = 0;
    let charIndex = 0;

    const typeNext = () => {
        if (partIndex >= parts.length) {
            element.style.minHeight = "";
            return;
        }

        const part = parts[partIndex];
        const currentChar = part.text[charIndex];

        part.node.nodeValue += currentChar;
        charIndex += 1;

        let delay = 110;

        if (currentChar === " ") {
            delay = 85;
        }

        if ([",", "，"].includes(currentChar)) {
            delay = 270;
        }

        if ([".", "!", "?", "。"].includes(currentChar)) {
            delay = 450;
        }

        if (charIndex >= part.text.length) {
            partIndex += 1;
            charIndex = 0;
            delay = Math.max(delay, 300);
        }

        setTimeout(typeNext, delay);
    };

    typeNext();
};

// 각 섹션의 큰 제목이 충분히 보일 때 타이핑을 시작한다.
const startHeadingTyping = () => {
    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    const headings = document.querySelectorAll(
        ".hero h1, .about h2, .skills h2, .projects h2, .contact h2"
    );

    const headingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            typeHeading(entry.target);
            headingObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.7,
        rootMargin: "0px 0px -8% 0px"
    });

    headings.forEach(heading => {
        if (heading.matches(".hero h1")) {
            setTimeout(() => typeHeading(heading), 550);
            return;
        }

        headingObserver.observe(heading);
    });
};

// 섹션이 화면에 들어오면 등장 효과를 적용한다.
const startRevealAnimation = () => {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });

    document.querySelectorAll(".reveal").forEach(section => {
        revealObserver.observe(section);
    });
};

themeToggle.addEventListener("click", toggleTheme);
menuToggle.addEventListener("click", toggleMenu);

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

contactForm
    .querySelectorAll("input, textarea")
    .forEach(field => {
        field.addEventListener("blur", validateField);

        field.addEventListener("input", event => {
            if (STATE.formErrors[event.target.name]) {
                validateField(event);
            }
        });
    });

systemTheme.addEventListener(
    "change",
    handleSystemThemeChange
);

window.addEventListener(
    "focus",
    syncSystemTheme
);

document.addEventListener(
    "visibilitychange",
    () => {
        if (!document.hidden) {
            syncSystemTheme();
        }
    }
);

window.addEventListener(
    "scroll",
    handleScroll
);

backToTop.addEventListener(
    "click",
    scrollToTop
);

contactForm.addEventListener(
    "submit",
    handleFormSubmit
);

profileImage.addEventListener(
    "load",
    handleProfileImage
);

profileImage.addEventListener(
    "error",
    handleProfileImage
);

renderTheme();
renderMenu();
handleScroll();
handleProfileImage();
loadProjects();
startRevealAnimation();
startHeadingTyping();

// Windows 시스템 테마로 복귀하는 버튼을 만든다.
const autoThemeButton = document.createElement("button");
autoThemeButton.type = "button";
autoThemeButton.className = themeToggle.className;
autoThemeButton.textContent = STATE.themeSource === "system" ? "Auto ✓" : "Auto";
autoThemeButton.setAttribute("aria-label", "Windows 시스템 테마 자동 적용");
autoThemeButton.style.marginRight = "8px";
themeToggle.before(autoThemeButton);

// 자동 모드를 선택하고 기존 수동 선택을 해제한다.
autoThemeButton.addEventListener("click", () => {
    STATE.themeSource = "system";
    localStorage.removeItem(THEME_STORAGE_KEY);
    localStorage.removeItem(THEME_SOURCE_KEY);
    syncSystemTheme();
    autoThemeButton.textContent = "Auto ✓";
});

// 수동으로 테마를 선택하면 자동 모드 표시를 해제한다.
themeToggle.addEventListener("click", () => {
    autoThemeButton.textContent = "Auto";
});