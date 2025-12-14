
function toggleDetails(detailsId, button) {            
    const details = document.getElementById(detailsId);
            
            if (details.classList.contains('active')) {
                details.classList.remove('active');
                button.textContent = 'Подробнее';
            } else {
                details.classList.add('active');
                button.textContent = 'Скрыть';
                
                setTimeout(() => {
                    details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
    }