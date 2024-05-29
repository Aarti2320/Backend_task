const io = require('socket.io')(3001);

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('bid', (data) => {
        io.emit('update', data);
    });

    socket.on('notify', (data) => {
        io.emit('notification', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

exports.notifyNewBid = (itemId, bidAmount) => {
    io.emit('update', { itemId, bidAmount });
};
