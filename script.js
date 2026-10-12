document.addEventListener('DOMContentLoaded', () => {

    const mediaItems = [
        // 7 Images
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.46.jpeg', text: 'Il y a des regards qui restent longtemps après.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.47.jpeg', text: 'Certaines présences changent la lumière d’une pièce.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.46 (2).jpeg', text: 'On n’oublie pas facilement ce qui laisse une trace douce.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.46 (3).jpeg', text: 'Il y a des silences qui en disent plus que des mots.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.46 (4).jpeg', text: 'Quelques détails suffisent parfois à tout retenir.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.46 (5).jpeg', text: 'Certaines personnes rendent l’ordinaire un peu plus clair.' },
        { type: 'image', src: 'WhatsApp Image 2026-09-16 at 21.34.45 (3).jpeg', text: 'Il y a des moments qui restent gravés sans qu’on le décide.' },

        // 5 Vidéos
        { type: 'video', src: 'WhatsApp Video 2026-09-14 at 02.32.52.mp4', text: 'Il y a des gestes qui restent en mémoire.' },
        { type: 'video', src: 'WhatsApp Video 2026-09-16 at 21.34.36.mp4', text: 'Le temps passe, mais certains moments restent.' },
        { type: 'video', src: 'WhatsApp Video 2026-09-16 at 21.34.37.mp4', text: 'On reconnaît parfois une présence sans même la nommer.' },
        { type: 'video', src: 'WhatsApp Video 2026-09-16 at 21.34.43 (1).mp4', text: 'Quelques images suffisent à faire revenir un souvenir.' },
        { type: 'video', src: 'WhatsApp Video 2026-09-16 at 21.34.44 (3).mp4', text: 'Certaines traces restent, même quand on ne les cherche pas.' }
    ];

    const finalMessage = `Certaines présences laissent une lumière
qu’on ne remarque qu’après.

Il y a des personnes
qui changent la couleur des jours
sans même le savoir.

Certaines rencontres n’ont pas besoin de grands mots.
Elles laissent juste quelque chose de vrai.

On ne dit pas toujours tout.
Mais parfois, le silence suffit
pour faire comprendre l’essentiel.

Et même dans le calme,
même dans ce qui n’est pas dit,
quelque chose reste.

Grâce Yasmine

— Wilfried`;

    // Éléments
    const portalBtn = document.getElementById('open-portal');
    const portalContent = document.querySelector('.portal-content');
    const entryPortal = document.getElementById('entry-portal');
    const germinationScreen = document.getElementById('germination');
    const gardenScreen = document.getElementById('garden');
    const finalConfession = document.getElementById('final-confession');
    const bgMusic = document.getElementById('bg-music');
    const muteBtn = document.getElementById('mute-btn');
    const gardenCanvas = document.querySelector('.garden-canvas');
    const flowerModal = document.getElementById('flower-modal');
    const closeModal = document.querySelector('.close-modal');
    const mediaContainer = document.getElementById('media-container');
    const thoughtText = document.getElementById('thought-text');
    const typingText = document.getElementById('typing-text');
    const bloomCounter = document.getElementById('bloom-counter');
    const restartBtn = document.getElementById('restart-btn');

    let flowersOpened = 0;
    let isMusicMuted = false;

    // Ouverture du portail
    portalBtn.addEventListener('click', () => {
        bgMusic.play().catch(() => {});
        portalContent.classList.add('gate-open');

        setTimeout(() => {
            entryPortal.classList.remove('active');
            germinationScreen.classList.add('active');
            startGermination();
        }, 2400);
    });

    function startGermination() {
        germinationScreen.classList.add('germinating');
        setTimeout(() => {
            germinationScreen.classList.remove('active');
            gardenScreen.classList.add('active');
            setupGarden();
        }, 4000);
    }

    function setupGarden() {
        for (let i = 0; i < 40; i++) createFirefly();

        const positions = [
            { left: 14, top: 20 },
            { left: 38, top: 16 },
            { left: 64, top: 18 },
            { left: 84, top: 26 },
            { left: 20, top: 42 },
            { left: 48, top: 38 },
            { left: 74, top: 44 },
            { left: 12, top: 66 },
            { left: 34, top: 64 },
            { left: 60, top: 68 },
            { left: 82, top: 62 },
            { left: 48, top: 82 }
        ];

        mediaItems.forEach((item, index) => {
            const flower = document.createElement('div');
            flower.className = 'flower';

            const pos = positions[index] || {
                left: 15 + Math.random() * 70,
                top: 15 + Math.random() * 65
            };

            flower.style.left = pos.left + '%';
            flower.style.top = pos.top + '%';

            flower.innerHTML = `
                <div class="flower-core"></div>
                <div class="petal" style="transform: rotate(0deg) translate(18px)"></div>
                <div class="petal" style="transform: rotate(72deg) translate(18px)"></div>
                <div class="petal" style="transform: rotate(144deg) translate(18px)"></div>
                <div class="petal" style="transform: rotate(216deg) translate(18px)"></div>
                <div class="petal" style="transform: rotate(288deg) translate(18px)"></div>
            `;

            flower.addEventListener('click', () => bloomFlower(flower, item));
            gardenCanvas.appendChild(flower);
        });
    }

    function bloomFlower(element, data) {
        if (!element.classList.contains('bloomed')) {
            element.classList.add('bloomed');
            flowersOpened++;
            bloomCounter.textContent = `${flowersOpened} / ${mediaItems.length}`;

            document.getElementById('garden').style.background =
                `radial-gradient(circle at center, rgba(4, 10, 7, ${Math.max(0.2, 0.9 - flowersOpened / 14)}) 0%, var(--bg-dark) 100%)`;
        }

        showReveal(data);

        if (flowersOpened >= mediaItems.length) {
            showContinueButton();
        }
    }

    function showContinueButton() {
        if (document.getElementById('continue-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'continue-btn';
        btn.className = 'continue-btn';
        btn.textContent = 'Continuer vers le Sanctuaire →';

        btn.addEventListener('click', () => {
            triggerFinalConfession();
        });

        document.getElementById('garden').appendChild(btn);
    }

    function showReveal(data) {
        mediaContainer.innerHTML = '';

        if (data.type === 'image') {
            const img = document.createElement('img');
            img.src = data.src;
            img.alt = 'Souvenir';
            mediaContainer.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = data.src;
            video.autoplay = true;
            video.loop = true;
            video.muted = false;
            video.playsInline = true;
            mediaContainer.appendChild(video);
            bgMusic.pause();
        }

        thoughtText.textContent = data.text;
        flowerModal.classList.add('active');
    }

    closeModal.addEventListener('click', closeTheModal);

    flowerModal.addEventListener('click', (e) => {
        if (e.target === flowerModal) {
            closeTheModal();
        }
    });

    function closeTheModal() {
        flowerModal.classList.remove('active');

        if (!isMusicMuted) {
            bgMusic.play().catch(() => {});
        }

        const video = mediaContainer.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }

    function triggerFinalConfession() {
        gardenScreen.classList.remove('active');

        setTimeout(() => {
            finalConfession.classList.add('active');

            setTimeout(() => {
                typeWriter(finalMessage, typingText);
            }, 600);
        }, 900);
    }

    function typeWriter(text, element) {
        let i = 0;
        element.textContent = '';
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 45);
    }

    function createFirefly() {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        ff.style.left = Math.random() * 100 + '%';
        ff.style.top = Math.random() * 100 + '%';
        const size = 2 + Math.random() * 3.5;
        ff.style.width = size + 'px';
        ff.style.height = size + 'px';
        document.getElementById('fireflies-container').appendChild(ff);

        ff.animate([
            { transform: 'translate(0, 0)', opacity: 0.2 },
            { transform: `translate(${Math.random()*100-50}px, ${Math.random()*100-50}px)`, opacity: 1 },
            { transform: 'translate(0, 0)', opacity: 0.2 }
        ], {
            duration: (6 + Math.random() * 8) * 1000,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    muteBtn.addEventListener('click', () => {
        isMusicMuted = !isMusicMuted;
        bgMusic.muted = isMusicMuted;
        muteBtn.textContent = isMusicMuted ? '🔇' : '🔊';
    });

    restartBtn.addEventListener('click', () => {
        finalConfession.classList.remove('active');
        portalContent.classList.remove('gate-open');
        germinationScreen.classList.remove('germinating');
        
        flowersOpened = 0;
        bloomCounter.textContent = `0 / ${mediaItems.length}`;
        document.querySelectorAll('.flower').forEach(f => f.classList.remove('bloomed'));
        const contBtn = document.getElementById('continue-btn');
        if (contBtn) contBtn.remove();
        
        entryPortal.classList.add('active');
    });
});