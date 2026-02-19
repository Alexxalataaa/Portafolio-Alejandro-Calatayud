// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.reveal');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    });
});

// Scroll Animation Reveal (General)
const revealSection = function (entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// --- Lógica del Teléfono: Revelar y Copiar ---
const phoneDisplay = document.getElementById('phone-display');
const realPhone = "+34 633 24 51 47";
let isRevealed = false;

if (phoneDisplay) {
    phoneDisplay.addEventListener('click', function () {
        if (!isRevealed) {
            this.style.opacity = "0";
            setTimeout(() => {
                this.textContent = realPhone;
                this.classList.add('phone-animate');
                this.style.opacity = "1";
                this.title = "Haz clic para copiar al portapapeles";
                isRevealed = true;
            }, 200);
        } else {
            navigator.clipboard.writeText(realPhone).then(() => {
                const originalText = this.textContent;
                this.textContent = "¡Número copiado!";
                this.style.color = "#4ade80";
                this.style.borderColor = "#4ade80";
                this.style.boxShadow = "0 0 15px rgba(74, 222, 128, 0.5)";

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.color = "";
                    this.style.borderColor = "";
                    this.style.boxShadow = "";
                }, 2000);
            });
        }
    });
}

// --- Animación Progresiva de Barras de Habilidades ---
const progressBars = document.querySelectorAll('.bar-fill');

const observerHabilidades = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                const skillInfo = bar.closest('.skill-bar').querySelector('.info span:last-child');
                const percentValue = skillInfo.textContent;
                bar.style.width = percentValue;
            });
            observerHabilidades.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-category').forEach(category => {
    // Inicializamos a 0 cada categoría antes de observar
    category.querySelectorAll('.bar-fill').forEach(bar => bar.style.width = '0');
    observerHabilidades.observe(category);
});

// Animación de los Idiomas al hacer scroll
const observerIdiomas = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circles = entry.target.querySelectorAll('.circle');
            circles.forEach(circle => {
                const percent = circle.getAttribute('data-percent');
                circle.style.strokeDasharray = `${percent}, 100`;
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.languages-grid').forEach(grid => observerIdiomas.observe(grid));