const Sequelize = require('sequelize')
const sequelize = require('../db')

const Project = sequelize.define('projects', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  manager: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'projects'
})

module.exports = Project