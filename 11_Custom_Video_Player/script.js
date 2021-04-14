
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const play = document.querySelector('.toggle');
const skips = document.querySelectorAll('[data-skip]');
const volume = document.querySelector('[name="volume"]');
const playbackRate = document.querySelector('[name="playbackRate"]');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const fullscrenBtn = document.querySelector('.fullscren');



video.addEventListener('click', playHandle);
video.addEventListener('timeupdate', progressUpdate);
play.addEventListener('click', playHandle);
skips.forEach(button => button.addEventListener('click', skipHandle));
volume.addEventListener('input', handleVolume);
playbackRate.addEventListener('input', handleRate);
progress.addEventListener('click', progressHandle);
progress.addEventListener('mousemove', (e)=> mousedown && progressHandle(e));
fullscrenBtn.addEventListener('click', fullscrenHandle);

let mousedown = false;
progress.addEventListener('mousedown', ()=>mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown=false);

let fullscren = false;
function fullscrenHandle(){
  if(fullscren){
    document.exitFullscreen();
    fullscren = false;
  } else {
    player.requestFullscreen();
    fullscren = true;
  }
}

function progressHandle(e){
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
}

function progressUpdate(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function playHandle(){
  if(video.paused){
    video.play();
    play.innerHTML = "| |"
  } else {
    video.pause();
    play.innerHTML= '▶';
  }
} 

function skipHandle(){
  video.currentTime += +this.dataset.skip;
}

function handleVolume(){
  video.volume = this.value;
}

function handleRate(){
  video.playbackRate = this.value;
}