import nodemailer from 'nodemailer'
import config from '../config/index.js'

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(config.nodeMailerConfig)
  }

  async send(email) {
    await this.transporter.sendMail({})
  }
}

// export default EmailService
