import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerTheme } from 'swagger-themes'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

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
  apis: [resolve(currentDir, './docs/**/*.yaml')]
}

export const specs = swaggerJSDoc(options)

const theme = new SwaggerTheme('v3')

export const swaggerTheme = { customCss: theme.getBuffer('dark'), customSiteTitle: 'ECCOMMERCE API' }
