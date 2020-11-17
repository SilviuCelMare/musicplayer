const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artists');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
    
    {
        name:'fallin',
        displayName:"Fallin' (Alicia Keys cover)",
        artist:'Nicola Cavallaro'
    },
    {
        name:'hollywood',
        displayName:"Hollywood's Bleeding",
        artist:'Post Malone'
    },
    {
        name:'letmeloveyou',
        displayName:'Let Me Love You (Mario Cover)',
        artist:'Teddy Swims'
    },
    {
        name:'stay',
        displayName:'Stay',
        artist:'Post Malone'
    }

];


//Check if playing
let isPlaying = false;

//Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


//Update DOM
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src =`music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current song
let songIndex = 0;

//Prev SOng
function prevSong(){
    songIndex--;
    if(songIndex < 0) {
        songIndex= songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong()
}

//Next SOng
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong()
}


//On Load - select fisrt song
loadSong(songs[songIndex]);

//Play or Pause event listener
playBtn.addEventListener('click', () =>(isPlaying ? pauseSong() : playSong()));

//Update progress Bar & TIme
function updateProgressBar(e){
    if(isPlaying){
     const {duration, currentTime} = e.srcElement;
     console.log(duration, currentTime);
     //Update the progress bar
     const progressPercent = (currentTime/ duration) * 100;
     progress.style.width=`${progressPercent}%`;
     //Calculate display ofr duration
     const durationMinutes = Math.floor(duration/60);
     
     let durationSeconds = Math.floor(duration % 60);
     if(durationSeconds < 10){
         durationSeconds = `0${durationSeconds}`;
     }
     
     
     //Delay switching duration to avoid NaN
     if(durationSeconds){
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
     }
     //Calculate display for the current time
     const currentMinutes = Math.floor(currentTime/60);
    
     let currentSeconds = Math.floor(currentTime % 60);
     if(currentSeconds < 10){
         currentSeconds = `0${currentSeconds}`;
     }
     
     currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
     

    }
}

//Set progress bar
function setProgressBar(e){
console.log(e);
const width = this.clientWidth;
console.log('width', width)
const clickX = e.offsetX;
console.log('clickX', clickX);
const {duration} = music;
music.currentTime = (clickX/ width) * duration;

}

// EVent listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
