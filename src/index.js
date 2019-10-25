const WS2TCP = require('./ws2tcp');


let args = process.argv.slice(2);

let tcpPortIndex = args.indexOf('-tp');
let tcpPort = tcpPortIndex > -1 && args[tcpPortIndex+1] ? args[tcpPortIndex+1] : 50001;

let tcpHostIndex = args.indexOf('-th');
let tcpHost = tcpHostIndex > -1 && args[tcpHostIndex+1] ? args[tcpHostIndex+1] : '127.0.0.1';

let wsPortIndex = args.indexOf('-wp');
let wsPort = wsPortIndex>-1 && args[wsPortIndex+1] ? parseInt(args[wsPortIndex+1]) : 8080;

let wsHostIndex = args.indexOf('-wh');
let wsHost = wsHostIndex > -1 && args[wsHostIndex+1] ? args[wsHostIndex+1] : '127.0.0.1';

const ws2tcp = new WS2TCP(tcpPort, tcpHost, wsPort, wsHost);