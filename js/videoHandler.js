// Управление видео в отзывах
document.addEventListener('DOMContentLoaded', function() {
    const videoContainers = document.querySelectorAll('.review-video-container');
    
    videoContainers.forEach(container => {
        const video = container.querySelector('.review-video');
        const overlay = container.querySelector('.video-play-overlay');
        
        if (!video) return;
        
        // Добавляем стандартные контролы браузера
        video.setAttribute('controls', 'controls');
        
        // Скрываем overlay при воспроизведении
        video.addEventListener('play', function() {
            container.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            container.classList.remove('playing');
        });
        
        video.addEventListener('ended', function() {
            container.classList.remove('playing');
        });
    });
});