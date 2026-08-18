// Function chuyển giữa các Slide (Hỗ trợ cả sub-slide 4-1, 4-2, 4-3, 4-happy)
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