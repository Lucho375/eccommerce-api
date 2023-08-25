import { program } from 'commander'
import AddUserCommand from './presentation/commands/addUser.js'
import config from './config/index.js'
import { DbFactory } from './data/factories/index.js'
import logger from './pino.js'
;(async () => {
  let db
  try {
    db = DbFactory.create()
    await db.init(config.DB_URI)
    program.addCommand(AddUserCommand)
    await program.parseAsync(process.argv)
  } catch (error) {
    logger.error(error)
  } finally {
    await db.close()
    process.exit()
  }
})()
