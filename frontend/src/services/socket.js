import io from 'socket.io-client';

const socket = io('http://localhost:4000');

export const joinRoom = (userId) => {
  socket.emit('join', userId);
};

export const sendMessage = (senderId, receiverId, message) => {
  socket.emit('sendMessage', { senderId, receiverId, message });
};

export const onNewMessage = (callback) => {
  socket.on('newMessage', callback);
};

export const onNewNotification = (callback) => {
  socket.on('newNotification', callback);
};

export default socket;