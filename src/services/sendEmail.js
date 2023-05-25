import nodemailer from 'nodemailer'
import config from '../config/config.js'

export const emailOptions = {
  wrongPassword: 'wrongPassword',
  changePassword: 'changePassword'
}

const EMAIL_TEMPLATES = {
  wrongPassword: () => {
    return {
      subject: 'Wrong password',
      html: `
      <div>
      <h2 style="color: red;">
      Someone tried to log in to your account. If it was you, please ignore this email. Otherwise,
      </h2>
        <a href="http://localhost/change-password" target="_blank" style="display: block">
        Click here to change your password
        </a>
      </div>
      `
    }
  },
  changePassword: token => {
    return {
      subject: 'Change password',
      html: `
      <a href='http://localhost:5173/reset-password?token=${token}'>Change password</a>
      `
    }
  }
}

export async function sendMail({ email, token }, options) {
  try {
    const emailTemplate = EMAIL_TEMPLATES[options](token)
    const transporter = nodemailer.createTransport(config.nodeMailerConfig)
    await transporter.sendMail({
      from: 'ECCOMMERCE',
      to: email,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    })
  } catch (error) {
    console.log(error.message)
  }
}
