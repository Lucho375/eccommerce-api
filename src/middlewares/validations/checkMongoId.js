import { param } from 'express-validator'

export function checkMongoId() {
  return param('id')
    .trim()
    .notEmpty()
    .withMessage('Empty id')
    .isMongoId()
    .withMessage('Invalid id')
    .escape()
}
