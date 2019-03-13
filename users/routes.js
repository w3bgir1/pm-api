const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()


router.post('/users', (req, res) => {
    if (req.body.password.length > 5) {
        User
    .create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: `User does not exist`
        })
      }
      return res.status(201).send(user)
    })
    .catch(error => res.status(400).send({
        message: error.message
      }))
    } else {
        return res.status(400).send({
            message: 'Please supply a valid password'
            })
    }
    
  
})


module.exports = router