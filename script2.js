document.addEventListener('DOMContentLoaded', () => {
    
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const volumeSlider = document.getElementById('volume-slider');

    const isPlayingSaved = localStorage.getItem('musicPlaying') === 'true';
    const volumeSaved = localStorage.getItem('musicVolume');

    if (volumeSaved) {
        audio.volume = parseFloat(volumeSaved);
        volumeSlider.value = volumeSaved;
    } else { audio.volume = volumeSlider.value; }

    if (isPlayingSaved) {
        audio.play().then(() => { playIcon.textContent = '⏸'; }).catch(e => console.log("Autoplay bloqueado"));
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) { audio.play(); playIcon.textContent = '⏸'; localStorage.setItem('musicPlaying', 'true'); } 
        else { audio.pause(); playIcon.textContent = '▶'; localStorage.setItem('musicPlaying', 'false'); }
    });

    volumeSlider.addEventListener('input', (e) => { audio.volume = e.target.value; localStorage.setItem('musicVolume', e.target.value); });

    // CANVAS (Estrellas)
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let stars = [];
        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            for (let i = 0; i < 150; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 3 + 1,
                    opacity: Math.random() * 0.5 + 0.5
                });
            }
        }
        window.addEventListener('resize', initCanvas);
        initCanvas();

        function animateStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
                star.y += star.speed;
                if (star.y > canvas.height) { star.y = 0; star.x = Math.random() * canvas.width; }
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // GSAP TIMELINE
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".journey-scroll",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    tl.to(".intro-text", { opacity: 0, y: -30, duration: 1 }, 0);
    tl.to(".ship-trail", { opacity: 1, height: 200, ease: "power1.in", duration: 1 }, 0);
    
    // LA NAVE BAJA HASTA EL 62% (Posada sobre el planeta)
    tl.to(".ship-container", { top: "62%", ease: "none", duration: 8 }, 0);

    // CARDS (Terminan antes de que el planeta suba)
    tl.to(".card-1", { opacity: 1, duration: 1 }, 1);
    tl.to(".card-1", { opacity: 0, duration: 1 }, 2.5);
    
    tl.to(".card-2", { opacity: 1, duration: 1 }, 3);
    tl.to(".card-2", { opacity: 0, duration: 1 }, 4.5);
    
    tl.to(".card-3", { opacity: 1, duration: 1 }, 5);
    tl.to(".card-3", { opacity: 0, duration: 1 }, 6.5);

    // EL PLANETA SUBE PERO SE DETIENE EN 20% (Debajo de la nave)
    tl.to(".planet", { y: "20%", ease: "power1.out", duration: 1.5 }, 7);
    
    // ESTELA Y TEXTO FINAL
    tl.to(".ship-trail", { opacity: 0, height: 0, duration: 0.5 }, 8.5);
    tl.to(".final-text", { opacity: 1, pointerEvents: "auto", duration: 1 }, 9);
});