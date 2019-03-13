const { Router } = require('express')
const Todo = require('./model')
const Project = require('../projects/model')

const router = new Router()

router.get('/todos', (req, res, next) => {
  const limit = req.query.limit || 25
  const offset = req.query.offset || 0

  Promise.all([
    Todo.count(),
    Todo.findAll({ limit, offset })
  ])
    .then(([total, todos]) => {
      res.send({
        todos, total
      })
    })
    .catch(error => next(error))
})

router.get('/todos/:id', (req, res, next) => {
    Todo
    .findById(req.params.id, { include: [Project] })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `Todo does not exist`
        })
      }
      return res.send(todo)
    })
    .catch(error => next(error))
})

router.post('/todos', (req, res, next) => {
    Todo
    .create(req.body)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `Todo does not exist`
        })
      }
      return res.status(201).send(todo)
    })
    .catch(error => next(error))
})

router.put('/todos/:id', (req, res, next) => {
    Todo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `Todo does not exist`
        })
      }
      return todo.update(req.body).then(todo => res.send(todo))
    })
    .catch(error => next(error))
})

router.delete('/todos/:id', (req, res, next) => {
    Todo
    .findById(req.params.id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          message: `Todo does not exist`
        })
      }
      return todo.destroy()
        .then(() => res.send({
          message: `Todo was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router