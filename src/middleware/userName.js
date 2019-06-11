import { logger } from '../logger';

const namePool = ['Freddie', 'Damon', 'Tamara', 'Mitchell', 'Albert', 'Shane', 'Simon'];

export default (req, res, next) => {
    if(!('userName' in req.session) || req.session.userName === '') {
        
        const randomName = namePool[Math.floor(Math.random() * namePool.length)];
        const randomDigits = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const userName =  randomName + randomDigits; 
        req.session.userName = userName;

        if('oldUserName' in req.session) {
            logger.info('user %o changed name to %o', req.session.oldUserName, req.session.userName);
        } else {
            logger.info('new user %o', req.session.userName);
        }

    }
    
    next();
};