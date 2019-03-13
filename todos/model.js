const Sequelize = require('sequelize')
const sequelize = require('../db')
const Project = require('../projects/model')

const Todo = sequelize.define('todos', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  priority: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        isIn: {
            args: [['supercritical', 'high', 'medium', 'low', 'not important']],
            msg: "Priority should be 'supercritical', 'high', 'medium', 'low' or 'not important'"
        }
    }
  },
  dueDate: {
    type: Sequelize.STRING,
    field: 'due_date',
    validate: {
        isDate: {
            args: true,
            msg: "Please, add correct due date"
        }
    }
  },
  projectId: {
    type: Sequelize.INTEGER,
    field: 'project_id'
  }
}, {
  timestamps: false,
  tableName: 'todos'
})

Todo.belongsTo(Project)

module.exports = Todo