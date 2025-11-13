// script.js - Enhances the portfolio with interactive functionality

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission handling
const contactForm = document.querySelector('form[action^="mailto"]');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = this.querySelector('input[name="Name"]').value.trim();
        const email = this.querySelector('input[name="Email"]').value.trim();
        const message = this.querySelector('textarea[name="Message"]').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill in all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // Optional: Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
    });
}

// Mobile navigation toggle (improved version)
const navToggle = document.getElementById('navToggle');
const nav = document.querySelector('nav');
if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('open');
        this.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    // Close nav when clicking outside or on a link
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Dynamic year update (already in HTML, but moved here for consistency)
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS for animations (via JS for dynamic addition)
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    nav.open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--glass);
        backdrop-filter: blur(8px);
        border-radius: 0 0 var(--radius) var(--radius);
        padding: 16px;
        box-shadow: var(--shadow);
    }

    @media (min-width: 721px) {
        nav.open {
            position: static;
            display: flex !important;
            flex-direction: row;
            background: transparent;
            backdrop-filter: none;
            box-shadow: none;
            padding: 0;
        }
    }
`;
document.head.appendChild(style);

// Theme toggle (optional dark/light mode switcher)
const themeToggle = document.createElement('button');
themeToggle.textContent = 'Toggle Theme';
themeToggle.className = 'btn secondary';
themeToggle.style.position = 'fixed';
themeToggle.style.bottom = '20px';
themeToggle.style.right = '20px';
themeToggle.style.zIndex = '1000';

themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('light-mode');
    localStorage.setItem('theme', document.documentElement.classList.contains('light-mode') ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
}

document.body.appendChild(themeToggle);
