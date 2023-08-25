import { Command } from 'commander'
import UserManager from '../../domain/managers/userManager.js'

const AddUserCommand = new Command('addUser')

AddUserCommand.version('0.0.1')
  .description('Add new user to database')
  .option('-e, --email <email>', 'User`s email')
  .option('-fn, --firstname <firstName>', 'User`s first name')
  .option('-ln, --lastname <lastName>', 'User`s last name')
  .option('-p, --password <password>', 'User`s password')
  .option('-a, --age <age>', 'User`s age')
  .option('-r, --role <role>', 'User\'s role [ "admin" | "user" ]', /^(admin|user)$/i)
  .action(async env => {
    const validRoles = ['admin', 'user']
    if (!validRoles.includes(env.role)) {
      console.error('Error: Invalid role. Valid roles are "admin" or "user".')
      process.exit(1)
    }
    try {
      const manager = new UserManager()
      const created = await manager.create({
        ...env
      })
      if (created) {
        console.log(`User ${created.firstname} created`)
      }
    } catch (error) {
      console.log(error.message)
    }
  })

export default AddUserCommand
