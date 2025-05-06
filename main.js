// Main JavaScript for Allibiya Gases Website

// Dark Mode Toggle
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '🌙';
themeToggle.setAttribute('aria-label', 'Toggle dark mode');
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
}

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add additional animation classes based on data attributes
            if (entry.target.dataset.animate === 'float') {
                entry.target.classList.add('animate-float');
            } else if (entry.target.dataset.animate === 'pulse') {
                entry.target.classList.add('animate-pulse');
            } else if (entry.target.dataset.animate === 'slide-left') {
                entry.target.classList.add('animate-slide-left');
            } else if (entry.target.dataset.animate === 'slide-right') {
                entry.target.classList.add('animate-slide-right');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Interactive Map
const mapContainers = document.querySelectorAll('.map-container');
mapContainers.forEach(container => {
    container.addEventListener('click', () => {
        const location = container.dataset.location;
        if (location) {
            window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
        }
    });
});

// Enhanced Form Validation
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-red-500');
                
                // Add error message if it doesn't exist
                let errorMessage = field.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('error-message')) {
                    errorMessage = document.createElement('p');
                    errorMessage.classList.add('error-message', 'text-red-500', 'text-sm', 'mt-1');
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }
                errorMessage.textContent = 'This field is required';
            } else {
                field.classList.remove('border-red-500');
                const errorMessage = field.nextElementSibling;
                if (errorMessage && errorMessage.classList.contains('error-message')) {
                    errorMessage.remove();
                }
            }
        });
        
        if (isValid) {
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.classList.add('bg-green-600');
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-600');
                }, 3000);
            }, 1500);
        }
    });
});

// Image Lazy Loading with Animation
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('animate-fade-in');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Back to Top Button with Animation
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300';
backToTopButton.style.display = 'none';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
        setTimeout(() => backToTopButton.style.opacity = '1', 100);
    } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => backToTopButton.style.display = 'none', 300);
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Product Filter with Animation
const filterButtons = document.querySelectorAll('[data-filter]');
const productItems = document.querySelectorAll('[data-category]');

if (filterButtons.length && productItems.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            
            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('bg-blue-600', 'text-white'));
            button.classList.add('bg-blue-600', 'text-white');
            
            // Filter products with animation
            productItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.classList.add('animate-fade-in');
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.classList.remove('animate-fade-in');
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });
}

// News Slider with Enhanced Animations
const newsSlider = document.querySelector('.news-slider');
if (newsSlider) {
    let currentSlide = 0;
    const slides = newsSlider.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - index)}%)`;
            if (i === index) {
                slide.classList.add('animate-fade-in');
            } else {
                slide.classList.remove('animate-fade-in');
            }
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Add navigation buttons with hover effects
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '←';
    prevButton.className = 'absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300';
    prevButton.onclick = prevSlide;
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '→';
    nextButton.className = 'absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300';
    nextButton.onclick = nextSlide;
    
    newsSlider.appendChild(prevButton);
    newsSlider.appendChild(nextButton);
    
    // Initialize first slide
    showSlide(0);
}

// Banner Slider
const bannerSlider = document.querySelector('.banner-slider');
if (bannerSlider) {
    const slides = bannerSlider.querySelector('.banner-slides');
    const slideItems = bannerSlider.querySelectorAll('.banner-slide');
    const prevBtn = bannerSlider.querySelector('.banner-prev');
    const nextBtn = bannerSlider.querySelector('.banner-next');
    const indicators = bannerSlider.querySelectorAll('.banner-indicator');
    
    let currentSlide = 0;
    const slideCount = slideItems.length;
    let slideInterval;
    
    // Function to update slide position
    const updateSlide = () => {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('bg-white', index === currentSlide);
            indicator.classList.toggle('bg-white/50', index !== currentSlide);
        });
    };
    
    // Function to go to next slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlide();
    };
    
    // Function to go to previous slide
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlide();
    };
    
    // Start auto-sliding
    const startAutoSlide = () => {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    };
    
    // Stop auto-sliding
    const stopAutoSlide = () => {
        clearInterval(slideInterval);
    };
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Pause auto-sliding when hovering over the banner
    bannerSlider.addEventListener('mouseenter', stopAutoSlide);
    bannerSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Start auto-sliding initially
    startAutoSlide();
    
    // Update initial indicator state
    updateSlide();
}

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
} 