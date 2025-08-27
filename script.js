// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed header
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenuBtn && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Toggle more experience items
function toggleMoreExperience() {
    const moreExp = document.getElementById('moreExperience');
    const btn = document.getElementById('moreExpBtn');
    
    if (moreExp.classList.contains('hidden')) {
        moreExp.classList.remove('hidden');
        btn.innerHTML = 'View Less <i class="fas fa-chevron-up ml-2"></i>';
    } else {
        moreExp.classList.add('hidden');
        btn.innerHTML = 'View More Experience <i class="fas fa-chevron-down ml-2"></i>';
    }
}

// Add active navigation state based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('text-primary');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('text-primary');
        }
    });
}

// Navigation shadow is now handled in the optimized scroll handler above

// Animate elements on scroll with smoother transitions
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.05
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation with improved smoothness
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards on scroll with cubic-bezier easing
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate skill badges with smoother stagger
    const badges = document.querySelectorAll('.skill-badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(15px)';
        setTimeout(() => {
            badge.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 50);
    });
    
    // Initialize active navigation
    updateActiveNav();
});


// Blob physics animation with smoother movement
class Blob {
    constructor(element, index) {
        this.element = element;
        this.index = index;
        
        // Random starting position across the viewport
        const padding = 150;
        this.x = padding + Math.random() * (window.innerWidth - padding * 2);
        this.y = padding + Math.random() * (window.innerHeight - padding * 2);
        
        // Slower initial velocity for smoother movement
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.15;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        
        this.radius = parseInt(window.getComputedStyle(element).width) / 2;
        this.mass = this.radius;
        // Add wandering angle for organic movement
        this.wanderAngle = Math.random() * Math.PI * 2;
        
        // Start with full scale to avoid popping
        this.scale = 1;
        this.targetScale = 1;
        this.element.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px) scale(1)`;
        this.element.style.transition = 'none';
    }

    update() {
        // No scaling animation needed - already at full size

        // More subtle wandering for smoother movement
        this.wanderAngle += (Math.random() - 0.5) * 0.05;
        const wanderForce = 0.001;
        this.vx += Math.cos(this.wanderAngle) * wanderForce;
        this.vy += Math.sin(this.wanderAngle) * wanderForce;

        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Smoother wall bouncing with gradual force
        const padding = 100;
        const bounceForce = 0.008;
        
        if (this.x - this.radius <= padding) {
            const distance = this.x - this.radius;
            const force = Math.max(0, (padding - distance) / padding) * bounceForce;
            this.vx += force;
            this.x = Math.max(this.radius + padding * 0.5, this.x);
        } else if (this.x + this.radius >= window.innerWidth - padding) {
            const distance = window.innerWidth - (this.x + this.radius);
            const force = Math.max(0, (padding - distance) / padding) * bounceForce;
            this.vx -= force;
            this.x = Math.min(window.innerWidth - this.radius - padding * 0.5, this.x);
        }
        
        if (this.y - this.radius <= padding) {
            const distance = this.y - this.radius;
            const force = Math.max(0, (padding - distance) / padding) * bounceForce;
            this.vy += force;
            this.y = Math.max(this.radius + padding * 0.5, this.y);
        } else if (this.y + this.radius >= window.innerHeight - padding) {
            const distance = window.innerHeight - (this.y + this.radius);
            const force = Math.max(0, (padding - distance) / padding) * bounceForce;
            this.vy -= force;
            this.y = Math.min(window.innerHeight - this.radius - padding * 0.5, this.y);
        }

        // Apply smoother friction
        if (this.scale >= 1) {
            this.vx *= 0.998;
            this.vy *= 0.998;
        } else {
            // Less friction during expansion phase
            this.vx *= 0.999;
            this.vy *= 0.999;
        }

        // Ensure minimum speed to keep blobs gently moving
        const minSpeed = 0.05;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < minSpeed && this.scale >= 1) {
            const angle = Math.atan2(this.vy, this.vx);
            this.vx = Math.cos(angle) * minSpeed;
            this.vy = Math.sin(angle) * minSpeed;
        }

        // Limit maximum speed for smooth movement
        const maxSpeed = 0.25;
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        // Apply position and scale with smooth transition
        this.element.style.transform = `translate(${this.x - this.radius}px, ${this.y - this.radius}px) scale(${this.scale})`;
    }

    checkCollision(other) {
        const dx = other.x - this.x;
        const dy = other.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = this.radius + other.radius;

        if (distance < minDistance) {
            // Calculate collision response
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Rotate velocities
            const vx1 = this.vx * cos + this.vy * sin;
            const vy1 = this.vy * cos - this.vx * sin;
            const vx2 = other.vx * cos + other.vy * sin;
            const vy2 = other.vy * cos - other.vx * sin;

            // Collision reaction
            const finalVx1 = ((this.mass - other.mass) * vx1 + 2 * other.mass * vx2) / (this.mass + other.mass);
            const finalVx2 = ((other.mass - this.mass) * vx2 + 2 * this.mass * vx1) / (this.mass + other.mass);

            // Rotate velocities back
            this.vx = finalVx1 * cos - vy1 * sin;
            this.vy = vy1 * cos + finalVx1 * sin;
            other.vx = finalVx2 * cos - vy2 * sin;
            other.vy = vy2 * cos + finalVx2 * sin;

            // Separate blobs to prevent overlap
            const overlap = minDistance - distance;
            const separationX = (dx / distance) * overlap * 0.5;
            const separationY = (dy / distance) * overlap * 0.5;
            this.x -= separationX;
            this.y -= separationY;
            other.x += separationX;
            other.y += separationY;

            // Smoother energy loss
            this.vx *= 0.99;
            this.vy *= 0.99;
            other.vx *= 0.99;
            other.vy *= 0.99;
            
            // Add very small random impulse to prevent getting stuck
            this.vx += (Math.random() - 0.5) * 0.01;
            this.vy += (Math.random() - 0.5) * 0.01;
            other.vx += (Math.random() - 0.5) * 0.01;
            other.vy += (Math.random() - 0.5) * 0.01;
        }
    }
}

// Initialize blob animation
let blobs = [];
let animationId = null;

function initializeBlobAnimation() {
    const blobElements = document.querySelectorAll('.blob');
    
    // Create blobs already at full size
    blobs = Array.from(blobElements).map((el, index) => {
        const blob = new Blob(el, index);
        
        // Start at full size immediately
        blob.scale = 1;
        blob.targetScale = 1;
        
        return blob;
    });
    
    // Make all blobs visible at the same time
    setTimeout(() => {
        blobElements.forEach(el => {
            el.classList.add('visible');
        });
    }, 300);

    // Set up for physics animation
    blobElements.forEach(el => {
        el.style.left = '0';
        el.style.top = '0';
    });

    // Set initial positions
    blobs.forEach(blob => blob.update());

    function animate() {
        // Update each blob
        blobs.forEach(blob => blob.update());

        // Check collisions between all blob pairs
        for (let i = 0; i < blobs.length; i++) {
            for (let j = i + 1; j < blobs.length; j++) {
                blobs[i].checkCollision(blobs[j]);
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    // Start animation
    animate();
}

// Initialize blobs when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure blobs are positioned absolutely and have no CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .blob-1, .blob-2, .blob-3, .blob-4, .blob-5 { 
            animation: none !important; 
            position: absolute !important;
            opacity: 0 !important;
            transition: opacity 0.5s ease !important;
        }
        .blob.visible {
            opacity: 0.5 !important;
        }
        @media (prefers-color-scheme: dark) {
            .blob.visible {
                opacity: 0.7 !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Start blob animation immediately
    setTimeout(initializeBlobAnimation, 50);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Update boundaries for blobs
    blobs.forEach(blob => {
        blob.x = Math.min(blob.x, window.innerWidth - blob.radius);
        blob.y = Math.min(blob.y, window.innerHeight - blob.radius);
    });
});

// Add smoother hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '';
    });
});

// LinkedIn embed lazy loading for better performance
const iframes = document.querySelectorAll('iframe');
if (iframes.length > 0) {
    const lazyLoadIframe = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.hasAttribute('data-loaded')) {
                    iframe.setAttribute('data-loaded', 'true');
                }
                observer.unobserve(iframe);
            }
        });
    };

    const iframeObserver = new IntersectionObserver(lazyLoadIframe, {
        root: null,
        rootMargin: '100px',
        threshold: 0
    });

    iframes.forEach(iframe => {
        iframeObserver.observe(iframe);
    });
}

// Form validation for future contact form
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
});

// Performance optimization: Debounced scroll handler
let scrollTimeout;
let isScrolling = false;

function handleScroll() {
    if (!isScrolling) {
        isScrolling = true;
        window.requestAnimationFrame(() => {
            updateActiveNav();
            
            // Add shadow to navigation on scroll
            const nav = document.querySelector('nav');
            if (window.scrollY > 10) {
                nav.classList.add('shadow-md');
            } else {
                nav.classList.remove('shadow-md');
            }
            
            isScrolling = false;
        });
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Initialize on page load with smoother animations
window.addEventListener('load', () => {
    // Add loaded state
    document.body.classList.add('loaded');
    
    // Trigger initial animations with better timing
    const heroElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animationPlayState = 'running';
        }, index * 100);
    });
});

console.log('Website initialized successfully!');