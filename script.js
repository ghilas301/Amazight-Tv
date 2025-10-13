document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration des données (UTILISEZ LES LIENS EMBED UNIQUEMENT) ---
    const videoData = {
        // Liens MEGA doivent être au format /embed/ pour lecture directe.
        'video-pucci1': { title: 'Pucci 1', link: 'https://mega.nz/embed/xIdjBbbL#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc' },
        'video-pucci6': { title: 'Pucci 3', link: 'https://mega.nz/embed/your-other-mega-link#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc' },
        'video-qezbul1': { title: 'Qezbul 1', link: 'https://mega.nz/embed/oZcT3IaZ#nM7WvZslzasQYnrdVr9mghwy-U_UExKRaMYZGpk_1SQ' },
        // Liens YOUTUBE doivent être au format /embed/
        'video-youtube-1': { title: 'Pucci 2', link: 'https://www.youtube.com/embed/YKNneNOhosY' },
        'video-youtube-3': { title: 'Pucci 5', link: 'https://www.youtube.com/embed/ANOTHER_YOUTUBE_ID' }, 
        // Liens GOOGLE DRIVE doivent être au format /preview pour lecture directe dans iframe.
        'video-drive-2': { title: 'Pucci 4', link: 'https://drive.google.com/file/d/15dQ0YPyBWqISkTQYZhcGQGyT9GB5EjMi/preview' }
    };

    // --- Variables de Détection ---
    const dataValidator = document.getElementById('data-check-box'); 
    const modalAccessDenied = document.getElementById('modal-access-denied'); 
    let isAdBlockedDetected = false;

    // --- Variables du Lecteur Universel ---
    const genericModal = document.getElementById('generic-video-modal');
    const videoIframe = document.getElementById('video-iframe');

    // --- FONCTION DE DÉTECTION ADBLOCK AVANCÉE ---
    function checkAdBlockAdvanced() {
        if (isAdBlockedDetected) return true; 

        let isBlocked = false;
        
        // TEST 1: Leurre visuel.
        if (dataValidator && (dataValidator.offsetHeight === 0 || dataValidator.style.display === 'none')) {
            isBlocked = true;
        }

        // TEST 2: Leurre de Script (méthode Vercel Rewrite)
        if (!isBlocked) { 
            const testScript = document.createElement('script');
            
            testScript.onerror = () => {
                 isAdBlockedDetected = true;
                 openModal(modalAccessDenied);
            };
            
            // Le chemin cible qui sera réécrit par vercel.json
            testScript.src = '/assets/script-data-check.js'; 
            document.body.appendChild(testScript);
        }
        
        if (isBlocked) {
            isAdBlockedDetected = true;
            openModal(modalAccessDenied);
        }

        return isAdBlockedDetected;
    }
    
    // --- Fonctions génériques de Modale ---

    /** Ouvre une modale avec transition */
    function openModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('is-open'), 10);
    }

    /** Ferme une modale et arrête la vidéo si nécessaire */
    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('is-open');

        // Arrête la lecture vidéo si c'est le lecteur générique
        if (modalElement === genericModal) {
            videoIframe.src = ''; 
        }

        setTimeout(() => modalElement.style.display = 'none', 300);
    }

    // --- LOGIQUE UNIFIÉE POUR OUVRIR LE LECTEUR VIDÉO ---

    function setupGenericVideoModal(videoId) {
        // 1. VÉRIFICATION ADBLOCK
        if (checkAdBlockAdvanced()) {
            return;
        }
        
        const data = videoData[videoId];
        if (!data) return;

        // Note: La monétisation (Pop-Under) est déclenchée par le script inséré dans index.html au moment du clic.
        
        // 2. Préparer et lancer la vidéo
        let videoLink = data.link;

        if (videoLink.includes('youtube.com')) {
            // Pour YouTube: ajoute l'autoplay
            videoLink += (videoLink.includes('?') ? '&' : '?') + 'autoplay=1';
        }
        
        // Charger l'embed et ouvrir la modale
        videoIframe.src = videoLink;
        openModal(genericModal);
    }


    // --- Gestion des Clics sur les Films ---

    const filmCards = document.querySelectorAll('.film-card');
    const heroButton = document.querySelector('.hero-play-button');

    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            const videoId = e.currentTarget.dataset.videoId;
            if (videoId) setupGenericVideoModal(videoId);
        });
    }

    filmCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const videoId = card.dataset.videoId;
            if (videoId) {
                setupGenericVideoModal(videoId);
            }
        });
    });

    // --- Gestion de la Fermeture des Modales ---

    // 1. Bouton de fermeture (X)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.currentTarget.closest('.modal');
            // Empêche la fermeture du mur Adblock par le bouton 'X'
            if (modal.id === 'modal-access-denied') return;
            
            closeModal(modal);
        });
    });

    // 2. Clic en dehors de la modale (sur le fond sombre)
    window.addEventListener('click', e => {
        const modal = e.target;
        // Empêche la fermeture du mur Adblock
        if (modal.classList.contains('modal') && modal.id !== 'modal-access-denied') {
            closeModal(modal);
        }
    });

    // 3. Touche Échap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.is-open');
            // Empêche la fermeture du mur Adblock
            if (openModalElement && openModalElement.id !== 'modal-access-denied') {
                closeModal(openModalElement);
            }
        }
    });
    
    // Lancer la vérification initiale après un petit délai
    setTimeout(checkAdBlockAdvanced, 500);

});