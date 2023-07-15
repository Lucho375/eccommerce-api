import { Command } from 'commander'
import inquirer from 'inquirer'

import { addUserQuestions } from './questions.js'
import UserManager from '../../../domain/managers/userManager.js'

const AddUserCommand = new Command('addUser')

AddUserCommand.description('Add new user to database').action(async () => {
  const manager = new UserManager()
  const newUser = await inquirer.prompt(addUserQuestions)
  const created = await manager.create(newUser)
  if (created) {
    console.log(`User ${created.firstname} created`)
  }
})

export default AddUserCommand
