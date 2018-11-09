const server = require('./server/server.js')

const port = process.env.PORT || 9001 // IT'S OVER 9000!!!!

server.listen(port, () => console.log('SERVER RUNNING'))
