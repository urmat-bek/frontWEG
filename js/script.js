const animated = document.querySelectorAll('.fade-in, .slide-up');
function revealOnScroll() {
animated.forEach(el => {
const rect = el.getBoundingClientRect().top;
if (rect < window.innerHeight - 100) {
el.classList.add('show');
}
});
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();