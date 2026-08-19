const START_DATE = new Date('2025-06-10T00:00:00');
let letterTyped = false; 

function nextSlide(slideId) {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });

    const targetSlide = document.getElementById(`slide-${slideId}`);
    const card = document.querySelector('.card');

    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    if (slideId === 2 || slideId === '2') {
        card.classList.add('wide-mode');
    } else {
        card.classList.remove('wide-mode');
    }

    updateProgressDots(String(slideId));

    if (slideId === 1 || slideId === '1') {
        letterTyped = false;
        const typedBox = document.getElementById('letterTyped');
        if (typedBox) typedBox.innerHTML = '';
        const skipBtn = document.getElementById('skipTypingBtn');
        if (skipBtn) skipBtn.style.display = 'inline-block';
    }

    const nextToReplyBtn = document.getElementById('nextToReplyBtn');
    if (slideId === 5 || slideId === '5') {
        if (nextToReplyBtn) {
            nextToReplyBtn.style.display = letterTyped ? 'inline-block' : 'none';
        }
        if (!letterTyped) {
            launchConfetti();
            typeLetter();
        }
    } else {
        if (nextToReplyBtn) {
            nextToReplyBtn.style.display = 'none';
        }
    }

    if (slideId === 'days' || slideId === 'days') {
        updateDayCounter();
    }
}

function openHappySlide() {
    nextSlide('4-happy');
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingHeart, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = Math.random() > 0.35 ? '💙' : '✨';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heart.style.fontSize = Math.random() * 12 + 16 + 'px';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 7000);
}

setInterval(createHeart, 350);

document.addEventListener('click', (e) => {
    if (e.target.matches('.photo-item img')) {
        expandImage(e.target);
        return;
    }
    if (e.target.matches('#imageModal') || e.target.matches('.close-modal')) {
        closeModal();
    }
});

function expandImage(imgElement) {
    const modal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('imgExpanded');
    expandedImg.src = imgElement.src;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

const sweetMessages = [
    "🌸 C iuu là điều đáng yêu và tuyệt vời nhất trên thế giới này!",
    "✨ Nụ cười của C iuu có công suất làm tan chảy mọi mệt mỏi luôn đó!",
    "💖 Hôm nay C iuu đã làm rất tốt rồi, thương C iuu nhiều lắm!",
    "🍭 Một nụ hôn siêu béo gửi thẳng vào má C iuu nè 😚💋",
    "🌷 C iuu cứ việc đáng yêu, cả thế giới để tui lo!",
    "⭐ C iuu ơi, em là ngôi sao sáng nhất trong lòng anh đấy!",
    "🧸 Chúc C iuu luôn vui vẻ, xinh đẹp và lúc nào cũng được nuông chiều!",
    "🥰 Nhớ C iuu nhiều lắm, chỉ muốn ôm C iuu một cái thật chặt thôi!"
];

function popCandyMessage() {
    const messageElem = document.getElementById('sweetMessage');
    const randomIndex = Math.floor(Math.random() * sweetMessages.length);
    const selectedMsg = sweetMessages[randomIndex];

    messageElem.style.animation = 'none';
    messageElem.offsetHeight; 
    messageElem.style.animation = 'popText 0.35s ease';
    messageElem.innerText = selectedMsg;

    createFloatingHeart();
}

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['💖', '🍬', '✨', '🌸', '🍭'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 80 + 10 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 20 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 4000);
}

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('button, .jar-container, .photo-item, .btn')) {
        if ('vibrate' in navigator) {
            navigator.vibrate(35); 
        }
    }
}, { passive: true });

document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const heart = document.createElement('div');
    heart.className = 'touch-heart';
    const icons = ['💖', '✨', '🌸', '🍬', '🥰', '💕'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = touch.clientX + 'px';
    heart.style.top = touch.clientY + 'px';
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 1000);
}, { passive: true });

function tryPlayMusic() {
    const music = document.getElementById('bgMusic');
    if (!music || !music.paused) return;

    music.volume = 0.5; 
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                document.removeEventListener('touchstart', tryPlayMusic);
                document.removeEventListener('touchend', tryPlayMusic);
                document.removeEventListener('click', tryPlayMusic);
            })
            .catch(() => {});
    }
}

document.addEventListener('touchstart', tryPlayMusic, { passive: true });
document.addEventListener('touchend', tryPlayMusic, { passive: true });
document.addEventListener('click', tryPlayMusic);

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const muteButton = document.getElementById('muteToggle');

    if (music.paused) {
        music.play();
        muteButton.innerHTML = '🔊'; 
    } else {
        music.pause();
        muteButton.innerHTML = '🔇'; 
    }
}

function updateProgressDots(slideId) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    let step;
    switch (slideId) {
        case '1': step = 1; break;
        case 'days': step = 2; break;
        case 'quiz': step = 3; break;
        case '2': step = 4; break;
        case '3': step = 5; break;
        case '4':
        case '4-1':
        case '4-2':
        case '4-3':
        case '4-happy': step = 6; break;
        case '5': step = 7; break;
        case '6': step = 8; break;
        default: step = 1;
    }

    const dotToActivate = document.querySelector(`.dot[data-step="${step}"]`);
    if (dotToActivate) {
        dotToActivate.classList.add('active');
    }
}

function typeLetter() {
    const letterBox = document.getElementById('letterTyped');
    const letterText = `Happy Birthday c iuu ơi! 💐🎂 

Thêm một tuổi mới, chúc cho cô gái nhỏ của anh luôn vững tin, may mắn và hạnh phúc với những gì em đang theo đuổi. Dù ngoài kia có nhiều áp lực thế nào, cục cưng hãy nhớ luôn có anh ở đây làm chỗ dựa vững chắc cho em.

Cảm ơn c iuu đã đến và làm cho cuộc sống của anh rực rỡ hơn bao giờ hết. Chúc cục cưng một ngày sinh nhật thật ấm áp!

Love you so much! 💗`;

    let index = 0;
    function type() {
        if (index < letterText.length) {
            letterBox.innerHTML += letterText.charAt(index);
            index++;
            setTimeout(type, 30); 
        } else {
            letterTyped = true;
            const skipBtn = document.getElementById('skipTypingBtn');
            if (skipBtn) skipBtn.style.display = 'none';
            document.getElementById('nextToReplyBtn').style.display = 'inline-block';
        }
    }
    type();
}

function skipTyping() {
    const letterBox = document.getElementById('letterTyped');
    const letterText = `Happy Birthday Mít!! 🎉🎂

Từ ngày đầu tiên chúng mình quen nhau tới giờ, mỗi ngày bên em đều là một quà tặng đặc biệt. Em là nguồn động lực và niềm ninh không thể thay đổi trong cuộc đời anh.

Em Mít ơi, anh chúc em luôn mạnh khỏe, xinh đẹp và hạnh phúc mỗi ngày. Cảm ơn em đã luôn bên anh và làm cho cuộc đời anh nên nghĩa hơn bao giờ hết.

Anh iu em nhiều lắm! 💙`;

    letterBox.innerHTML = letterText;
    letterTyped = true;
    const skipBtn = document.getElementById('skipTypingBtn');
    if (skipBtn) skipBtn.style.display = 'none';
    document.getElementById('nextToReplyBtn').style.display = 'inline-block';
}

function checkQuizAnswer(element, isCorrect) {
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.classList.remove('correct', 'wrong');
    });

    if (isCorrect) {
        element.classList.add('correct');
        document.getElementById('quizFeedback').textContent = 'Chính xác! 😊';
        document.getElementById('quizFeedback').style.color = '#166534';
    } else {
        element.classList.add('wrong');
        document.getElementById('quizFeedback').textContent = 'Sai rồi! Thử lại nhé 😊';
        document.getElementById('quizFeedback').style.color = '#991b1b';
    }

    quizOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.7';
    });

    setTimeout(() => {
        quizOptions.forEach(option => {
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
        });
        document.getElementById('quizFeedback').textContent = '';
    }, 2000);
}

function updateDayCounter() {
    const now = new Date();
    const startDate = new Date(START_DATE);
    const timeDiff = now - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById('dayCounterNumber').textContent = daysDiff;

    const subText = document.getElementById('dayCounterSub');
    if (daysDiff === 1) {
        subText.textContent = 'ngày rồi đó nè! 🥹';
    } else {
        subText.textContent = 'ngày rồi đó nè! 🥹';
    }
}

function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.innerText = ['🎉', '🎊', '✨', '💫', '🌟'][Math.floor(Math.random() * 5)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.fontSize = Math.random() * 10 + 10 + 'px';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateProgressDots('1'); 
});

function showReplySection() {
    nextSlide('6'); 
}

function sendReply() {
    const replyInput = document.getElementById('replyInput');
    const replyText = replyInput.value.trim();
    if (replyText === '') {
        alert('Vui lòng nhập lời nhắn trước khi gửi!');
        return;
    }
    try {
        const replies = JSON.parse(localStorage.getItem('birthdayReplies') || '[]');
        replies.push({
            text: replyText,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('birthdayReplies', JSON.stringify(replies));
    } catch (e) {
        console.warning('Unable to save to localStorage', e);
    }

    const replyStatus = document.getElementById('replyStatus');
    replyStatus.textContent = 'Gửi thành công! Cảm ơn Mít 💖';
    replyStatus.style.color = '#166534';

    replyInput.value = '';
    replyInput.blur();

    setTimeout(() => {
        replyStatus.textContent = '';
    }, 3000);
}

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const types = ['✨', '💖', '🌸', '🎉'];
    particle.innerText = types[Math.floor(Math.random() * types.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
    particle.style.animation = 'floatUp 3s ease-out forwards';
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 3000);
}

let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove > 100) { 
        lastMouseMove = now;
        createParticle(e.clientX, e.clientY);
    }
});

document.addEventListener('touchmove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove > 100) {
        lastMouseMove = now;
        const touch = e.touches[0];
        createParticle(touch.clientX, touch.clientY);
    }
}, { passive: true });