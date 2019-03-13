const express = require('express')
const bodyParser = require('body-parser')
const projectsRouter = require('./projects/routes')
const todosRouter = require('./todos/routes')
const authRouter = require('./auth/routes')
const usersRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(projectsRouter)
  .use(todosRouter)
  .use(usersRouter)
  .use(authRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))

