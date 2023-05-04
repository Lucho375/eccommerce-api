import { body, query } from 'express-validator'
import inputsValidations from './InputValidation.js'
import { checkExistingProduct } from './checkExistingProduct.js'
import { checkMongoId } from './checkMongoId.js'

export const productValidation = Object.freeze({
  getProducts: [
    query('limit', 'Invalid query limit, must be an integer number')
      .trim()
      .isInt()
      .optional({ values: 'falsy' })
      .escape(),
    inputsValidations
  ],
  createProduct: [
    body('code', 'Product code is required!')
      .trim()
      .notEmpty()
      .escape()
      .custom(async code => await checkExistingProduct(code)),
    body('title', 'Title is required!').trim().notEmpty().escape(),
    body('description', 'Description is required!').trim().notEmpty().escape(),
    body('price', 'Price must be a number and is required!')
      .trim()
      .notEmpty()
      .isNumeric()
      .escape(),
    body('stock', 'Stock must be a number and is required!')
      .trim()
      .notEmpty()
      .isNumeric()
      .escape(),
    body('category', 'Category is required!').trim().notEmpty().escape(),
    inputsValidations
  ],
  getOneProduct: [checkMongoId(), inputsValidations],
  updateProduct: [
    checkMongoId(),
    body().custom(value => {
      if (Object.keys(value).length === 0) {
        throw new Error('Empty update!')
      }
      return true
    }),
    inputsValidations
  ],
  deleteProduct: [checkMongoId(), inputsValidations]
})
