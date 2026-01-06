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

    // Validation du formulaire de contact
    new FormValidator();
});

// Classe de validation du formulaire
class FormValidator {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.successModal = document.getElementById('successModal');

        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Bouton de fermeture modale
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalClose = document.querySelector('.modal-close');

        if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => this.closeSuccessModal());
        if (modalClose) modalClose.addEventListener('click', () => this.closeSuccessModal());

        // Gestion de l'affichage de la textarea "Autre campagne"
        this.setupAutreCampagneToggle();

        // Validation en temps réel pour nom et prénom
        this.setupRealTimeValidation();
    }

    setupAutreCampagneToggle() {
        const radioInputs = this.form.querySelectorAll('input[name="campagne"]');
        const autreCampagneGroup = document.getElementById('autre-campagne-group');

        radioInputs.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'autre' && radio.checked) {
                    autreCampagneGroup.hidden = false;
                } else {
                    autreCampagneGroup.hidden = true;
                }
            });
        });
    }

    setupRealTimeValidation() {
        const nomInput = this.form.querySelector('#nom');
        const prenomInput = this.form.querySelector('#prenom');
        const dateNaissanceInput = this.form.querySelector('#dateNaissance');

        if (nomInput) {
            nomInput.addEventListener('blur', () => this.validateNomField(nomInput));
            nomInput.addEventListener('input', () => this.validateNomField(nomInput));
        }

        if (prenomInput) {
            prenomInput.addEventListener('blur', () => this.validatePrenomField(prenomInput));
            prenomInput.addEventListener('input', () => this.validatePrenomField(prenomInput));
        }

        if (dateNaissanceInput) {
            dateNaissanceInput.addEventListener('blur', () => this.validateDateNaissanceField(dateNaissanceInput));
            dateNaissanceInput.addEventListener('change', () => this.validateDateNaissanceField(dateNaissanceInput));
        }
    }

    validateNomField(field) {
        const isValid = this.isValidName(field.value);
        this.updateFieldStyle(field, isValid, 'Lettres, accents, tirets et espaces uniquement. Pas de chiffres.');
    }

    validatePrenomField(field) {
        const isValid = this.isValidName(field.value);
        this.updateFieldStyle(field, isValid, 'Lettres, accents, tirets et espaces uniquement. Pas de chiffres.');
    }

    validateDateNaissanceField(field) {
        const isValid = this.isValidBirthDate(field.value);
        const errorMessage = 'La date de naissance doit être entre 1900 et 2025.';
        this.updateFieldStyle(field, isValid, errorMessage);
    }

    isValidName(value) {
        // Accepte : lettres (avec accents), tirets, espaces, apostrophes
        // Refuse : chiffres et caractères spéciaux
        const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{2,}$/;
        return nameRegex.test(value.trim());
    }

    isValidBirthDate(value) {
        if (!value) return false;
        
        const birthDate = new Date(value);
        const currentDate = new Date();
        
        // Vérifier que la date est valide
        if (isNaN(birthDate.getTime())) {
            return false;
        }
        
        const birthYear = birthDate.getFullYear();
        const currentYear = currentDate.getFullYear();
        
        // La personne ne peut pas être née avant 1900 ni après 2025
        if (birthYear < 1900 || birthYear > 2025) {
            return false;
        }
        
        // La date ne peut pas être dans le futur
        if (birthDate > currentDate) {
            return false;
        }
        
        return true;
    }

    updateFieldStyle(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        if (!formGroup) return;

        let errorElement = formGroup.querySelector('.error-message');

        if (!isValid && field.value.trim().length > 0) {
            if (!errorElement) {
                errorElement = document.createElement('span');
                errorElement.className = 'error-message';
                errorElement.setAttribute('role', 'alert');
                formGroup.appendChild(errorElement);
            }
            errorElement.textContent = errorMessage;
            field.classList.add('error');
            formGroup.classList.add('has-error');
        } else {
            if (errorElement) errorElement.remove();
            field.classList.remove('error');
            formGroup.classList.remove('has-error');
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        // Valider les champs requis avec HTML5
        if (!this.form.checkValidity()) {
            this.form.reportValidity();
            return;
        }

        // Valider strictement nom et prénom
        const nomInput = this.form.querySelector('#nom');
        const prenomInput = this.form.querySelector('#prenom');
        const dateNaissanceInput = this.form.querySelector('#dateNaissance');

        if (!this.isValidName(nomInput.value)) {
            this.validateNomField(nomInput);
            nomInput.focus();
            return;
        }

        if (!this.isValidName(prenomInput.value)) {
            this.validatePrenomField(prenomInput);
            prenomInput.focus();
            return;
        }

        if (!this.isValidBirthDate(dateNaissanceInput.value)) {
            this.validateDateNaissanceField(dateNaissanceInput);
            dateNaissanceInput.focus();
            return;
        }

        // Afficher la modale de confirmation
        this.showConfirmationModal();
    }

    showConfirmationModal() {
        const nom = this.form.querySelector('#nom').value;
        const prenom = this.form.querySelector('#prenom').value;
        const email = this.form.querySelector('#email').value;
        const message = this.form.querySelector('#message').value;

        // Créer la modale de confirmation dynamiquement
        const confirmModal = document.createElement('div');
        confirmModal.className = 'modal';
        confirmModal.setAttribute('role', 'dialog');
        confirmModal.setAttribute('aria-modal', 'true');
        confirmModal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close" aria-label="Fermer">&times;</button>
                <h2 id="confirm-title">Confirmer votre message</h2>
                <p><strong>Récapitulatif :</strong></p>
                <ul style="text-align: left; line-height: 1.8;">
                    <li><strong>Nom :</strong> ${this.escapeHtml(nom)}</li>
                    <li><strong>Prénom :</strong> ${this.escapeHtml(prenom)}</li>
                    <li><strong>Email :</strong> ${this.escapeHtml(email)}</li>
                    <li><strong>Message :</strong> ${this.escapeHtml(message.substring(0, 100))}${message.length > 100 ? '...' : ''}</li>
                </ul>
                <p style="margin-top: 20px;">Êtes-vous sûr de vouloir envoyer ce message ?</p>
                <div class="modal-actions">
                    <button class="btn-secondary" id="cancel-btn">Annuler</button>
                    <button class="btn-primary" id="confirm-btn">Confirmer et envoyer</button>
                </div>
            </div>
        `;

        document.body.appendChild(confirmModal);

        const closeBtn = confirmModal.querySelector('.modal-close');
        const cancelBtn = confirmModal.querySelector('#cancel-btn');
        const confirmBtn = confirmModal.querySelector('#confirm-btn');

        const closeModal = () => {
            confirmModal.remove();
            const submitBtn = this.form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.focus();
        };

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        confirmBtn.addEventListener('click', () => {
            closeModal();
            this.submitForm();
        });

        // Focus sur le bouton annuler
        cancelBtn.focus();
    }

    submitForm() {
        // Récupérer les données du formulaire
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Log des données (en production, envoyer au serveur)
        console.log('Formulaire envoyé:', data);

        // Afficher la notification de succès
        this.showSuccessNotification();

        // Afficher la modale de remerciement
        this.showSuccessModal();

        // Réinitialiser le formulaire après 1 seconde
        setTimeout(() => {
            this.form.reset();
            this.clearFormErrors();
        }, 1000);
    }

    showSuccessNotification() {
        const notification = document.createElement('div');
        notification.className = 'notification success';
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        notification.textContent = '✓ Votre message a été validé avec succès !';

        document.body.appendChild(notification);

        // Supprimer la notification après 5 secondes
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showSuccessModal() {
        this.successModal.hidden = false;
        const closeBtn = this.successModal.querySelector('.modal-close') || document.getElementById('modal-close-btn');
        if (closeBtn) closeBtn.focus();
    }

    closeSuccessModal() {
        this.successModal.hidden = true;
        const submitBtn = this.form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.focus();
    }

    clearFormErrors() {
        const fieldsWithError = this.form.querySelectorAll('.error, .has-error');
        fieldsWithError.forEach(field => {
            field.classList.remove('error', 'has-error');
        });

        const errorMessages = this.form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}
