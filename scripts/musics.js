function $(id) { return document.getElementById(id); };
const media = $('audio');

let ui = {
  play: 'playAudio',
  audio: 'audio',
  percentage: 'percentage',
  seekObj: 'seekObj',
  currentTime: 'currentTime'
};

media.volume = 0.03;

function togglePlay() {
  if (media.paused === false) {
    media.pause();
    $(ui.play).classList.add('pause');
  } else {
    media.play();
    $(ui.play).classList.remove('pause');
  }
}



function calculatePercentPlayed() {
  let percentage = (media.currentTime / media.duration).toFixed(2) * 100;
  $(ui.percentage).style.width = `${percentage}%`;
}

function calculateCurrentValue(currentTime) {
  const currentMinute = parseInt(currentTime / 60) % 60;
  const currentSecondsLong = currentTime % 60;
  const currentSeconds = currentSecondsLong.toFixed();
  const currentTimeFormatted = `${currentMinute < 10 ? `0${currentMinute}` : currentMinute}:${
  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
  }`;
  
  return currentTimeFormatted;
}

function initProgressBar() {
  const currentTime = calculateCurrentValue(media.currentTime);
  $(ui.currentTime).innerHTML = currentTime;
  $(ui.seekObj).addEventListener('click', seek);

  media.onended = () => {
    $(ui.play).classList.remove('pause');
    $(ui.percentage).style.width = 0;
    $(ui.currentTime).innerHTML = '00:00';
  };

  function seek(e) {
    const percent = e.offsetX / this.offsetWidth;
    media.currentTime = percent * media.duration;
  }
  
  calculatePercentPlayed();
}

$(ui.play).addEventListener('click', togglePlay)
$(ui.audio).addEventListener('timeupdate', initProgressBar);