const server = require('http').createServer();
const io = require('socket.io')(server);

const notificationMiddleware = (req, res, next) => {
  // Emit a notification event to all connected clients
  const notification = {
    message: 'New notification',
    data: req.body, // or any relevant data from the request
  };
  io.emit('newNotification', notification);
  next();
};

module.exports = {
  io,
  notificationMiddleware,
};
