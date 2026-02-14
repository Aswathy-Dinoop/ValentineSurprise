document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const CONFIG = {
        specialDate: '28032021', // Wedding Date: 28/03/2021
        letterMessage: `My Dearest Husband, \n\nThinking back to May 15, 2019, when we first met, and March 28, 2021, our beautiful wedding day... every moment with you has been a dream. \n\nYou are my rock, my love, and my best friend. \n\nThank you for being you and for making my life so incredibly beautiful. I look forward to a thousand more years of love and happiness with you. \n\nForever Yours, \nYour Loving Wife`,
        typingSpeed: 50
    };

    // --- ELEMENTS ---
    const passwordOverlay = document.getElementById('password-overlay');
    const passwordInput = document.getElementById('special-date-input');
    const unlockBtn = document.getElementById('unlock-btn');
    const passwordMessage = document.getElementById('password-message');
    const mainContent = document.getElementById('main-content');

    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const musicIcon = musicToggle.querySelector('i');

    const heartsContainer = document.getElementById('hearts-container');

    const readHeartBtn = document.getElementById('read-heart-btn');
    const typewriterText = document.getElementById('typewriter-text');

    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseMessage = document.getElementById('surprise-message');
    const fireworksCanvas = document.getElementById('fireworks-canvas');

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = lightbox.querySelector('.close-lightbox');

    const secretPopup = document.getElementById('secret-popup');
    const popupText = document.getElementById('popup-text');
    const closePopup = secretPopup.querySelector('.close-popup');

    // --- 1. PASSWORD PROTECTION ---
    unlockBtn.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });

    function checkPassword() {
        if (passwordInput.value === CONFIG.specialDate) {
            passwordOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Show floating hearts after unlock
            createFloatingHearts();
            // Start countdown
            startCountdown();
            // Try to auto-play music (browsers might block this until user interaction)
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                musicIcon.classList.remove('fa-music');
                musicIcon.classList.add('fa-pause');
            }).catch(error => {
                console.log("Auto-play prevented. User needs to toggle manually.");
            });
        } else {
            passwordMessage.textContent = "Oops! Try again my love 😘";
            passwordInput.value = '';
        }
    }

    // --- 2. MUSIC CONTROL ---
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
        } else {
            bgMusic.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        }
    });

    // --- 3. FLOATING HEARTS ---
    function createFloatingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            const size = Math.random() * 30 + 10 + 'px';
            heart.style.width = size;
            heart.style.height = size;

            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 5 + 5 + 's';

            // Random colors for variety
            const colors = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#8B0000'];
            heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 500);
    }

    // --- 4. COUNTDOWN TIMER ---
    function startCountdown() {
        const nextValentine = new Date('Feb 14, 2027 00:00:00').getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextValentine - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days.toString().padStart(2, '0');
            document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('countdown').innerHTML = "HAPPY VALENTINE'S DAY!";
            }
        }, 1000);
    }

    // --- 5. TYPEWRITER EFFECT ---
    let charIndex = 0;
    function typeLetter() {
        if (charIndex < CONFIG.letterMessage.length) {
            typewriterText.innerHTML += CONFIG.letterMessage.charAt(charIndex) === '\n' ? '<br>' : CONFIG.letterMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeLetter, CONFIG.typingSpeed);
        }
    }

    readHeartBtn.addEventListener('click', () => {
        typewriterText.innerHTML = '';
        charIndex = 0;
        readHeartBtn.style.display = 'none';
        typeLetter();
    });

    // --- 6. GALLERY & LIGHTBOX ---
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const msg = item.getAttribute('data-msg');

            if (item.classList.contains('favorite')) {
                // Secret Message for favorite photo
                popupText.textContent = msg;
                secretPopup.style.display = 'flex';
            } else {
                // Regular Lightbox
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = msg;
                lightbox.style.display = 'flex';
            }
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    closePopup.addEventListener('click', () => {
        secretPopup.style.display = 'none';
    });

    // --- 7. FIREWORKS ---
    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.style.transform = "scale(0)";
        setTimeout(() => {
            surpriseBtn.classList.add('hidden');
            surpriseMessage.classList.remove('hidden');

            // 1. Initial Mega Blast
            createMegaExplosion();

            // 2. Start Advanced Fireworks
            startAdvancedFireworks();

            // 3. Start Heart Rain
            startHeartRain();

            // 4. Start Confetti
            startConfetti();
        }, 300);
    });

    function createFloatingHeartAtBtn() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '80%';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.color = '#8B0000';
        heart.style.zIndex = '1000';

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 5 + 5;
        let x = 0;
        let y = 0;
        let opacity = 1;

        document.body.appendChild(heart);

        const anim = setInterval(() => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity - 2; // Move up
            opacity -= 0.02;
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(anim);
                heart.remove();
            }
        }, 30);
    }

    function createMegaExplosion() {
        for (let i = 0; i < 50; i++) {
            createFloatingHeartAtBtn();
        }
    }

    function startHeartRain() {
        const interval = setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            heart.style.zIndex = '1000';
            document.body.appendChild(heart);

            const dropAnim = heart.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(110vh) rotate(360deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'linear'
            });

            dropAnim.onfinish = () => heart.remove();
        }, 150);

        setTimeout(() => clearInterval(interval), 15000);
    }

    function startConfetti() {
        const colors = ['#FFB6C1', '#FF69B4', '#FFD700', '#FFFFFF'];
        const interval = setInterval(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '999';
            confetti.style.borderRadius = '2px';
            document.body.appendChild(confetti);

            const anim = confetti.animate([
                { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
                { transform: `translateY(110vh) rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            anim.onfinish = () => confetti.remove();
        }, 80);

        setTimeout(() => clearInterval(interval), 10000);
    }

    function startAdvancedFireworks() {
        const canvas = fireworksCanvas;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let rockets = [];

        class Particle {
            constructor(x, y, color, velocityX, velocityY) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.velocity = { x: velocityX, y: velocityY };
                this.alpha = 1;
                this.friction = 0.96;
                this.gravity = 0.15;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.velocity.x *= this.friction;
                this.velocity.y *= this.friction;
                this.velocity.y += this.gravity;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                this.alpha -= 0.01;
            }
        }

        class Rocket {
            constructor(x, y, targetY, color) {
                this.x = x;
                this.y = y;
                this.targetY = targetY;
                this.color = color;
                this.velocity = { x: (Math.random() - 0.5) * 2, y: -12 };
                this.alive = true;
            }

            update() {
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                if (this.y <= this.targetY) {
                    this.explode();
                    this.alive = false;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            explode() {
                for (let i = 0; i < 80; i++) {
                    const angle = (Math.PI * 2 / 80) * i;
                    const speed = Math.random() * 8 + 2;
                    particles.push(new Particle(
                        this.x,
                        this.y,
                        this.color,
                        Math.cos(angle) * speed,
                        Math.sin(angle) * speed
                    ));
                }
            }
        }

        function launchRocket() {
            const x = Math.random() * canvas.width;
            const y = canvas.height;
            const targetY = Math.random() * (canvas.height * 0.5);
            const colors = ['#FF1493', '#FF0000', '#FFD700', '#00FFFF', '#FF69B4', '#FFFFFF'];
            rockets.push(new Rocket(x, y, targetY, colors[Math.floor(Math.random() * colors.length)]));
        }

        function animate() {
            if (surpriseMessage.classList.contains('hidden')) return;

            requestAnimationFrame(animate);
            ctx.fillStyle = 'rgba(255, 250, 250, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            rockets.forEach((rocket, i) => {
                rocket.update();
                rocket.draw();
                if (!rocket.alive) rockets.splice(i, 1);
            });

            particles.forEach((particle, i) => {
                if (particle.alpha > 0) {
                    particle.update();
                    particle.draw();
                } else {
                    particles.splice(i, 1);
                }
            });
        }

        const launcher = setInterval(launchRocket, 500);
        setTimeout(() => clearInterval(launcher), 15000);
        animate();
    }


});
