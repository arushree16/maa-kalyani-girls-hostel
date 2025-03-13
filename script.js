// JavaScript for interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize room sliders
    console.log('Initializing room sliders...');
    initializeRoomSliders();

    // Initialize hero slider
    console.log('Starting hero slider...');
    initializeHeroSlider();

    // Initialize gallery slider
    console.log('Setting up gallery slider...');
    initializeGallerySlider();

    // Initialize lightbox
    console.log('Setting up lightbox...');
    initializeLightbox();
});

// Room slider functions
function initializeRoomSliders() {
    const sliders = document.querySelectorAll('.room-image-slider');
    console.log('Found sliders:', sliders.length);
    
    sliders.forEach((slider, index) => {
        // Initialize dots
        const images = slider.querySelectorAll('.slider-images img');
        const dotsContainer = slider.querySelector('.slider-dots');
        console.log(`Slider ${index + 1} has ${images.length} images`);
        
        // Create dots for each image
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                console.log('Dot clicked:', index);
                updateSlide(slider, getCurrentIndex(slider), index);
            });
            dotsContainer.appendChild(dot);
        });

        // Add click events for buttons
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');

        prevBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex(slider);
            console.log('Prev clicked, current index:', currentIndex);
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            console.log('New index will be:', newIndex);
            updateSlide(slider, currentIndex, newIndex);
        });

        nextBtn.addEventListener('click', () => {
            const currentIndex = getCurrentIndex(slider);
            console.log('Next clicked, current index:', currentIndex);
            const newIndex = (currentIndex + 1) % images.length;
            console.log('New index will be:', newIndex);
            updateSlide(slider, currentIndex, newIndex);
        });

        // Auto-advance slides
        let slideInterval = setInterval(() => {
            const currentIndex = getCurrentIndex(slider);
            const newIndex = (currentIndex + 1) % images.length;
            updateSlide(slider, currentIndex, newIndex);
        }, 5000);

        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                const currentIndex = getCurrentIndex(slider);
                const newIndex = (currentIndex + 1) % images.length;
                updateSlide(slider, currentIndex, newIndex);
            }, 5000);
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', () => {
            const swipeDistance = touchEndX - touchStartX;
            const currentIndex = getCurrentIndex(slider);
            if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
                if (swipeDistance > 0) {
                    // Swipe right - show previous
                    const newIndex = (currentIndex - 1 + images.length) % images.length;
                    updateSlide(slider, currentIndex, newIndex);
                } else {
                    // Swipe left - show next
                    const newIndex = (currentIndex + 1) % images.length;
                    updateSlide(slider, currentIndex, newIndex);
                }
            }
        });
    });
}

function getCurrentIndex(slider) {
    const images = slider.querySelectorAll('.slider-images img');
    const currentIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    console.log('Current index:', currentIndex);
    return currentIndex;
}

function updateSlide(slider, currentIndex, newIndex) {
    console.log(`Updating slide from ${currentIndex} to ${newIndex}`);
    const images = slider.querySelectorAll('.slider-images img');
    const dots = slider.querySelectorAll('.dot');
    
    // Remove active class from current image and dot
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Add active class to new image and dot
    images[newIndex].classList.add('active');
    dots[newIndex].classList.add('active');
    
    console.log('Slide update complete');
}

// Hero Section Slider
let heroInterval = null;

function initializeHeroSlider() {
    const heroSlider = document.querySelector('.hero-slider');
    if (!heroSlider) {
        console.error('Hero slider not found');
        return;
    }

    const slides = heroSlider.querySelectorAll('.hero-slide');
    if (!slides.length) {
        console.error('No hero slides found');
        return;
    }

    let currentIndex = 0;

    function nextSlide() {
        // Remove active class from current slide
        slides[currentIndex].classList.remove('active');
        
        // Calculate next index
        currentIndex = (currentIndex + 1) % slides.length;
        
        // Add active class to next slide
        slides[currentIndex].classList.add('active');
        
        console.log('Updated to slide:', currentIndex + 1);
    }

    // Clear any existing interval
    if (heroInterval) {
        clearInterval(heroInterval);
    }

    // Start the slideshow
    heroInterval = setInterval(nextSlide, 5000);
    console.log('Hero slideshow started with', slides.length, 'slides');
}

// Gallery Slider
let galleryInterval = null;

function initializeGallerySlider() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (!gallerySlider) {
        console.error('Gallery slider not found');
        return;
    }

    const slides = gallerySlider.querySelectorAll('.gallery-slide');
    const dotsContainer = gallerySlider.querySelector('.gallery-dots');
    const counter = gallerySlider.querySelector('.gallery-counter span');
    const categoryLabel = gallerySlider.querySelector('.gallery-category');
    let currentIndex = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'gallery-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation buttons
    const prevBtn = gallerySlider.querySelector('.prev');
    const nextBtn = gallerySlider.querySelector('.next');

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateGallerySlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateGallerySlide();
        resetInterval();
    });

    function goToSlide(index) {
        currentIndex = index;
        updateGallerySlide();
        resetInterval();
    }

    function updateGallerySlide() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });

        // Update dots
        const dots = dotsContainer.querySelectorAll('.gallery-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update counter
        counter.textContent = (currentIndex + 1).toString();

        // Update category
        const currentSlide = slides[currentIndex];
        const category = currentSlide.getAttribute('data-category');
        categoryLabel.textContent = category;

        // Add animation class to category label
        categoryLabel.classList.remove('category-change');
        void categoryLabel.offsetWidth; // Trigger reflow
        categoryLabel.classList.add('category-change');
    }

    function autoAdvance() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateGallerySlide();
    }

    function resetInterval() {
        if (galleryInterval) {
            clearInterval(galleryInterval);
        }
        galleryInterval = setInterval(autoAdvance, 5000);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateGallerySlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % slides.length;
            updateGallerySlide();
            resetInterval();
        }
    });

    // Start automatic slideshow
    resetInterval();

    // Pause on hover
    gallerySlider.addEventListener('mouseenter', () => {
        if (galleryInterval) {
            clearInterval(galleryInterval);
        }
    });

    gallerySlider.addEventListener('mouseleave', resetInterval);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    gallerySlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    gallerySlider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    gallerySlider.addEventListener('touchend', () => {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                // Swipe right - show previous
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            } else {
                // Swipe left - show next
                currentIndex = (currentIndex + 1) % slides.length;
            }
            updateGallerySlide();
            resetInterval();
        }
    });

    console.log('Gallery slideshow initialized with', slides.length, 'slides');
}

// Lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay h3');
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption.textContent;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox
    function closeLightboxHandler() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxHandler();
        }
    });

    console.log('Lightbox initialized');
}
