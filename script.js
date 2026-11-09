/* ============================================================
   SACHIT KUMAR CHAURASIYA — PORTFOLIO
   JavaScript — Animations, Navigation & Interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ======================== NAVBAR SCROLL ========================
    const navbar = document.getElementById('navbar');

    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll);

    // ======================== MOBILE NAVIGATION ========================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ======================== ACTIVE NAV LINK HIGHLIGHT ========================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-cta)');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);

    // Add active-link styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active-link {
            color: var(--primary-light) !important;
            background: rgba(124,58,237,0.1);
        }
    `;
    document.head.appendChild(style);

    // ======================== STAT COUNTER ANIMATION ========================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;

        const heroSection = document.getElementById('hero');
        const heroRect = heroSection.getBoundingClientRect();

        if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const start = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease-out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);

                    stat.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run on load in case hero is visible

    // ======================== SCROLL REVEAL ANIMATIONS ========================
    const revealElements = document.querySelectorAll(
        '.skill-card, .project-card, .testimonial-card, .contact-info-card, .about-content, .about-image-wrapper, .detail-item'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        revealElements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.88) {
                // Stagger delay based on sibling index
                const parent = el.parentElement;
                const siblingIndex = Array.from(parent.children).indexOf(el);
                const delay = siblingIndex * 80;

                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // ======================== SKILL CARD MOUSE GLOW EFFECT ========================
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Add dynamic glow style
    const glowStyle = document.createElement('style');
    glowStyle.textContent = `
        .skill-card .skill-card-glow {
            background: radial-gradient(
                300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(124,58,237,0.12),
                transparent 50%
            );
        }
        .skill-card:hover .skill-card-glow {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(glowStyle);

    // ======================== CONTACT FORM ========================
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Visual feedback
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 3000);

        console.log('Form data:', data);
    });

    // ======================== SMOOTH SCROLL FOR ALL ANCHORS ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ======================== TILT EFFECT ON PROJECT CARDS ========================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const tiltX = (y - 0.5) * 6;
            const tiltY = (x - 0.5) * -6;

            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ======================== PORTFOLIO FILTERING ========================
    const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-grid .project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = card.classList.contains('project-card-featured') ? 'grid' : 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ======================== TYPED TEXT EFFECT (HERO BADGE) ========================
    const badge = document.querySelector('.hero-badge');
    if (badge) {
        const messages = [
            '⚡ Hardware & Embedded Systems Builder',
            '🔬 B.Tech ECE • University of Lucknow',
            '♻️ Project Neodymium • Rare-Earth Cleantech',
            '🤖 Mesmerize Robot • Autonomous Robotics',
            '📡 ESP32 & Embedded Systems Firmware',
            '🌐 Multi-Agent Systems & Team Hacksphere'
        ];
        let messageIndex = 0;

        setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            badge.style.opacity = '0';
            badge.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                badge.textContent = messages[messageIndex];
                badge.style.opacity = '1';
                badge.style.transform = 'translateY(0)';
            }, 300);
        }, 3500);

        badge.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }

    // ======================== PARALLAX ON HERO SHAPES ========================
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.15;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ======================== PRELOADER ========================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 600);
            }, 800);
        });
    }

    // ======================== BACK TO TOP ========================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======================== PARTICLE CANVAS ========================
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 40;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.5 + 0.1;
                // Colors: purple, cyan, amber
                const colors = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(245,158,11,'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = `${this.color}${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animateParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Connect nearby particles with lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.strokeStyle = `rgba(124,58,237,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // ======================== RESUME BUTTON MODAL ========================
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 Resume download: Place your resume.pdf file in this folder to enable direct downloads!');
        });
    }

});
