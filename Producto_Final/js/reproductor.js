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
    title: 'Escoge una canción de la lista',
    artist: 'Unknown',
    url: '../music/SF.m4a',
    art: '../music/caratulas/unknown.jpg'
},
    
{
    title: 'Level of Concern',
    artist: 'Twenty One Pilots',
    url: '../music/LOC.m4a',
    art: '../music/caratulas/LOC.jpg'
},
    
{
    title: 'King Of The Jungle',
    artist: 'Shanguy',
    url: '../music/KOTJ.m4a',
    art: '../music/caratulas/KOTJ.jpg'
},

{
    title: 'Dont Go Breaking My Heart',
    artist: 'Elton John',
    url: '../music/DGBMH.m4a',
    art: '../music/caratulas/DGBMH.jpg'
},

{
    title: 'Last Resort',
    artist: 'Papa Roach',
    url: '../music/LR.m4a',
    art: '../music/caratulas/LR.jpg'
},

{
    title: 'Night Fever',
    artist: 'Bee Gees',
    url: '../music/NF.m4a',
    art: '../music/caratulas/NF.jpg'
},

{
    title: 'Silicon Valley',
    artist: 'Abhi the Nomad',
    url: '../music/SV.m4a',
    art: '../music/caratulas/SV.jpg'
}
];

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
    play.setAttribute("src", "../img/play.png");
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.setAttribute("src", "../img/pausa.png");
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
    if (current_track === 0) {
        current_track = (songs.length - 1);
        
    }
    console.log(current_track);
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
    document.getElementById("caratula-reproductor").style.filter = "grayscale(0)";
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