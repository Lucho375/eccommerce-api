import ProductModel from '../../models/product.model.js'

export async function checkExistingProduct(code) {
  const query = await ProductModel.findOne({ code })
  if (query) {
    throw new Error(`Product code ${code} already in database!`)
  }
  return true
}
