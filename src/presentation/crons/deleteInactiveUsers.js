import logger from '../../pino.js'
import { UserManager } from '../../domain/index.js'

export async function deleteInactiveUsers() {
  try {
    const manager = new UserManager()
    const inactiveUsers = await manager.deleteInactive()
    logger.info(`Deleted ${inactiveUsers} inactive users in past 30 days`)
  } catch (error) {
    logger.error(`Delete inactive users error : ${error.message}`)
  }
}
