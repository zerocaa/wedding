const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
const io = require('socket.io')(server, { maxHttpBufferSize: 1e8 }).listen(
  server
);

io.on('connection', socket => {
  console.log('new connection', socket.id);
  socket.on('message', msg => {
    socket.broadcast.emit('message', msg);
  });
  socket.on('file-message', msg => {
    socket.broadcast.emit('file-message', msg);
  });
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
