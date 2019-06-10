import path from 'path';
import express from 'express';
import http from 'http';
import https from 'https';
import cookieParserModule from 'cookie-parser';
import bodyParser from 'body-parser';
import sessionModule from 'express-session';
import csrf from 'csurf';
import router from './routes';
import middleware from './middleware';
import socket from './socket';
import config from '../config';

const app = express();
const session = sessionModule({ secret: 'super-duper-secrect-key', resave: false, saveUninitialized: true });
const cookieParser = cookieParserModule();

// setup view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));
app.locals.pretty = true;

// register middleware
app.use('/assets', express.static(path.join(__dirname, '..', 'public')));
app.use(cookieParser);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session);
app.use(csrf({ cookie: true }));
app.use(middleware.logger);
app.use(middleware.userName);
app.use(middleware.isMobile);

// register routes
app.use('/', router);

// register middleware after routing
app.use(middleware.catch404);
app.use(middleware.errorHandler);

// create http server
const server = config.https ? https.createServer(config.httpsOptions, app) : http.createServer(app);

// handle sockets
socket(server, cookieParser, session);

module.exports = server;