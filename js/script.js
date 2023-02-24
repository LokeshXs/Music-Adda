const songPlaying = document.querySelector('.song-playing');
let hoverAction = document.querySelector('.hover-action');
let likeIcon = document.querySelector('.like-icon');
let tooltiptext = document.querySelector(".tooltiptext");
let progressBar = document.querySelector('.progress-bar');
let music = document.querySelector('#music');
let playPauseIcon = document.querySelector('.play-icon');
let repeatBtn = document.querySelector('.repeat');
let controlIcon = document.querySelectorAll('.control-icon');
let decreasingTime = document.querySelector('.decreasing-time');
let increasingTime = document.querySelector('.increasing-time');
let volumeControl = document.querySelector('#volume-control');
let volumeIcon = document.querySelector('.volume-icon');
let timer = "";



let timeDuration = 0;
let sec = "";
let min = "";

let remainingTime = 0;
let secInc = "";
let minInc = "";

// Converting NodeList to Array
controlIcon = Array.from(controlIcon);

// To check if song metadata is loaded, as loadedmetadata event usually missed by firefox
console.log("Music ready state:", music.readyState);

if (music.readyState > 1) {
  progressBar.value = 0;

  progressBar.max = Math.floor(music.duration);
  music.volume = 0.5;

}

console.log(progressBar.max);
console.log(music.duration);
console.log(progressBar.value);



// Displaying the open player on hover

songPlaying.addEventListener('mouseover', function () {
  hoverAction.classList.add('hover-action-visible');
});

songPlaying.addEventListener('mouseout', function () {
  hoverAction.classList.remove('hover-action-visible');
});


// On clicking the like icon

likeIcon.addEventListener('click', function (e) {
  likeIcon.classList.toggle("like-icon-active")
});

console.log(document.querySelector(".tooltiptext"));

//Change tooltip text based on whether it is added to library or not

likeIcon.addEventListener('mouseover', function () {
  likeIcon.classList.contains("like-icon-active") ?
    tooltiptext.textContent = "Remove from library" :
    tooltiptext.textContent = "Add to your library";
}
);



// ***************************************
// Making progress bar work
// ***************************************


console.log(controlIcon);

const changeToolTip = function (tooltipName, iconClassName) {
  controlIcon.find(function(icon) {
    return icon.classList.contains(iconClassName);
  }).closest('.tooltip').querySelector('span').textContent = tooltipName;
};

const playSong = function () {
  music.play();
  playPauseIcon.name = "pause";
  changeToolTip('Pause', 'play-icon');

};
const pauseSong = function () {
  music.pause();
  playPauseIcon.name = "play";
  changeToolTip('Play', 'play-icon');


};


playPauseIcon.addEventListener('click', function (e) {
  if (music.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

music.addEventListener('timeupdate', function () {
  progressBar.value = Math.floor(music.currentTime);


  // Song time elapsed functionality
  minInc = String(Math.floor(progressBar.value / 60)).padStart(2, 0);
  secInc = String(progressBar.value % 60).padStart(2, 0);
  increasingTime.textContent = `${minInc}:${secInc}`;


  min = String(Math.floor((progressBar.max - progressBar.value) / 60)).padStart(2, '0');
  sec = String((progressBar.max - progressBar.value) % 60).padStart(2, '0');
  decreasingTime.textContent = `${min}:${sec}`;

  if (music.ended) {
    pauseSong();
  }
});

progressBar.addEventListener('change', function () {
  music.currentTime = progressBar.value;

  // Updating time on changing the progress bar
  decreasingTime.textContent = `${min}:${sec}`;
  increasingTime.textContent = `${minInc}:${secInc}`;


});



// Looping Functionality
const loopSong = function () {
  repeatBtn.classList.toggle('control-icon-active');

  music.loop = !music.loop;

  if (music.loop) {
    changeToolTip('Disable Repeat', 'repeat');
  } else {
    changeToolTip('Enable Repeat', 'repeat');
  }

};

repeatBtn.addEventListener('click', loopSong);


// ***************************************
// Volume functionality
// ***************************************
volumeControl.addEventListener('input', () => {
  music.volume = volumeControl.value;
  if(music.volume === 0){
    volumeIcon.name = "volume-mute";
    changeToolTip('Unmute','volume-icon') 
  }else{
    volumeIcon.name = "volume-high";
    changeToolTip('Mute','volume-icon')
  }
});

volumeIcon.addEventListener('click', () => {
  if(document.documentElement.clientWidth>528){
  if (music.volume === 0.0) {
    volumeIcon.name = "volume-high";
    music.volume = 0.5;
    volumeControl.value = 0.5;
    changeToolTip('Mute','volume-icon')
  } else {
    volumeIcon.name = "volume-mute";
    music.volume = 0.0;
    volumeControl.value = 0.0;
    changeToolTip('Unmute','volume-icon')
  }
}

else{
  volumeControl.classList.toggle('visible-opacity');
}
});

