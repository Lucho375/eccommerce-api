import CartsDao from '../daos/cartsDao.js'

export class CartManager {
  constructor() {
    this.cartDao = new CartsDao()
  }

  addProduct(cid, pid) {
    return this.cartDao.addProduct(cid, pid)
  }

  create() {
    return this.cartDao.create()
  }

  get(cid) {
    return this.cartDao.get(cid)
  }

  deleteProduct(cid, pid) {
    return this.cartDao.deleteProduct(cid, pid)
  }

  updateProductQuantity(cid, pid, quantity) {
    return this.cartDao.updateProductQuantity(cid, pid, quantity)
  }

  deleteAllProducts(cid) {
    return this.cartDao.deleteAllProducts(cid)
  }
}
