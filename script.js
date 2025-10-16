document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration des données vidéo ---
    const videoData = {
        'video-pucci1': { 
            title: 'Pucci 1', 
            link: 'https://mega.nz/embed/xIdjBbbL#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc',
            type: 'mega'
        },
        'video-pucci6': { 
            title: 'Pucci 3', 
            link: 'https://mega.nz/embed/your-other-mega-link#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc',
            type: 'mega'
        },
        'video-qezbul1': { 
            title: 'Qezbul 1', 
            link: 'https://dsvplay.com/e/za8jrxvpw6rq',
            type: 'dood'
        },

        'video-narnia1': { 
            title: 'Narnia 1', 
            link: 'https://dsvplay.com/e/11961y4m8yua',
            type: 'dood'
        },

        'video-youtube-1': { 
            title: 'Pucci 2', 
            link: 'https://www.youtube.com/embed/YKNneNOhosY',
            type: 'youtube'
        },
        'video-youtube-3': { 
            title: 'Pucci 5', 
            link: 'https://www.youtube.com/watch?v=bHIDRBJQmjE&t=2s',
            type: 'youtube'
        },
        'video-drive-2': { 
            title: 'Pucci 4', 
            link: 'https://dsvplay.com/e/ncwnm3u4qofq',
            type: 'dood'
        }
    };

    // --- Variables de Détection ---
    const dataValidator = document.getElementById('data-check-box');
    const modalAccessDenied = document.getElementById('modal-access-denied');
    let isAdBlockedDetected = false;

    // --- Variables du Lecteur Universel ---
    const genericModal = document.getElementById('generic-video-modal');
    const videoIframe = document.getElementById('video-iframe');
    const videoContainer = document.getElementById('video-container');
    const videoLoading = document.getElementById('video-loading');

    // --- Navigation au clavier ---
    let currentVideoIndex = 0;
    const filmCards = Array.from(document.querySelectorAll('.film-card'));

    // --- FONCTION DE DÉTECTION ADBLOCK AMÉLIORÉE ---
    function checkAdBlockAdvanced() {
        if (isAdBlockedDetected) return true;

        let isBlocked = false;
        
        // TEST 1: Leurre visuel
        if (dataValidator && (dataValidator.offsetHeight === 0 || dataValidator.style.display === 'none')) {
            console.log('AdBlock détecté: élément leurre caché');
            isBlocked = true;
        }

        // TEST 2: Vérification de requêtes bloquées
        if (!isBlocked) {
            fetch('/assets/script-data-check.js', { 
                method: 'HEAD',
                mode: 'no-cors'
            }).catch(() => {
                console.log('AdBlock détecté: requête bloquée');
                isBlocked = true;
            });
        }
        
        if (isBlocked) {
            isAdBlockedDetected = true;
            openModal(modalAccessDenied);
        }

        return isAdBlockedDetected;
    }

    // --- Fonctions génériques de Modale ---
    function openModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('is-open'), 10);
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('is-open');
        
        if (modalElement === genericModal) {
            videoIframe.src = '';
            videoContainer.style.display = 'none';
            videoLoading.style.display = 'flex';
        }

        setTimeout(() => {
            modalElement.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // --- Gestion d'erreurs vidéo ---
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="this.parentElement.remove()" class="cta-button">Fermer</button>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-card-bg);
            padding: 30px;
            border-radius: 10px;
            text-align: center;
            z-index: 1000;
            border: 2px solid var(--color-primary);
        `;
        document.body.appendChild(errorDiv);
    }

    // --- LOGIQUE UNIFIÉE POUR OUVRIR LE LECTEUR VIDÉO ---
    function setupGenericVideoModal(videoId) {
        // 1. VÉRIFICATION ADBLOCK (avec délai augmenté)
        if (checkAdBlockAdvanced()) {
            return;
        }
        
        const data = videoData[videoId];
        if (!data) {
            showErrorMessage('Vidéo non disponible pour le moment.');
            return;
        }

        // 2. Mettre à jour l'index courant pour navigation clavier
        currentVideoIndex = filmCards.findIndex(card => card.dataset.videoId === videoId);

        // 3. Préparer et lancer la vidéo avec état de chargement
        videoLoading.style.display = 'flex';
        videoContainer.style.display = 'none';
        
        let videoLink = data.link;

        

if (data.type === 'youtube') {
    videoLink += (videoLink.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
} else if (data.type === 'dood') {
    // DoodStream / DSVPlay : on met juste le lien embed
    videoLink = data.link;
} else {
    // Mega / Drive
    videoLink = data.link;
}

   // 4. Charger l'embed
videoIframe.src = videoLink;

// Réinitialise tout style inline sur l'iframe (on laisse le CSS faire le travail)
videoIframe.removeAttribute('style');

// Assure que l'iframe occupe correctement le conteneur responsive
// (le conteneur .video-responsive-container contrôle le ratio via CSS)
videoIframe.style.position = 'absolute';
videoIframe.style.top = '0';
videoIframe.style.left = '0';
videoIframe.style.width = '100%';
videoIframe.style.height = '100%';
videoIframe.style.border = 'none';
videoIframe.style.background = 'black';
videoIframe.style.display = 'block';
videoIframe.style.borderRadius = ''; // laisse le CSS décider

// Pour YouTube : demande autoplay proprement (on avait déjà ajouté, garde au cas où)
if (data.type === 'youtube' && !videoLink.includes('autoplay')) {
    videoIframe.src += (videoIframe.src.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
}

// Ouvre la modale
openModal(genericModal);

// Affichage loader -> container quand l'iframe est ready
let loadHandled = false;
videoIframe.onload = () => {
    if (loadHandled) return;
    loadHandled = true;
    videoLoading.style.display = 'none';
    videoContainer.style.display = 'block';
};

// Fallback : si onload ne se déclenche pas (certains embeds sur mobile), on force l'affichage proprement après 1.6s
setTimeout(() => {
    if (!loadHandled) {
        loadHandled = true;
        videoLoading.style.display = 'none';
        videoContainer.style.display = 'block';
    }
}, 1600);

// En cas d'erreur de chargement
videoIframe.onerror = () => {
    videoLoading.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <p>Erreur de chargement de la vidéo</p>
        <button onclick="closeModal(genericModal)" class="cta-button">Fermer</button>
    `;
};


        // 5. Masquer le loading quand la vidéo est prête
        videoIframe.onload = () => {
            setTimeout(() => {
                videoLoading.style.display = 'none';
                videoContainer.style.display = 'block';
            }, 1000);
        };

        // 6. Gestion d'erreur
        videoIframe.onerror = () => {
            videoLoading.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erreur de chargement de la vidéo</p>
                <button onclick="closeModal(genericModal)" class="cta-button">Fermer</button>
            `;
        };
    }

    // --- Navigation au clavier ---
    function navigateVideos(direction) {
        if (!genericModal.classList.contains('is-open')) return;
        
        currentVideoIndex += direction;
        
        if (currentVideoIndex < 0) {
            currentVideoIndex = filmCards.length - 1;
        } else if (currentVideoIndex >= filmCards.length) {
            currentVideoIndex = 0;
        }
        
        const nextVideoId = filmCards[currentVideoIndex].dataset.videoId;
        setupGenericVideoModal(nextVideoId);
    }

    // --- Gestion des Clics sur les Films ---
    const heroButton = document.querySelector('.hero-play-button');

    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            const videoId = e.currentTarget.dataset.videoId;
            if (videoId) setupGenericVideoModal(videoId);
        });
    }

    filmCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const videoId = card.dataset.videoId;
            if (videoId) {
                currentVideoIndex = index;
                setupGenericVideoModal(videoId);
            }
        });

        // Accessibilité: navigation clavier sur les cartes
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const videoId = card.dataset.videoId;
                if (videoId) setupGenericVideoModal(videoId);
            }
        });
    });

    // --- Gestion de la Fermeture des Modales ---
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.currentTarget.closest('.modal');
            if (modal.id === 'modal-access-denied') return;
            closeModal(modal);
        });
    });

    window.addEventListener('click', e => {
        const modal = e.target;
        if (modal.classList.contains('modal') && modal.id !== 'modal-access-denied') {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.is-open');
            if (openModalElement && openModalElement.id !== 'modal-access-denied') {
                closeModal(openModalElement);
            }
        }
        
        // Navigation vidéo avec flèches
        if (genericModal.classList.contains('is-open')) {
            if (e.key === 'ArrowLeft') {
                navigateVideos(-1);
            } else if (e.key === 'ArrowRight') {
                navigateVideos(1);
            }
        }
    });

    // --- Navigation active ---
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navigation a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('nav-active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    
    // Lancer la vérification initiale après un délai raisonnable
    setTimeout(checkAdBlockAdvanced, 2000);
});