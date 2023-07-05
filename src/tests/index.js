import AppFactory from '../presentation/factories/appFactory'
import DbFactory from '../data/factories/dbFactory'

const TestServer = async () => {
  const db = DbFactory.create()
  const app = AppFactory.create()
  app.init()
  app.build()
  return {
    db,
    app
  }
}

export default TestServer
