document.addEventListener('DOMContentLoaded', () => {
    initFloatingHearts();
    initScrollReveal();
    initMobileMenu();
});

/**
 * Handles mobile menu toggle
 */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/**
 * Creates floating hearts in the background
 */
function initFloatingHearts() {
    const container = document.getElementById('heart-container');
    const heartCount = 20;

    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createHeart(container);
        }, i * 500);
    }

    // Continuously create hearts
    setInterval(() => {
        createHeart(container);
    }, 2000);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = '❤️';
    
    const size = Math.random() * 20 + 10;
    const startPos = Math.random() * 100;
    const duration = Math.random() * 5 + 10;
    
    heart.style.fontSize = `${size}px`;
    heart.style.left = `${startPos}%`;
    heart.style.animationDuration = `${duration}s`;
    
    container.appendChild(heart);
    
    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

/**
 * Handles subtle scroll reveal animations for sections
 */
function initScrollReveal() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, options);

    document.querySelectorAll('.timeline-item, .gallery-item, .note-card').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });

    // Add a helper class for the reveal effect
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}
