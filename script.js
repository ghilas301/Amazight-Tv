document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration des données (Ajoutez vos vrais liens Mega ici) ---
    const videoData = {
        'video-pucci1': { title: 'Pucci 1', link: 'https://mega.nz/file/xIdjBbbL#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc' },
        'video-pucci6': { title: 'Pucci 3', link: 'https://mega.nz/file/your-other-mega-link#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc' }
        // Ajoutez ici d'autres films Mega sous un nom unique
    };

    // --- Variables de Détection (Noms neutres) ---
    const dataValidator = document.getElementById('data-check-box'); 
    const modalAccessDenied = document.getElementById('modal-access-denied'); 
    let isAdBlockedDetected = false;

    // --- FONCTION DE DÉTECTION ADBLOCK AVANCÉE ---
    function checkAdBlockAdvanced() {
        if (isAdBlockedDetected) return true; 

        let isBlocked = false;
        
        // TEST 1: Leurre visuel. Si l'élément est masqué par le CSS/JS d'AdBlock.
        if (dataValidator && (dataValidator.offsetHeight === 0 || dataValidator.style.display === 'none')) {
            isBlocked = true;
        }

        // TEST 2: Leurre de Script (méthode Vercel Rewrite)
        // Tentative de chargement du script via le chemin Vercel neutre.
        if (!isBlocked) { 
            const testScript = document.createElement('script');
            
            testScript.onerror = () => {
                 // Bloqué (AdBlock actif)
                 isAdBlockedDetected = true;
                 // Ouvrir la modale AdBlock
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

        // Stop la lecture vidéo pour le meilleur UX (comme YouTube)
        const videoPlayer = modalElement.querySelector('iframe, video');
        if (videoPlayer) {
            if (videoPlayer.tagName === 'IFRAME') {
                // Stop YouTube en réinitialisant la source
                const src = videoPlayer.src.split('?')[0];
                videoPlayer.src = src;
            } else if (videoPlayer.tagName === 'VIDEO') {
                // Stop Drive video
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        }

        setTimeout(() => modalElement.style.display = 'none', 300);
    }

    // --- Logique Mega (Redirection par bouton) ---

    const modalMega = document.getElementById('modal-mega');
    const videoTitlePlaceholder = document.getElementById('video-title-placeholder');
    const megaRedirectButton = document.getElementById('mega-redirect-button');
    let currentMegaLink = '';

    function setupMegaModal(videoId) {
        // VÉRIFICATION ADBLOCK AVANT OUVERTURE
        if (checkAdBlockAdvanced()) {
            return;
        }
        
        const data = videoData[videoId];
        if (!data) return;

        currentMegaLink = data.link;
        videoTitlePlaceholder.textContent = data.title;

        megaRedirectButton.onclick = () => {
            window.open(currentMegaLink, '_blank'); // Ouvrir dans un nouvel onglet pour que l'utilisateur puisse revenir
            closeModal(modalMega); 
        };

        openModal(modalMega);
    }

    // --- Gestion des Clics sur les Films ---

    const filmCards = document.querySelectorAll('.film-card');
    const heroButton = document.querySelector('.hero-play-button');

    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            const videoId = e.currentTarget.dataset.videoId;
            if (videoId) setupMegaModal(videoId);
        });
    }

    filmCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // VÉRIFICATION ADBLOCK AVANT OUVERTURE
            if (checkAdBlockAdvanced()) {
                return; 
            }

            const videoType = card.dataset.videoType;
            const videoId = card.dataset.videoId;

            if (!videoType || !videoId) return;

            switch (videoType) {
                case 'mega':
                    setupMegaModal(videoId);
                    break;

                case 'youtube':
                    const modalYT = document.getElementById(`modal-youtube-${videoId}`);
                    if (modalYT) {
                        openModal(modalYT);
                        const iframe = modalYT.querySelector('iframe');
                        // Lancer l'autoplay 
                        if (iframe.src.indexOf('autoplay=0') > -1) {
                            iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1');
                        }
                    }
                    break;

                case 'drive':
                    const modalDrive = document.getElementById(`modal-drive-${videoId}`);
                    if (modalDrive) {
                        openModal(modalDrive);
                        const video = modalDrive.querySelector('video');
                        video.play().catch(error => console.log("La lecture auto a été bloquée par le navigateur.", error));
                    }
                    break;
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
    
    // Lancer la vérification initiale après un petit délai pour le chargement du DOM
    setTimeout(checkAdBlockAdvanced, 500);

});