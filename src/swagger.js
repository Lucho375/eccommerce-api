import swaggerJSDoc from 'swagger-jsdoc'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

import { SwaggerTheme } from 'swagger-themes'
const theme = new SwaggerTheme('v3') // Specifying the Swagger Version

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const currentDir = dirname(currentFilePath)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ECCOMMERCE API',
      version: '1.0.0'
    }
  },
  apis: [resolve(currentDir, './docs/**/*.yaml')],
  customCss: theme.getBuffer('dark')
}

export const specs = swaggerJSDoc(options)

export const swaggerTheme = { customCss: theme.getBuffer('dark'), customSiteTitle: 'ECCOMMERCE API' }
