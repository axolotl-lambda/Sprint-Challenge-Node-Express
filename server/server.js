const express = require('express')

const configureMiddleware = require('./config/middleware.js')
const projectsRouter = require('./routes/projectsRouter.js')
const actionsRouter = require('./routes/actionsRouter.js')

const server = express()

configureMiddleware(server)

// configure routes
server.use('/projects', projectsRouter)
server.use('/actions', actionsRouter)

// verification server is live
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' })
})

// export server
module.exports = server
