import { MongooseAdapter } from './index.js'

export class DbFactory {
  static create(dbType = 'MongooseAdapter') {
    const dbs = new Map()
    dbs.set('MongooseAdapter', MongooseAdapter)

    if (!dbs.has(dbType)) {
      throw Error('DbAdapter not found')
    }

    const Db = dbs.get(dbType)
    return new Db()
  }
}
