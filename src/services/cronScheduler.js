import cron from 'node-cron'

export class CronScheduler {
  #tasks
  #cron
  constructor() {
    this.#tasks = []
    this.#cron = cron
  }

  scheduleTask(cronPattern, taskFunction) {
    if (typeof taskFunction !== 'function') throw new Error('Invalid task, must be a function type')
    const task = this.#cron.schedule(cronPattern, taskFunction)
    this.#tasks.push(task)
  }

  stopAllTasks() {
    this.#tasks.forEach(task => task.stop())
    this.#tasks = []
  }
}
