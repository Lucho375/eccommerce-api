export const addUserQuestions = [
  {
    type: 'input',
    name: 'email',
    message: 'Enter user email:'
  },
  {
    type: 'input',
    name: 'firstname',
    message: 'Enter user firstname:'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Enter user lastname:'
  },
  {
    type: 'password',
    name: 'password',
    message: 'Enter user password:',
    mask: '*'
  },
  {
    type: 'number',
    name: 'age',
    message: 'Enter user age:',
    default: 18
  },
  {
    type: 'list',
    name: 'role',
    message: 'Enter user role:',
    choices: ['admin', 'user']
  }
]
