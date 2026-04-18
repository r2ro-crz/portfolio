const THEME_STORAGE_KEY = "portfolio.theme";

function setTheme(theme) {
    const normalizedTheme = theme === "light" ? "light" : "dark";
    document.body.dataset.theme = normalizedTheme;
    localStorage.setItem(THEME_STORAGE_KEY, normalizedTheme);

    const themeButton = document.getElementById("themeButton");
    const themeSpan = document.getElementById("themeText");
    if (themeButton) {
        const icon = themeButton.querySelector('i');
        if (normalizedTheme === "dark") {
            if (icon) icon.className = "fas fa-moon";
            if (themeSpan) themeSpan.textContent = "Dark";
        } else {
            if (icon) icon.className = "fas fa-sun";
            if (themeSpan) themeSpan.textContent = "Light";
        }
    }
}

function getInitialTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
}

function toggleTheme() {
    const current = document.body.dataset.theme === "light" ? "light" : "dark";
    setTheme(current === "dark" ? "light" : "dark");
}

function setupMobileMenu() {
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("siteNav");
    if (!menuButton || !nav) return;

    function closeMenu() {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
    }

    function toggleMenu() {
        const isOpen = nav.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    }

    menuButton.addEventListener("click", toggleMenu);
    
    nav.addEventListener("click", (event) => {
        const target = event.target.closest('a');
        if (target && target.getAttribute("href")?.startsWith("#")) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });
}

function setupHeaderElevation() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
        const elevated = window.scrollY > 6;
        header.setAttribute("data-elevated", elevated ? "true" : "false");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

function setupYear() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
}

function showToast(message) {
    const toast = document.getElementById("toastMessage");
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add("show");
    
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

function setupProjectDemoRequests() {
    const buttons = document.querySelectorAll(".project-demo");
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const projectName = btn.getAttribute("data-project") || "this project";
            showToast(`✨ Thanks for your interest in ${projectName}! I'll get back to you soon.`);
            
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                setTimeout(() => {
                    contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        });
    });
}

function setupTypingEffect() {
    const typingEl = document.getElementById("typing");
    if (!typingEl) return;
    
    const originalText = "Software Developer & IT Specialist experienced in building scalable web and desktop applications. Dedicated to streamlining complex workflows through efficient coding and secure database management.";
    
    let i = 0;
    typingEl.innerHTML = '';
    
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'typing-cursor';
    cursorSpan.innerHTML = '|';
    cursorSpan.style.cssText = 'display: inline-block; width: 2px; height: 1.2em; background-color: var(--accent); margin-left: 2px; vertical-align: middle; animation: blink 1s step-end infinite;';
    
    function typeNext() {
        if (i < originalText.length) {
            typingEl.innerHTML = originalText.substring(0, i + 1);
            typingEl.appendChild(cursorSpan);
            i++;
            setTimeout(typeNext, 25);
        } else {
            cursorSpan.style.animation = 'blink 1s step-end infinite';
        }
    }
    
    typeNext();
}

function animateLanguageBars() {
    const bars = document.querySelectorAll('.lang-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const parentRow = bar.closest('.lang-row');
                if (parentRow) {
                    const value = getComputedStyle(parentRow).getPropertyValue('--value').trim();
                    bar.style.width = value;
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    bars.forEach(bar => {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupFadeInOnScroll() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
        observer.observe(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTheme(getInitialTheme());
    setupMobileMenu();
    setupHeaderElevation();
    setupYear();
    setupProjectDemoRequests();
    setupTypingEffect();
    animateLanguageBars();
    setupSmoothScroll();
    setupFadeInOnScroll();

    const themeButton = document.getElementById("themeButton");
    if (themeButton) themeButton.addEventListener("click", toggleTheme);
});