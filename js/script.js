// Carrousel accessible avec navigation clavier et pause/play
class AccessibleCarousel {
    constructor() {
        this.carousel = document.querySelector('.carousel');
        this.container = document.querySelector('.carousel-container');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.prevBtn = document.getElementById('carousel-prev-btn');
        this.nextBtn = document.getElementById('carousel-next-btn');
        this.pauseBtn = document.getElementById('carousel-pause-btn');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAutoPlay = true;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000;

        this.init();
    }

    init() {
        if (!this.carousel) return;

        this.prevBtn.addEventListener('click', () => this.previousSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        this.pauseBtn.addEventListener('click', () => this.toggleAutoPlay());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.carousel.addEventListener('keydown', (e) => this.handleKeyboard(e));

        this.prevBtn.focus();

        this.startAutoPlay();

        // Pause au survol ou au focus
        this.carousel.addEventListener('mouseenter', () => {
            if (this.isAutoPlay) {
                this.pauseAutoPlay();
            }
        });

        this.carousel.addEventListener('mouseleave', () => {
            if (this.isAutoPlay) {
                this.startAutoPlay();
            }
        });

        this.updateSlide();
    }

    // Naviguer à une diapositive spécifique
    goToSlide(index) {
        this.currentSlide = (index + this.totalSlides) % this.totalSlides;
        this.updateSlide();

        this.announceSlideChange();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
        this.announceSlideChange();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
        this.announceSlideChange();
    }

    // Mettre à jour l'affichage du carrousel
    updateSlide() {
        this.slides.forEach(slide => {
            slide.style.display = 'none';
            slide.setAttribute('aria-hidden', 'true');
        });

        this.slides[this.currentSlide].style.display = 'block';
        this.slides[this.currentSlide].setAttribute('aria-hidden', 'false');

        this.indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.setAttribute('aria-current', 'false');
            }
        });
    }

    // Basculer la lecture automatique
    toggleAutoPlay() {
        this.isAutoPlay = !this.isAutoPlay;

        if (this.isAutoPlay) {
            this.pauseBtn.setAttribute('aria-pressed', 'false');
            this.pauseBtn.textContent = '⏸ Pause';
            this.pauseBtn.title = 'Mettre en pause le carrousel automatique';
            this.startAutoPlay();
        } else {
            this.pauseBtn.setAttribute('aria-pressed', 'true');
            this.pauseBtn.textContent = '▶ Lecture';
            this.pauseBtn.title = 'Reprendre la lecture automatique du carrousel';
            this.pauseAutoPlay();
        }
    }

    startAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Gérer les touches clavier (flèches, espace, entrée)
    handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
            case 'Enter':
                if (e.target === this.pauseBtn) break;
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            default:
                break;
        }
    }

    // Annoncer le changement aux lecteurs d'écran
    announceSlideChange() {
        const announcement = `Diapositive ${this.currentSlide + 1} sur ${this.totalSlides}`;
        const liveRegion = this.carousel.getAttribute('aria-live');
        if (liveRegion) {
            const ariaLive = document.createElement('div');
            ariaLive.setAttribute('role', 'status');
            ariaLive.setAttribute('aria-live', 'polite');
            ariaLive.textContent = announcement;
            ariaLive.style.position = 'absolute';
            ariaLive.style.left = '-10000px';
            document.body.appendChild(ariaLive);
            setTimeout(() => ariaLive.remove(), 1000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AccessibleCarousel();

    const video = document.getElementById('campaign-video');
    if (video) {
        console.log('Vidéo accessible initialisée');
    }
});
