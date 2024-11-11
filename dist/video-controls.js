"use strict";
const video = document.querySelector('video');
const button = document.getElementById('play-pause');
function togglePlayPause() {
    if (video === null || video === void 0 ? void 0 : video.paused) {
        button.className = 'pause';
        video.play();
    }
    else {
        button.className = 'play';
        video === null || video === void 0 ? void 0 : video.pause();
    }
}
video === null || video === void 0 ? void 0 : video.addEventListener('timeupdate', function () {
    if (video === null || video === void 0 ? void 0 : video.ended) {
        button.className = 'play';
    }
});
button.onclick = togglePlayPause;
