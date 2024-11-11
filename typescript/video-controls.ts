const video: HTMLVideoElement | null = document.querySelector('video');
const button = document.getElementById('play-pause') as HTMLButtonElement;

function togglePlayPause(): void {
    if (video?.paused) {
        button.className = 'pause';
        video.play();
    } else {
        button.className = 'play';
        video?.pause();
    }
}

video?.addEventListener('timeupdate', function(){
    if(video?.ended){
        button.className = 'play';
    }
})

button.onclick = togglePlayPause;
