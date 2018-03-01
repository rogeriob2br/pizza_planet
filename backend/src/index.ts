import * as http from 'http';
import * as debug from 'debug';
import { mongoConfig } from './config';
import App from './app';
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);

const mongoUri = 'mongodb://' +
  mongoConfig.user + (mongoConfig.pass ? ':' + mongoConfig.pass : '') +
  '@' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.db +
  (mongoConfig.authMechanism ? '?authMechanism=' + mongoConfig.authMechanism : '');
const mongoOptions = {
  useMongoClient: true
};
mongoose.connect(mongoUri, mongoOptions)
.then(() => {
  console.log('Succesfully connected with MongoDB.');
  server.listen(port, () => {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  });
})
.catch((err) => {
  console.log('Not able to connect with MongoDB:', err)
});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val:number|string):number|string|boolean {
    let port:number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

function onError(error:NodeJS.ErrnoException):void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening():void {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
