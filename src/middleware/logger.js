const log = require('debug')('http');

module.exports = (req, res, next) => {
    log('%s %s', req.method, req.path);
    next();
}