const server = require('./src/server');

// run server
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`listening on port: ${port}`));
