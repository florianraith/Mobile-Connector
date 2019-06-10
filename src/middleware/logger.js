import Debug from 'debug';
const log = Debug('http');

export default (req, res, next) => {
    log('%s %s', req.method, req.path);
    next();
}