// BharatOne Spaces - Main JavaScript
// Handles navigation, forms, and interactive elements

// ===================================
// Mobile Navigation Toggle
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animate hamburger icon
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
});

// ===================================
// Header Scroll Effect
// ===================================
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===================================
// Form Submission to WhatsApp
// ===================================
function submitToWhatsApp(formId) {
    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        let message = '🏢 *New Enquiry from BharatOne Spaces Website*\n\n';

        // Build message from form fields
        for (let [key, value] of formData.entries()) {
            if (value) {
                // Format field name (capitalize first letter, replace underscores with spaces)
                const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
                message += `*${fieldName}:* ${value}\n`;
            }
        }

        // Add timestamp
        message += `\n_Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}_`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // WhatsApp number (8899661111)
        const whatsappNumber = '918899661111';

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, '_blank');

        // Optional: Reset form after submission
        form.reset();

        // Show success message
        alert('Thank you! Your enquiry has been prepared. Please click "Send" in WhatsApp to complete your submission.');
    });
}

// Initialize all enquiry forms
document.addEventListener('DOMContentLoaded', function () {
    // List of form IDs to initialize
    const formIds = [
        'enquiry-form',
        'contact-form',
        'broker-form',
        'property-enquiry-form'
    ];

    formIds.forEach(formId => {
        submitToWhatsApp(formId);
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.addEventListener('DOMContentLoaded', function () {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===================================
// Fade In Animation on Scroll
// ===================================
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', fadeInOnScroll);

// ===================================
// Active Navigation Link
// ===================================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// ===================================
// Gallery Lightbox (Simple)
// ===================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (img) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        `;

                const lightboxImg = document.createElement('img');
                lightboxImg.src = img.src;
                lightboxImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;

                lightbox.appendChild(lightboxImg);
                document.body.appendChild(lightbox);

                // Close on click
                lightbox.addEventListener('click', function () {
                    document.body.removeChild(lightbox);
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', initGallery);

// ===================================
// Testimonials Carousel (Simple Auto-rotate)
// ===================================
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const testimonials = carousel.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;

    // Hide all except first
    testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
            testimonial.style.display = 'none';
        }
    });

    // Auto-rotate every 5 seconds
    setInterval(() => {
        testimonials[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].style.display = 'block';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', initTestimonialCarousel);

// ===================================
// Email Fallback Function
// ===================================
function sendEmailFallback(formData) {
    let subject = 'New Enquiry from BharatOne Spaces Website';
    let body = 'New enquiry details:\n\n';

    for (let [key, value] of formData.entries()) {
        if (value) {
            const fieldName = key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
            body += `${fieldName}: ${value}\n`;
        }
    }

    body += `\nSubmitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`;

    const mailtoLink = `mailto:bharatonespaces@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// ===================================
// Call Button Function
// ===================================
function initCallButtons() {
    const callButtons = document.querySelectorAll('.btn-call');

    callButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.href = 'tel:+918898881222';
        });
    });
}

document.addEventListener('DOMContentLoaded', initCallButtons);

// ===================================
// Utility: Format Phone Number
// ===================================
function formatPhoneNumber(input) {
    // Remove all non-numeric characters
    let phone = input.value.replace(/\D/g, '');

    // Limit to 10 digits
    if (phone.length > 10) {
        phone = phone.substring(0, 10);
    }

    input.value = phone;
}

// Add phone formatting to all phone inputs
document.addEventListener('DOMContentLoaded', function () {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function () {
            formatPhoneNumber(this);
        });
    });
});

