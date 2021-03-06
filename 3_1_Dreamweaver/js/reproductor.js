var holding = false;
var play = document.getElementById('reproducir');
var next = document.getElementById('siguiente');
var prev = document.getElementById('anterior');
var title = document.getElementById('titulo-reproductor');
var artist = document.getElementById('artista-reproductor');
var art = document.getElementById('caratula-reproductor');
var current_track = 0;
var song, audio, duration;
var playing = false;

var songs = [{
    title: 'About a Voyage',
    artist: 'Sayuri',
    url: 'audio/About_a_Voyage.mp3',
    art: 'images/About a Voyage.png'
},
    
{
    title: 'Blood Circulator',
    artist: 'ASIAN KUNG-FU GENERATION',
    url: 'audio/Blood_Circulator.mp3',
    art: 'images/Blood Circulator.png'
},

{
    title: 'Chlorine',
    artist: 'Twenty One Pilots',
    url: 'audio/Chlorine.mp3',
    art: 'images/Chlorine.png'
},

{
    title: 'Freeze Me',
    artist: 'Death From Above 1979',
    url: 'audio/Freeze_Me.mp3',
    art: 'images/Freeze Me.png'
},

{
    title: 'Green River',
    artist: 'Creedence Clearwater Revival',
    url: 'audio/Green_River.mp3',
    art: 'images/Green River.png'
},
{
    title: 'We Are The Champions',
    artist: 'Queen',
    url: 'audio/We_Are_The_Champions.mp3',
    art: 'images/We Are The Champions.png'
}];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
}

audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.setAttribute("src", "images/play.png");
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.setAttribute("src", "images/pausa.png");
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);


function seekTrack(e) {
    event = e || window.event;
    audio.play();
}
function nextTrack() {
    current_track++;
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function prevTrack() {
    current_track--;
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function() {
        audio.play();
    }
}

function reproducir(num_cancion) {
    current_track = num_cancion;
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function() {
      updateInfo();
    }
}