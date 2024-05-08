const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos
app.use(express.static('public'));
app.get('', (req, res) => {
  res.sendFile(__dirname + '/public/punto/index.html');
});
app.get('/1', (req, res) => {
    res.sendFile(__dirname + '/public/1/index.html');
});
app.get('/2', (req, res) => {
  res.sendFile(__dirname + '/public/2/index.html');
});
app.get('/3', (req, res) => {
  res.sendFile(__dirname + '/public/3/index.html');
});
app.get('/4', (req, res) => {
  res.sendFile(__dirname + '/public/4/index.html');
});
// Iniciar el temporizador cuando el primer cliente se conecte
let temporizadorIniciado = false;

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado : '+socket.id);

  if (!temporizadorIniciado) {
    iniciarTemporizador();
    temporizadorIniciado = true;
  }
});

function iniciarTemporizador() {
    let timers = [40,45,46,60]; // 5 minutos en segundos


    const intervalId = setInterval(() => {
      timers[0]--;
      timers[1]--;
      timers[2]--;
      timers[3]--;
      // Emitir el tiempo restante a todos los clientes
      io.emit('actualizarTemporizado1', timers[0]);
      io.emit('actualizarTemporizado2', timers[1]);
      io.emit('actualizarTemporizado3', timers[2]);
      io.emit('actualizarTemporizado4', timers[3]);
      //io.emit('texto','joelrivea');
      
      if (timers[0] <= 0) {
        timers[0] = 60; // Reiniciar el temporizador
        const videoRandom = Math.ceil(Math.random() * 5);
        io.emit('video1', { video: `video/${videoRandom}.webm` });
        console.log(`${videoRandom}.webm`);
      }
      
      if (timers[1] <= 0) {
        timers[1] = 45; // Reiniciar el temporizador
        const videoRandom = Math.ceil(Math.random() * 3);
        io.emit('video2', { video: `${videoRandom}.mp4` });
        console.log(`${videoRandom}.webm`);
      }


      if (timers[2] <= 0) {
        timers[2] = 46; // Reiniciar el temporizador
        const videoRandom = Math.ceil(Math.random() * 3);
        io.emit('video3', { video: `${videoRandom}.mp4` });
        console.log(`${videoRandom}.webm`);
      }

      if (timers[3] <= 0) {
        timers[3] = 60; // Reiniciar el temporizador
        const videoRandom = Math.ceil(Math.random() * 3);
        io.emit('video4', { video: `${videoRandom}.mp4` });
        console.log(`${videoRandom}.webm`);
      }




    }, 1000); // Actualizar cada segundo
  }
  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
