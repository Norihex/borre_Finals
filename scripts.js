
        // Wait for the page to load
        window.addEventListener('load', () => {
            // Remove preloader
            setTimeout(() => {
                document.querySelector('.preloader').classList.add('fade-out');
            }, 1000);
            
            // Initialize typing animation
            const typedText = document.getElementById('typed-text');
            const phrases = ['John Doe', 'a Web Developer', 'a UI/UX Designer', 'a Problem Solver'];
            let currentPhrase = 0;
            let currentChar = 0;
            let isDeleting = false;
            let typingSpeed = 100;
            
            function typeText() {
                const phrase = phrases[currentPhrase];
                
                if (isDeleting) {
                    typedText.textContent = phrase.substring(0, currentChar - 1);
                    currentChar--;
                } else {
                    typedText.textContent = phrase.substring(0, currentChar + 1);
                    currentChar++;
                }
                
                // Typing speed adjustments
                if (isDeleting) {
                    typingSpeed = 50;
                } else if (currentChar === phrase.length) {
                    // Pause at end of phrase
                    typingSpeed = 1000;
                    isDeleting = true;
                } else if (currentChar === 0) {
                    // Move to next phrase
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    typingSpeed = 200;
                } else {
                    typingSpeed = 100;
                }
                
                setTimeout(typeText, typingSpeed);
            }
            
            // Start typing animation
            setTimeout(typeText, 1500);
            
            // Mobile menu toggle
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navbar');
            
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('#navbar li a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Sticky header
            window.addEventListener('scroll', () => {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Back to top button
            const backToTop = document.getElementById('back-to-top');
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Reveal sections on scroll
            const sections = document.querySelectorAll('section:not(.hero)');
            const revealSection = () => {
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight - 150) {
                        section.classList.add('section-visible');
                    }
                });
            };
            
            window.addEventListener('scroll', revealSection);
            revealSection(); // Initial check
            
            // Project filtering
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectItems = document.querySelectorAll('.project-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const filterValue = button.getAttribute('data-filter');
                    
                    projectItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
            
            // Skills animation
            const skillBars = document.querySelectorAll('.skill-bar span');
            function animateSkills() {
                skillBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    bar.style.width = targetWidth;
                });
            }
            
            // Stats counter animation
            const statsNumbers = document.querySelectorAll('.stats-number');
            function animateStats() {
                statsNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50; // Adjust for animation speed
                    
                    const updateCount = () => {
                        if (current < target) {
                            current += increment;
                            stat.textContent = Math.ceil(current);
                            setTimeout(updateCount, 20);
                        } else {
                            stat.textContent = target;
                        }
                    };
                    
                    updateCount();
                });
            }
            
            // Contact form submission
            const contactForm = document.getElementById('contact-form');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // In a real application, you would handle form submission to a server here
                alert('Thank you! Your message has been sent.');
                contactForm.reset();
            });
            
            // Theme toggle functionality
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = themeToggle.querySelector('i');
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                
                if (document.body.classList.contains('dark-theme')) {
                    themeIcon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    themeIcon.classList.replace('fa-sun', 'fa-moon');
                }
            });
            
            // Intersection Observer for animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === 'skills') {
                            animateSkills();
                        }
                        if (entry.target.id === 'about') {
                            animateStats();
                        }
                    }
                });
            }, { threshold: 0.2 });
            
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });
        });