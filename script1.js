document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MÚSICA (Persistencia con localStorage)
    // ==========================================
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const volumeSlider = document.getElementById('volume-slider');

    // Recuperar estado guardado de la sesión
    const isPlayingSaved = localStorage.getItem('musicPlaying') === 'true';
    const volumeSaved = localStorage.getItem('musicVolume');

    // Aplicar volumen
    if (volumeSaved) {
        audio.volume = parseFloat(volumeSaved);
        volumeSlider.value = volumeSaved;
    } else {
        audio.volume = volumeSlider.value;
    }

    // Si estaba sonando antes de cambiar de página, intentar reanudar
    if (isPlayingSaved) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.textContent = '⏸';
            }).catch(error => {
                console.log("Autoplay bloqueado. Requiere interacción.", error);
            });
        }
    }

    // Controles de Play/Pause
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playIcon.textContent = '⏸';
            localStorage.setItem('musicPlaying', 'true');
        } else {
            audio.pause();
            playIcon.textContent = '▶';
            localStorage.setItem('musicPlaying', 'false');
        }
    });

    // Control de Volumen
    volumeSlider.addEventListener('input', (e) => {
        audio.volume = e.target.value;
        localStorage.setItem('musicVolume', e.target.value);
    });

    // ==========================================
    // 2. VÍDEOS (Asegurar reproducción)
    // ==========================================
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Forzamos la reproducción para evitar pantallas negras
        video.play().catch(error => {
            console.log("El navegador bloqueó el autoplay del vídeo.", error);
        });
    });

});