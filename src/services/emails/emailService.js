import fs from 'fs'
import handlebars from 'handlebars'
import { resolve } from 'path'

class EmailService {
  constructor(transporter) {
    if (!transporter) throw new Error('Email transporter not provided')
    this.transporter = transporter
    this.templatesEngine = handlebars
  }

  async sendPasswordReset({ email, firstname, token }) {
    const templatePath = resolve('src/presentation/templates/forgotPassword.hbs')
    const template = fs.readFileSync(templatePath, 'utf-8')
    const emailTemplate = this.templatesEngine.compile(template)

    const html = emailTemplate({
      user: firstname,
      resetLink: `http://localhost:5173/reset-password?token=${token}`
    })

    await this.transporter.sendMail({
      from: 'noreply@eccommerce.com',
      to: email,
      subject: 'Recuperar contraseña',
      html
    })
  }

  async sendUnauthorizedLoginAlert({ email, firstname }) {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleString()

    const templatePath = resolve('src/presentation/templates/unauthorizedLoginAlert.hbs')
    const template = fs.readFileSync(templatePath, 'utf-8')
    const emailTemplate = this.templatesEngine.compile(template)

    const html = emailTemplate({
      firstname,
      date: formattedDate
    })

    await this.transporter.sendMail({
      from: 'noreply@eccommerce.com',
      to: email,
      subject: 'Intento de inicio de sesión',
      html
    })
  }
}

export default EmailService
