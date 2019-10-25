
const WebSocket = require('ws'),
    WSConnection = require('./modules/ws-connection'),
    TCPConnection = require('./modules/tcp-connection');


const WS2TCP = function(tcp_port, tcp_host, ws_port, ws_host) {
    this._tcp_port = tcp_port || 50001;
    this._tcp_host = tcp_host || '127.0.0.1';

    this._ws = new WebSocket.Server({
        port: ws_port || 8080,
        host: ws_host || '127.0.0.1',
        verifyClient: (info, callback)=> {
            this._createTCPConnection(info.req, callback);
        }

    });

    console.log(`Listening ws://${this._ws.options.host}:${this._ws.options.port}`);
    console.log(`Connections to tcp://${this._tcp_host}:${this._tcp_port}`);

    this._ws.on('connection', (websocket_connection, req) => {
        let ws_connection = new WSConnection(websocket_connection, req.tcp_connection);
    });
};

WS2TCP.prototype._createTCPConnection = function(req, callback) {
    let tcp_connection = new TCPConnection();
    tcp_connection.on('connect', ()=>{
        callback(true);
    });

    tcp_connection.once('close', (error)=>{
        callback(false, 523, 'Origin Is Unreachable');
    });
    
    req.tcp_connection = tcp_connection;

    tcp_connection.connect(this._tcp_port, this._tcp_host);
}

module.exports = WS2TCP;