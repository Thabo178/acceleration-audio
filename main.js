const audioPlayer = document.getElementById("audioPlayer");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progress");
const customProgressBar = document.getElementById("custom-progress-bar");
const albumArt = document.getElementById("albumArt");

const baseURL = "/songs";

let currentTrack = 0;

const songs = [
  { file: "Aidan.mp3", albumArt: "albumart/Aidan.jpg" },
  { file: "autumn_sun.mp3", albumArt: "albumart/autumn_sun.png" },
  { file: "best_part_of_me.mp3", albumArt: "albumart/BestPart.jpg" },
  { file: "Better Days - LAKEY INSPIRED.mp3", albumArt: "albumart/Better Days.jpg" },
  { file: "i_cant_make_you_love_me_cover.mp3", albumArt: "albumart/i_cant_make_you_love_me_cover.jpeg" },
  { file: "just_relax.mp3", albumArt: "albumart/justRelax_img.jpeg" },
  { file: "paranormal-is-real-leonell-cassio.mp3", albumArt: "albumart/paranormal_real_500.jpg" },
  { file: "Polarity.mp3", albumArt: "albumart/Polarity.jpg" }
];



function loadTrack(index) {
  currentTrack = index;
  audioPlayer.src = `${baseURL}/${songs[currentTrack].file}`;
  albumArt.src = songs[currentTrack].albumArt;
  audioPlayer.load();
  audioPlayer.play();
}

playButton.addEventListener("click", () => {
  if (audioPlayer.src) {
    // Resume if already loaded
    audioPlayer.play();
  } else {
    // Only load if nothing is loaded yet
    loadTrack(currentTrack);
  }
});

pauseButton.addEventListener("click", () => {
  audioPlayer.pause();
});

prevButton.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + songs.length) % songs.length;
  loadTrack(currentTrack);
});

nextButton.addEventListener("click", () => {
  currentTrack = (currentTrack + 1 + songs.length) % songs.length;
  loadTrack(currentTrack);
});

audioPlayer.addEventListener("timeupdate", () => {
  progressBar.value = audioPlayer.currentTime / audioPlayer.duration;
  customProgressBar.style.width = `${
    (audioPlayer.currentTime / audioPlayer.duration) * 100
  }%`;

  console.log(`${audioPlayer.currentTime} / ${audioPlayer.duration}`);

  audioPlayer.playbackRate += 0.01;
});

document.getElementById("custom-progress").addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  audioPlayer.currentTime = percentage * audioPlayer.duration;
});


document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {   
    case " ":
      event.preventDefault();
      audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
      break;

    case "m":
      audioPlayer.muted = !audioPlayer.muted;
      break;
  }
});

