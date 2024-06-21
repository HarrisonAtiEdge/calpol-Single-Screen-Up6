

var backgroundAudio = new Audio('../sounds/backSong.mp3');
backgroundAudio.loop = true; // Loop the audio

// Function to play or pause the background audio
function toggleAudio() {
    var buttonIcon = document.getElementById('volumeUp');
    if (backgroundAudio.paused) {
        backgroundAudio.play();
        buttonIcon.classList.remove('fa-volume-xmark');
        buttonIcon.classList.add('fa-volume-up');
    } else {
        backgroundAudio.pause();
        buttonIcon.classList.remove('fa-volume-up');
        buttonIcon.classList.add('fa-volume-xmark');
    }
}

// // Event listener for button click to toggle audio
// document.getElementsByClassName('.soundright').addEventListener('click', toggleAudio);
