

const WSConnection = function(websocket, tcp_connection) {
    this._ws_connection = websocket;
    this._tcp_connection = tcp_connection;

    this._init();
}

WSConnection.prototype._init = function(tcp_port, tcp_host) {
    
    this._tcp_connection.on('data', (buffer)=>{
        this._ws_connection.send(buffer);
    });

    this._tcp_connection.on('close', (error_code)=>{
        if (!error_code) {
            this._ws_connection.close(1000);
            return;
        }

        this._ws_connection.close(4000, error_code);
    });

    this._ws_connection.on('message', (buffer) => {
        this.emit.send(buffer);
    });

    this._ws_connection.on('close', () => {
        this._tcp_connection.close();
    });
}

module.exports = WSConnection;