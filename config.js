const fs = require('fs');

module.exports =  {
    https: true,
    httpsOptions: {
        key: fs.readFileSync('./cert/server.key', 'utf-8'),
        cert: fs.readFileSync('./cert/server.crt', 'utf-8'),
    },
}
