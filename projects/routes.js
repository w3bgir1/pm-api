const { Router } = require('express')
const Project = require('./model')
const Todo = require('../todos/model')

const router = new Router()

router.get('/projects', (req, res, next) => {
  const limit = req.query.limit || 5
  const offset = req.query.offset || 0

  Promise.all([
    Project.count(),
    Project.findAll({ limit, offset })
  ])
    .then(([total, projects]) => {
      res.send({
        projects, total
      })
    })
    .catch(error => next(error))
})

router.get('/projects/:id', (req, res, next) => {
  Promise.all([
    Project.findById(req.params.id),
    Todo.findAll({
      where: {
        projectId: req.params.id
      }
    })
  ])
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return res.send({project: project})
    })
    .catch(error => next(error))
})

router.post('/projects', (req, res, next) => {
    Project
    .create(req.body)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return res.status(201).send(project)
    })
    .catch(error => next(error))
})


router.delete('/projects/:id', (req, res, next) => {
    Project
    .findById(req.params.id)
    .then(project => {
      if (!project) {
        return res.status(404).send({
          message: `Project does not exist`
        })
      }
      return project.destroy()
        .then(() => res.send({
          message: `Project was deleted`
        }))
    })
    .catch(error => next(error))
})

module.exports = router