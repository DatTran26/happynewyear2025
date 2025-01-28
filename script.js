$(function () {
  $('body').sakura({
    newOn: 300,
  });
});

// Hàm random mà không trùng
function getRandomPosition(positions) {
  // Chọn ngẫu nhiên một chỉ số trong mảng
  const index = Math.floor(Math.random() * positions.length);
  const position = positions[index];

  // Loại bỏ vị trí đã chọn khỏi mảng
  positions.splice(index, 1);

  return position;
}

document.addEventListener('DOMContentLoaded', () => {
  const lixiItems = document.querySelectorAll('.lixi');

  // Mảng chứa URL hình ảnh cho bao lì xì
  const lixiImages = [
    'lixi-1.png',
    'lixi-2.png',
    'lixi-3.png',
    'lixi-4.png',
    'lixi-5.png',
    'lixi-6.png',
  ];

  const positions = [
    { left: 72.61, top: 17.0 },
    { left: 47.17, top: 29.9 },
    { left: 29.5, top: 37.9 },
    { left: 49.06, top: 72.2 },
    { left: 77.28, top: 65.0 },
    { left: 8.17, top: 61.4 },
  ];

  // Ví dụ sử dụng
  let availablePositions = [...positions]; // Tạo bản sao của mảng để giữ nguyên mảng gốc
  let availableImages = [...lixiImages];

  lixiItems.forEach((lixi) => {
    const img = lixi.querySelector('img');

    // Random vị trí
    const randomPosition = getRandomPosition(availablePositions);
    const randomX = randomPosition.left;
    const randomY = randomPosition.top;

    lixi.style.left = `${randomX}%`;
    lixi.style.top = `${randomY}%`;

    // Random ảnh
    const randomPositionImage = getRandomPosition(availableImages);
    img.src = './assets/img/' + randomPositionImage;
  });
});

function handleClickLixi() {
  // Mảng chứa message cho chúc mừng
  const chucMungMessages = [
    '🎉 Chúc mừng năm mới! Chúc bạn một năm tràn đầy niềm vui, sức khỏe dồi dào và thành công vượt bậc! 🎆',
    '🌸 Tết đến xuân về, chúc bạn vạn sự như ý, mọi khó khăn đều qua đi, chỉ còn lại niềm vui và hạnh phúc! 🌟',
    '💰 Chúc bạn năm mới an khang thịnh vượng, gia đình ấm no, và luôn gặp may mắn trên mọi nẻo đường! 🍀',
    '❤️ Năm mới, chúc bạn đón nhận thật nhiều yêu thương, hạnh phúc ngập tràn và sức khỏe mãi vững bền! 🌈',
    '🌟 Chúc bạn một năm mới thật rực rỡ, mọi dự định đều thành công, và những khoảnh khắc tuyệt vời luôn bên bạn! 🎊',
    '🎁 Chúc bạn năm mới phát tài phát lộc, mọi công việc đều thuận lợi, gia đình hạnh phúc và vui vẻ! 🏡',
  ];

  // Mảng chứa message cho bao lì xì
  const lixiMessages = [
    'Mình xin lì xì 💲',
  ];

  // file qr
  const filePathQR = './assets/qr/qr.jpg';
  // có qr hay không
  const showQR = true;

  let availableMessages = [...chucMungMessages];
  let availableLixiMessages = [...lixiMessages];

  const lixiItems = document.querySelectorAll('.lixi');
  const card = document.querySelector('.card');
  const messageElement = document.getElementById('message');
  const imageElement = document.getElementById('image');

  function closeCurrentCard() {
    const card = document.querySelector('.card');
    card.style.display = 'none';
    messageElement.style.display = 'none';
    imageElement.style.display = 'none';
  }

  function showCard(message, lixiMessage, hasQR) {
    closeCurrentCard();

    card.style.display = 'flex';
    messageElement.style.display = 'block';
    messageElement.textContent = message;

    if (hasQR) {
      messageElement.textContent = lixiMessage;
      imageElement.style.display = 'block';
      imageElement.src = filePathQR;
      return;
    }
  }

  lixiItems.forEach((lixi) => {
    lixi.addEventListener('click', function () {
      if (availableMessages.length > 0) {
        const message = getRandomPosition(availableMessages);
        const hasQR = showQR ? Math.random() < 0.1 : false; // 1% chance for QR
        if (hasQR) {
          const lixiMessage = getRandomPosition(availableLixiMessages);
          showCard(message, lixiMessage, hasQR);
        } else {
          showCard(message, null, hasQR);
        }

        // Disable clicked li xi
        this.style.opacity = '0.5';
        this.style.pointerEvents = 'none';
      }
    });
  });

  document.addEventListener('click', function (event) {
    if (!card.contains(event.target) && !event.target.closest('.lixi')) {
      closeCurrentCard();
    }
  });

}
// Danh sách các file nhạc (thay thế tên file bằng file thực tế trong folder nhactet)
const musicFolder = "./assets/nhactet/";
const playlist = [
  "1+Thinh_Vuong_Viet_Nam_Sang_Ngoi.mp3",
  "2+Tet_Nay_Con_Se_Ve.mp3",
  "3+Tet_Nay_Con_Se_Ve.mp3",
  "4+Tet_Dinh_Noc.mp3",
  "5+Tet_Vo_Ve.mp3",
  "6+Tet_Oi_Tet_A.mp3",
  "7+Tet_Dong_Day.mp3",
  "8+Nam_Qua_Da_Lam_Gi.mp3",
  "9+Tet_Ve_Di_Con.mp3",
  "10+Tet_Nha_Minh.mp3",
  "11+Tet_Nay_De_Con_Lo.mp3",

];

// Các biến
let currentTrackIndex = 0;
const bgMusic = document.getElementById("bgMusic");
const nowPlaying = document.getElementById("nowPlaying");

bgMusic.play().catch((error) => {
  console.warn("Autoplay bị chặn bởi trình duyệt:", error);
  // Thông báo yêu cầu người dùng tương tác
  const message = document.createElement("div");
  message.innerText = "Nhấp vào màn hình để bắt đầu nhạc 🎵";
  message.style.position = "absolute";
  message.style.top = "50%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.padding = "20px";
  message.style.background = "rgba(0, 0, 0, 0.8)";
  message.style.color = "white";
  message.style.borderRadius = "8px";
  message.style.cursor = "pointer";
  document.body.appendChild(message);

  // Xử lý sự kiện click
  message.addEventListener("click", () => {
    bgMusic.play();
    message.remove(); // Xóa thông báo sau khi phát
  });
});

// Phát bài hát hiện tại
function loadTrack(index) {
  const trackName = playlist[index];
  bgMusic.src = musicFolder + trackName;
  nowPlaying.textContent = `Đang phát: ${trackName}`;
  bgMusic.play().catch((error) => {
    console.warn("Autoplay bị chặn bởi trình duyệt:", error);
  });
}

// Tự động chuyển bài khi kết thúc
bgMusic.addEventListener("ended", () => {
  currentTrackIndex = Math.floor(Math.random() * playlist.length); // Chọn bài ngẫu nhiên
  loadTrack(currentTrackIndex);
});

// Phát nhạc ngay lập tức khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  currentTrackIndex = Math.floor(Math.random() * playlist.length); // Chọn bài ngẫu nhiên
  loadTrack(currentTrackIndex);
});


handleClickLixi();

