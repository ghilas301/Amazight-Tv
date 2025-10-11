document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration des données ---
    const videoData = {
        'video-pucci1': { title: 'Pucci 1', link: 'https://mega.nz/file/xIdjBbbL#t1BIaor6E9NsMRJIR4OQsI7AM3dNlLnwgg-lZ_2nqHc' }
        // Ajoutez ici d'autres films Mega
    };

    // --- Variables Adblock ---
    const adBait = document.getElementById('ad-bait');
    const modalAdBlock = document.getElementById('modal-adblock');
    
    // --- FONCTION DE DÉTECTION ADBLOCK ---
    function checkAdBlock() {
        // La détection repose sur le masquage de l'élément 'ad-bait' par le bloqueur.
        // Si l'élément n'a pas de hauteur, c'est qu'il est probablement bloqué.
        // On vérifie également l'élément de pub Adsterra déjà présent (s'il existe et est bloqué)
        const adsterraFrame = document.querySelector('[src*="highperformanceformat.com"]');
        
        let isAdBlocked = false;
        
        // 1. Vérification de l'élément 'appât'
        if (adBait && (adBait.offsetHeight === 0 || adBait.style.display === 'none')) {
            isAdBlocked = true;
        }

        // 2. Vérification d'un frame Adsterra connu (facultatif mais plus précis)
        // if (adsterraFrame && (adsterraFrame.offsetHeight === 0 || adsterraFrame.style.display === 'none')) {
        //     isAdBlocked = true;
        // }
        
        return isAdBlocked;
    }
    
    // --- Fonctions génériques de Modale ---

    /** Ouvre une modale en ajoutant la classe is-open */
    function openModal(modalElement) {
        if (!modalElement) return;
        modalElement.style.display = 'flex'; // Affiche le conteneur flex
        setTimeout(() => modalElement.classList.add('is-open'), 10);
    }

    /** Ferme une modale en retirant la classe is-open */
    function closeModal(modalElement) {
        if (!modalElement) return;
        modalElement.classList.remove('is-open');

        // Réinitialisation spécifique du contenu vidéo
        const videoPlayer = modalElement.querySelector('iframe, video');
        if (videoPlayer) {
            if (videoPlayer.tagName === 'IFRAME') {
                // Stop YouTube video en réinitialisant la source
                videoPlayer.src = videoPlayer.src.split('?')[0];
            } else if (videoPlayer.tagName === 'VIDEO') {
                // Stop Drive video
                videoPlayer.pause();
                videoPlayer.currentTime = 0; // Remet au début
            }
        }

        // Masque le conteneur après la transition
        setTimeout(() => modalElement.style.display = 'none', 300);
    }

    // --- Logique Mega (Redirection par bouton) ---

    const modalMega = document.getElementById('modal-mega');
    const videoTitlePlaceholder = document.getElementById('video-title-placeholder');
    const megaRedirectButton = document.getElementById('mega-redirect-button');
    let currentMegaLink = ''; // Pour stocker le lien avant la redirection

    function setupMegaModal(videoId) {
        // VÉRIFICATION ADBLOCK AVANT D'OUVRIR LA MODALE
        if (checkAdBlock()) {
            openModal(modalAdBlock);
            return;
        }
        
        const data = videoData[videoId];
        if (!data) return;

        currentMegaLink = data.link;
        videoTitlePlaceholder.textContent = data.title;

        // Événement pour le bouton "Continuer"
        megaRedirectButton.onclick = () => {
            window.location.href = currentMegaLink;
            closeModal(modalMega);
        };

        openModal(modalMega);
    }

    // --- Gestion des Clics sur les Films ---

    const filmCards = document.querySelectorAll('.film-card');
    const heroButton = document.querySelector('.hero-play-button');

    // Événement sur le bouton du Hero
    if (heroButton) {
        heroButton.addEventListener('click', (e) => {
            const videoId = e.currentTarget.dataset.videoId;
            if (videoId) setupMegaModal(videoId);
        });
    }

    // Événement sur la grille de films
    filmCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // S'assurer que le clic n'est pas sur le lien 'a' d'une potentielle future carte
            if (e.target.tagName === 'A') return;

            // VÉRIFICATION ADBLOCK
            if (checkAdBlock()) {
                openModal(modalAdBlock);
                return; // Stoppe le processus d'ouverture de la vidéo
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
                        // Si l'autoplay a été bloqué, lancer la lecture si possible
                        const iframe = modalYT.querySelector('iframe');
                        if (iframe.src.indexOf('autoplay=0') > -1) {
                            // On remplace par autoplay=1 uniquement si l'autoplay n'est pas déjà actif
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

    // --- Gestion de la Fermeture des Modales (Uniformisée) ---

    // 1. Bouton de fermeture (X)
    document.querySelectorAll('.close-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const modal = e.currentTarget.closest('.modal');
            closeModal(modal);
        });
    });

    // 2. Clic en dehors de la modale (sur le fond sombre)
    window.addEventListener('click', e => {
        // Empêche la fermeture du mur Adblock par clic en dehors
        if (e.target.classList.contains('modal') && e.target.id !== 'modal-adblock') {
            closeModal(e.target);
        }
    });

    // 3. Touche Échap
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.is-open');
            // Empêche la fermeture du mur Adblock par 'Échap'
            if (openModalElement && openModalElement.id !== 'modal-adblock') {
                closeModal(openModalElement);
            }
        }
    });

});