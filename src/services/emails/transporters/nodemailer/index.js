import nodemailer from 'nodemailer'
import config from '../../../../config/index.js'

export const nodemailerTransporter = nodemailer.createTransport(config.nodeMailerConfig)
