var fs = require('fs');

module.exports = {
    https: process.env.NODE_ENV !== 'production',
    httpsOptions: {
        key: fs.readFileSync('./cert/server.key', 'utf-8'),
        cert: fs.readFileSync('./cert/server.crt', 'utf-8'),
    },
}