import { program } from 'commander'

import AddUserCommand from './presentation/commands/addUser/addUser.js'
import config from './config/index.js'
import DbFactory from './data/factories/dbFactory.js'
;(async () => {
  try {
    const db = DbFactory.create()
    await db.init(config.MONGO_DB_URI)

    program.addCommand(AddUserCommand)
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
})()
