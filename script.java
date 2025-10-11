document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.close-button');
    const iframeContainer = document.getElementById('video-iframe-container');
    const videoTitlePlaceholder = document.getElementById('video-title-placeholder');

    // Ajouter ici tous vos films avec Mega embed links
    const videoData = {
        'video-pucci1': { title:'Pucci 1', megaLink:'https://mega.nz/embed/XXXXX#CLÉ' },
        'video-silence-urbain': { title:'Silence Urbain', megaLink:'https://mega.nz/embed/YYYYY#CLÉ' },
        'video-etoile-filante': { title:'Étoile Filante', megaLink:'https://mega.nz/embed/ZZZZZ#CLÉ' },
        'video-derniere-danse': { title:'Dernière Danse', megaLink:'https://mega.nz/embed/AAAAA#CLÉ' }
    };

    function openVideoModal(videoId){
        const data = videoData[videoId];
        if(data){
            const iframe = document.createElement('iframe');
            iframe.src = data.megaLink;
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;

            iframeContainer.innerHTML = '';
            iframeContainer.appendChild(iframe);

            videoTitlePlaceholder.textContent = data.title;
            modal.style.display = 'block';
        } else { console.error('Film introuvable:', videoId); }
    }

    function closeVideoModal(){
        modal.style.display = 'none';
        iframeContainer.innerHTML = '';
        videoTitlePlaceholder.textContent = '';
    }

    document.querySelectorAll('.play-button, .film-card').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            const videoId = el.dataset.videoId;
            if(videoId) openVideoModal(videoId);
        });
    });

    closeButton.addEventListener('click', closeVideoModal);
    window.addEventListener('click', e => { if(e.target === modal) closeVideoModal(); });
    document.addEventListener('keydown', e => { if(e.key==='Escape' && modal.style.display==='block') closeVideoModal(); });
});
