// Мобильное меню
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        mobileMenuBtn.textContent = '✕';
    } else {
        mobileMenuBtn.textContent = '☰';
    }
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    }
});

// Видео контролы
document.querySelectorAll('.review-video').forEach(video => {
    video.addEventListener('play', function() {
        this.setAttribute('playing', '');
        const overlay = this.parentElement.querySelector('.video-play-overlay');
        if (overlay) overlay.style.display = 'none';
    });
    
    video.addEventListener('pause', function() {
        this.removeAttribute('playing');
        const overlay = this.parentElement.querySelector('.video-play-overlay');
        if (overlay) overlay.style.display = 'block';
    });
});

// ==================== SLIDER ДЛЯ МОБИЛЬНЫХ ==================== 
function initReviewsSlider() {
    const reviewsGrid = document.querySelector('.reviews-grid');
    const reviewCards = document.querySelectorAll('.review-card');
    
    // Проверяем ширину экрана
    if (window.innerWidth > 768) {
        return; // Слайдер не нужен на больших экранах
    }
    
    // Создаём контейнер для кнопок управления
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'slider-controls';
    controlsContainer.innerHTML = `
        <button class="slider-btn" id="prevBtn">‹</button>
        <button class="slider-btn" id="nextBtn">›</button>
    `;
    
    // Создаём индикаторы
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'slider-dots';
    
    reviewCards.forEach((card, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    // Добавляем контролы после reviews-grid
    reviewsGrid.parentElement.appendChild(controlsContainer);
    reviewsGrid.parentElement.appendChild(dotsContainer);
    
    // Получаем кнопки
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.slider-dot');
    
    let currentSlide = 0;
    
    // Функция прокрутки к слайду
    function scrollToSlide(index) {
        const cardWidth = reviewCards[0].offsetWidth;
        const gap = 20; // gap между карточками
        const scrollPosition = (cardWidth + gap) * index;
        
        reviewsGrid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        currentSlide = index;
        updateDots();
    }
    
    // Обновление индикаторов
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % reviewCards.length;
        scrollToSlide(currentSlide);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + reviewCards.length) % reviewCards.length;
        scrollToSlide(currentSlide);
    }
    
    // События для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Определяем текущий слайд при прокрутке
    let scrollTimeout;
    reviewsGrid.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollLeft = reviewsGrid.scrollLeft;
            const cardWidth = reviewCards[0].offsetWidth;
            const gap = 20;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            
            if (newIndex !== currentSlide) {
                currentSlide = newIndex;
                updateDots();
            }
        }, 100);
    });
    
    // Свайп для тачскринов
    let touchStartX = 0;
    let touchEndX = 0;
    
    reviewsGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    reviewsGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Свайп влево
            } else {
                prevSlide(); // Свайп вправо
            }
        }
    }
}

// Инициализация слайдера при загрузке и изменении размера окна
window.addEventListener('load', initReviewsSlider);
window.addEventListener('resize', () => {
    // Удаляем старые контролы при изменении размера
    document.querySelectorAll('.slider-controls, .slider-dots').forEach(el => el.remove());
    initReviewsSlider();
});