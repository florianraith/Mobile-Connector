const path               = require('path');
const express            = require('express');
const http               = require('http');
const cookieParserModule = require('cookie-parser');
const bodyParser         = require('body-parser');
const sessionModule      = require('express-session');
const csrf               = require('csurf');
const morgan             = require('morgan');
const router             = require('./routes');
const middleware         = require('./middleware');
const socket             = require('./socket');


const app          = express();
const cookieParser = cookieParserModule();
const session      = sessionModule({ secret: 'super-duper-secrect-key', resave: false, saveUninitialized: true });


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
const server = http.Server(app);


// handle sockets
socket(server, cookieParser, session);

module.exports = server;