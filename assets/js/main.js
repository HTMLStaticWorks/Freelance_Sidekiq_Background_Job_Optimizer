// Navbar Scroll Effect
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Counter Animation for Stats
const stats = document.querySelectorAll('.stat-value');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseFloat(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

function animateCounter(el, target) {
    let current = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            el.innerText = target % 1 === 0 ? target + (el.innerText.includes('x') ? 'x' : '%') : target.toFixed(1) + '%';
            clearInterval(timer);
        } else {
            el.innerText = current.toFixed(1) + (el.innerText.includes('x') ? 'x' : '%');
        }
    }, stepTime);
}

// RTL Toggle
const rtlToggle = document.getElementById('rtlToggle');
if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
        const isRtl = document.documentElement.dir === 'rtl';
        document.documentElement.dir = isRtl ? 'ltr' : 'rtl';
        rtlToggle.innerText = isRtl ? 'RTL' : 'LTR';
    });
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const THEME_STORAGE_KEY = 'sidepulse-theme';

function applyTheme(isLight) {
    document.body.classList.toggle('light-theme', isLight);
    if (themeToggle) {
        themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
}

try {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    applyTheme(savedTheme === 'light');
} catch (e) {
    applyTheme(document.body.classList.contains('light-theme'));
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-theme');
        const nextIsLight = !isLight;
        applyTheme(nextIsLight);
        try {
            localStorage.setItem(THEME_STORAGE_KEY, nextIsLight ? 'light' : 'dark');
        } catch (e) {}
    });
}

// Reveal on Scroll
const revealElements = document.querySelectorAll('.glass-card, .hero-content, h2');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    revealObserver.observe(el);
});

// Global Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}
