// Sticky header
window.onscroll = () => {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);
};

// Mobile menu toggle
document.querySelector("#menu-icon").onclick = () => {
  let navbar = document.querySelector(".navbar");
  navbar.classList.toggle("active");
};

// Close menu when clicking on a nav link
document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".navbar").classList.remove("active");
  });
});

// Create particles
const createParticles = () => {
  const container = document.querySelector(".particle-container");
  const colors = ["#917fb3", "#e5beec", "#fde2f3"];

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;

    // Random size
    const size = Math.random() * 5 + 1;

    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Random animation delay
    const delay = Math.random() * 5;

    // Random animation duration
    const duration = Math.random() * 5 + 5;

    // Apply styles
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;

    container.appendChild(particle);
  }
};

// Call createParticles when the DOM is loaded
document.addEventListener("DOMContentLoaded", createParticles);

// Typing animation for the subtitle
const textAnimate = document.querySelector(".text-animate h3");
const text = textAnimate.textContent;
textAnimate.textContent = "";

let charIndex = 0;
function typeText() {
  if (charIndex < text.length) {
    textAnimate.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(eraseText, 2000);
  }
}

function eraseText() {
  if (charIndex > 0) {
    textAnimate.textContent = text.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    setTimeout(typeText, 1000);
  }
}

// Start typing animation after a delay
setTimeout(typeText, 1500);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: "smooth"
      });
    }
  });
});

// Animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.3 }
);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Form validation
const contactForm = document.querySelector(".contact form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector("textarea");

    let isValid = true;

    if (!nameInput.value.trim()) {
      isValid = false;
      nameInput.style.boxShadow = "0 0 15px red";
    } else {
      nameInput.style.boxShadow = "0 0 15px var(--accent)";
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.style.boxShadow = "0 0 15px red";
    } else {
      emailInput.style.boxShadow = "0 0 15px var(--accent)";
    }

    if (!messageInput.value.trim()) {
      isValid = false;
      messageInput.style.boxShadow = "0 0 15px red";
    } else {
      messageInput.style.boxShadow = "0 0 15px var(--accent)";
    }

    if (isValid) {
      // If valid, you would normally send the form data to a server
      alert("Thank you for your message! I will get back to you soon.");
      this.reset();
    }
  });
}

// Email validation helper function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add CSS class for animations
document
  .querySelectorAll(".skills-box, .projects-box, .about-img, .about-text")
  .forEach((element) => {
    element.classList.add("animate-on-scroll");
  });

// Add this CSS to your existing styles
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.show, section.show .animate-on-scroll {
            opacity: 1;
            transform: translateY(0);
        }
        
        section {
            opacity: 0.8;
            transition: opacity 0.6s ease;
        }
        
        section.show {
            opacity: 1;
        }
    `;
  document.head.appendChild(style);
});
