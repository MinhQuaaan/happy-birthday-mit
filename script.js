// 🔧 SỬA NGÀY NÀY THÀNG NGÀY BẮT ĐẦU QUEN NHAU CỦA HAI BẠN (năm-tháng-ngày)
// they met online on 10/06/2025
const START_DATE = new Date('2025-06-10T00:00:00');

let letterTyped = false; // lá thư đã gõ xong chưa

// Function chuyển giữa các Slide (Hỗ trợ cả sub-slide 4-1, 4-2, 4-3, 4-happy, days, quiz)
function nextSlide(slideId) {
    document.querySelectorAll('.slide').forEach(slide => {
        slide.classList.remove('active');
    });

    const targetSlide = document.getElementById(`slide-${slideId}`);
    const card = document.querySelector('.card');

    if (targetSlide) {
        targetSlide.classList.add('active');
    }

    // Mở rộng khung chỉ riêng ở Slide 2 kỉ niệm
    if (slideId === 2 || slideId === '2') {
        card.classList.add('wide-mode');
    } else {
        card.classList.remove('wide-mode');
    }

    updateProgressDots(String(slideId));

    // Reset trạng thái để lá thư gõ lại từ đầu mỗi khi bấm "Mở lại từ đầu"
    if (slideId === 1 || slideId === '1') {
        letterTyped = false;
        const typedBox = document.getElementById('letterTyped');
        if (typedBox) typedBox.innerHTML = '';
        const skipBtn = document.getElementById('skipTypingBtn');
        if (skipBtn) skipBtn.style.display = 'inline-block';
    }

    if (slideId === 'days' || slideId === 'days') {
        updateDayCounter();
    }

    if (slideId === 5 || slideId === '5') {
        launchConfetti();
        if (!letterTyped) {
            typeLetter();
        }
    }
}

// Hàm mở slide Hachiware vui mừng hạnh phúc
function openHappySlide() {
    nextSlide('4-happy');

    // Bắn pháo hoa tim tung tóa mừng Mít đồng ý
    for (let i = 0; i < 12; i++) {
        setTimeout(createFloatingHeart, i * 100);
    }
}

// Tạo Trái tim & Ngôi sao bay TỪ DƯỚI LÊN TRÊN
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerText = Math.random() > 0.35 ? '💙' : '✨';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    heart.style.fontSize = Math.random() * 12 + 16 + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createHeart, 350);

// Bắt sự kiện Click phóng to Modal ảnh
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

// Danh sách lời nhắn ngọt ngào dành riêng cho Mít
const sweetMessages = [
    "🌸 Mít là điều đáng yêu và tuyệt vời nhất trên thế giới này!",
    "✨ Nụ cười của Mít có công suất làm tan chảy mọi mệt mỏi luôn đó!",
    "💖 Hôm nay Mít đã làm rất tốt rồi, thương Mít nhiều lắm!",
    "🍭 Một nụ hôn siêu béo gửi thẳng vào má Mít nè 😚💋",
    "🌷 Mít cứ việc đáng yêu, cả thế giới để anh lo!",
    "⭐ Mít ơi, em là ngôi sao sáng nhất trong lòng anh đấy!",
    "🧸 Chúc Mít luôn vui vẻ, xinh đẹp và lúc nào cũng được nuông chiều!",
    "🥰 Nhớ Mít nhiều lắm, chỉ muốn ôm Mít một cái thật chặt thôi!"
];

function popCandyMessage() {
    const messageElem = document.getElementById('sweetMessage');

    // Chọn ngẫu nhiên 1 câu ngọt ngào
    const randomIndex = Math.floor(Math.random() * sweetMessages.length);
    const selectedMsg = sweetMessages[randomIndex];

    // Tạo hiệu ứng đổi chữ
    messageElem.style.animation = 'none';
    messageElem.offsetHeight; // trigger reflow
    messageElem.style.animation = 'popText 0.35s ease';
    messageElem.innerText = selectedMsg;

    // Bắn tim bay lơ lửng khi bấm
    createFloatingHeart();
}

// Hàm bắn trái tim nhỏ khi bấm rút kẹo
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = ['💖', '🍬', '✨', '🌸', '🍭'][Math.floor(Math.random() * 5)];
    heart.style.left = Math.random() * 80 + 10 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    heart.style.fontSize = Math.random() * 15 + 20 + 'px';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// ====== TÍNH NĂNG RUNG HAPTIC TRÊN ĐIỆN THOẠI ======
document.addEventListener('touchstart', function(e) {
    // Rung nhẹ 30ms mỗi khi chạm vào bất kỳ nút bấm hoặc lọ kẹo/hình ảnh nào
    if (e.target.closest('button, .jar-container, .photo-item, .btn')) {
        if ('vibrate' in navigator) {
            navigator.vibrate(35); // Rung cực nhẹ, êm tay
        }
    }
}, { passive: true });

// ====== HIỆU ỨNG CHẠM NGÓN TAY RA TIM ======
document.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const heart = document.createElement('div');
    heart.className = 'touch-heart';

    // Ngẫu nhiên các icon cute
    const icons = ['💖', '✨', '🌸', '🍬', '🥰', '💕'];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];

    heart.style.left = touch.clientX + 'px';
    heart.style.top = touch.clientY + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}, { passive: true });

// ====== TỰ BẬT NHẠC NỀN KHI MÍT TƯƠNG TÁC LẦN ĐẦU ======
// Trên nhiều trình duyệt di động (đặc biệt Safari/iOS), 1 lần touchstart
// đôi khi KHÔNG được tính là "user gesture" hợp lệ nên music.play() bị chặn
// và rơi vào catch() im lặng -> nhạc không bao giờ phát. Thay vì chỉ thử
// đúng 1 lần (once: true), ta thử lại ở MỌI lần chạm/click cho đến khi
// play() thực sự thành công, sau đó mới gỡ các listener.
function tryPlayMusic() {
    const music = document.getElementById('bgMusic');
    if (!music || !music.paused) return;

    music.volume = 0.5; // Âm lượng vừa phải 50%
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Phát thành công -> không cần lắng nghe nữa
                document.removeEventListener('touchstart', tryPlayMusic);
                document.removeEventListener('touchend', tryPlayMusic);
                document.removeEventListener('click', tryPlayMusic);
            })
            .catch(() => {
                // Vẫn bị chặn, sẽ tự thử lại ở lần chạm/click kế tiếp
            });
    }
}

document.addEventListener('touchstart', tryPlayMusic, { passive: true });
document.addEventListener('touchend', tryPlayMusic, { passive: true });
document.addEventListener('click', tryPlayMusic);

// BÃI THÁT: MỤC ĐÍCH LÀ CỦA MÚT NHẬT ĐỌC
// ===== THÊM CÁC HÀM THIẾU =====

// Hàm bật/tắt nhạc nền
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const muteButton = document.getElementById('muteToggle');

    if (music.paused) {
        music.play();
        muteButton.innerHTML = '🔊'; // Icon bật âm
    } else {
        music.pause();
        muteButton.innerHTML = '🔇'; // Icon tắt âm
    }
}

// Hàm cập nhật thanh chấm tiến trình
function updateProgressDots(slideId) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    let step;
    switch (slideId) {
        case '1':
            step = 1;
            break;
        case 'days':
            step = 2;
            break;
        case 'quiz':
            step = 3;
            break;
        case '2':
            step = 4;
            break;
        case '3':
            step = 5;
            break;
        case '4':
        case '4-1':
        case '4-2':
        case '4-3':
        case '4-happy':
            step = 6;
            break;
        case '5':
            step = 7;
            break;
        default:
            step = 1;
    }

    const dotToActivate = document.querySelector(`.dot[data-step="${step}"]`);
    if (dotToActivate) {
        dotToActivate.classList.add('active');
    }
}

// Hàm gõ lá thưSlide 5
function typeLetter() {
    const letterBox = document.getElementById('letterTyped');
    const letterText = `Happy Birthday Mít!! 🎉🎂

Từ ngày đầu tiên chúng mình quen nhau tới giờ, mỗi ngày bên em đều là một quà tặng đặc biệt. Em là nguồn động lực và niềm ninh không thể thay đổi trong cuộc đời anh.

Em Mít ơi, anh chúc em luôn mạnh khỏe, xinh đẹp và hạnh phúc mỗi ngày. Cảm ơn em đã luôn bên anh và làm cho cuộc đời anh nên nghĩa hơn bao giờ hết.

Anh iu em nhiều lắm! 💙`;

    let index = 0;
    function type() {
        if (index < letterText.length) {
            letterBox.innerHTML += letterText.charAt(index);
            index++;
            setTimeout(type, 30); // Tốc độ gõ
        } else {
            letterTyped = true;
            const skipBtn = document.getElementById('skipTypingBtn');
            if (skipBtn) skipBtn.style.display = 'none';
            // Show reply section after letter is done
            showReplySection();
        }
    }
    type();
}

// Hàm bỏ qua gõ lá thư (hiện ngay)
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
}

// Hàm kiểm tra đáp án quiz
function checkQuizAnswer(element, isCorrect) {
    // Xóa tất cả các lớp correct/wrong khỏi các nút
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.classList.remove('correct', 'wrong');
    });

    // Thêm lớp đúng/sai vào nút được chọn
    if (isCorrect) {
        element.classList.add('correct');
        document.getElementById('quizFeedback').textContent = 'Chính xác! 😊';
        document.getElementById('quizFeedback').style.color = '#166534';
    } else {
        element.classList.add('wrong');
        document.getElementById('quizFeedback').textContent = 'Sai rồi! Thử lại nhé 😊';
        document.getElementById('quizFeedback').style.color = '#991b1b';
    }

    // Vô hiệu hóa tất cả các nút sau khi chọn
    quizOptions.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.7';
    });

    // Cho phép继续 sau 2 giây
    setTimeout(() => {
        quizOptions.forEach(option => {
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
        });
        // Xóa phản hồi sau 2 giây
        document.getElementById('quizFeedback').textContent = '';
    }, 2000);
}

// Hàm đếm ngày (giả sử đã có từ trước, nếu không thì thêm)
function updateDayCounter() {
    const now = new Date();
    const startDate = new Date(START_DATE);
    const timeDiff = now - startDate;
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById('dayCounterNumber').textContent = daysDiff;

    // Cập nhật phụ đề dựa trên số ngày
    const subText = document.getElementById('dayCounterSub');
    if (daysDiff === 1) {
        subText.textContent = 'ngày rồi đó nè! 🥹';
    } else {
        subText.textContent = 'ngày rồi đó nè! 🥹';
    }
}

// Hàm phóng pháo hoa (giả sử đã có từ trước, nếu không thì thêm)
function launchConfetti() {
    // Simple confetti effect
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

// Khởi tạo thanh chấm tiến trình khi trang tải
document.addEventListener('DOMContentLoaded', function() {
    updateProgressDots('1'); // Bắt đầu ở slide 1
});

// ===== TRẢ LƠI LÁ THƯ =====
function showReplySection() {
    document.getElementById('replySection').style.display = 'block';
}

function sendReply() {
    const replyInput = document.getElementById('replyInput');
    const replyText = replyInput.value.trim();
    if (replyText === '') {
        alert('Vui lòng nhập lời nhắn trước khi gửi!');
        return;
    }
    try {
        // Lưu vào localStorage
        const replies = JSON.parse(localStorage.getItem('birthdayReplies') || '[]');
        replies.push({
            text: replyText,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('birthdayReplies', JSON.stringify(replies));
    } catch (e) {
        console.warning('Unable to save to localStorage', e);
        // Still show success; we can optionally inform user
    }

    // Hiển thị trạng thái
    const replyStatus = document.getElementById('replyStatus');
    replyStatus.textContent = 'Gửi thành công! Cảm ơn Mít 💖';
    replyStatus.style.color = '#166534';

    // Xóa input và ẩn keyboard (blur)
    replyInput.value = '';
    replyInput.blur();

    // Ẩn trạng thái sau 3 giây
    setTimeout(() => {
        replyStatus.textContent = '';
    }, 3000);
}

// ===== HIỆU ỤNG HẬT PARTICLE =====
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

    // Xóa sau khi kết thúc animation
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Throttle for mousemove and touchmove
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove > 100) { // Giới hạn 10ms một lần
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