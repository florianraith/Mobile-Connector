const namePool = ['Freddie', 'Damon', 'Tamara', 'Mitchell', 'Albert', 'Shane', 'Simon'];

module.exports = (req, res, next) => {
    if(!('userName' in req.session) || req.session.userName === '') {

        const randomName = namePool[Math.floor(Math.random() * namePool.length)];
        const randomDigits = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const userName =  randomName + randomDigits; 
        req.session.userName = userName;

    }
    
    next();
};