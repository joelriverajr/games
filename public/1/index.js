const socket = io();

socket.on('actualizarTemporizado1', function(segundos) {
    const temporizador = document.getElementById('temporizador');
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    temporizador.textContent = ` ${minutos}:${seg < 10 ? '0' : ''}${seg}`;
    
if (segundos==10 || segundos==20 ||segundos==30 ||segundos==40) {
    var div = document.getElementById("ganadores");
    div.classList.toggle("open");
}
});

socket.on('video1', function(data) {
    const player = document.getElementById('videoPlayer');
    player.src = data.video;
    player.play();

    var elemento = document.getElementById("videoPlayer");
    elemento.style.display = "block";
});

var video = document.getElementById("videoPlayer");
video.addEventListener('ended', function() {
  
    var elemento = document.getElementById("videoPlayer");
    elemento.style.display = "none";
});