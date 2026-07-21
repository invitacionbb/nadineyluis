const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.14,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const audioPlayButton = document.getElementById("audioPlayButton");
const audioText = document.querySelector(".audio-text");

function updateMusicButtons(isPlaying) {
  if (isPlaying) {
    musicButton.classList.add("is-playing");
    audioPlayButton.classList.add("is-playing");
    audioText.textContent = "Pausar música";
  } else {
    musicButton.classList.remove("is-playing");
    audioPlayButton.classList.remove("is-playing");
    audioText.textContent = "Reproducir música";
  }
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic
      .play()
      .then(() => {
        updateMusicButtons(true);
      })
      .catch(() => {
        updateMusicButtons(false);
      });
  } else {
    backgroundMusic.pause();
    updateMusicButtons(false);
  }
}

musicButton.addEventListener("click", toggleMusic);
audioPlayButton.addEventListener("click", toggleMusic);

const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.querySelectorAll(".gallery-dot");
const gallerySlides = document.querySelectorAll(".gallery-slide");

let currentSlide = 0;

function goToSlide(index) {
  currentSlide = index;
  galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

  galleryDots.forEach((dot) => {
    dot.classList.remove("is-active");
  });

  galleryDots[currentSlide].classList.add("is-active");
}

galleryDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

setInterval(() => {
  const nextSlide = (currentSlide + 1) % gallerySlides.length;
  goToSlide(nextSlide);
}, 4500);