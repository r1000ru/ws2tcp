const net = require('net'),
    Events = require('events');

const TCPConnection = function() {
    this._socket = new net.Socket();
    this._init();
}

TCPConnection.prototype.__proto__ = Events.prototype;

TCPConnection.prototype._init = function() {
    this._socket.on('connect', ()=>{
        this.emit('connect');
    });
    
    this._socket.on('data', (buffer) => {
        this.emit('data', buffer);
    });

    this._socket.on('close', (err) => {
        if (err) {
            return;
        }
        this.emit('close');
    });

    this._socket.on('error', (err) => {
        this.emit('close', err.code);
    });
}

TCPConnection.prototype.connect = function(port, hostname) {
    try {
        this._socket.connect(port, hostname);
    } catch(err) {

        console.log(err);
    }
}

TCPConnection.prototype.close = function() {
    this._socket.end();
}

TCPConnection.prototype.send = function(buffer) {
    this._socket.write(buffer);
}

module.exports = TCPConnection;