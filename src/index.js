import DbFactory from './data/factories/dbFactory.js'
import AppFactory from './presentation/factories/appFactory.js'
import config from './config/index.js'

const db = DbFactory.create()
db.init(config.MONGO_DB_URI)
const app = AppFactory.create()
app.init()
app.build()
app.listen()
