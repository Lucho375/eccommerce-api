import AppExpress from '../app/appExpress.js'

export class AppFactory {
  static create(appType = 'AppExpress') {
    const apps = new Map()
    apps.set('AppExpress', AppExpress)
    const App = apps.get(appType)
    return new App()
  }
}
