// 购物车管理工具
export class CartManager {
  constructor() {
    this.storageKey = 'shopping_cart'
    this.tableKey = 'table_id'
  }

  // 获取购物车数据
  getCart() {
    const cartData = localStorage.getItem(this.storageKey)
    return cartData ? JSON.parse(cartData) : []
  }

  // 保存购物车数据
  saveCart(cartItems) {
    localStorage.setItem(this.storageKey, JSON.stringify(cartItems))
  }

  // 添加到购物车
  addToCart(dish, quantity = 1, notes = '') {
    const cart = this.getCart()
    const existingItem = cart.find(item => item.dish.id === dish.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      if (notes) existingItem.notes = notes
    } else {
      cart.push({
        dish,
        quantity,
        notes
      })
    }
    
    this.saveCart(cart)
    return cart
  }

  // 更新数量
  updateQuantity(dishId, quantity) {
    const cart = this.getCart()
    const item = cart.find(item => item.dish.id === dishId)
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(dishId)
      } else {
        item.quantity = quantity
        this.saveCart(cart)
      }
    }
    
    return cart
  }

  // 从购物车移除
  removeFromCart(dishId) {
    const cart = this.getCart()
    const filteredCart = cart.filter(item => item.dish.id !== dishId)
    this.saveCart(filteredCart)
    return filteredCart
  }

  // 清空购物车
  clearCart() {
    localStorage.removeItem(this.storageKey)
    return []
  }

  // 获取总数量
  getTotalItems() {
    const cart = this.getCart()
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // 获取总金额
  getTotalAmount() {
    const cart = this.getCart()
    return cart.reduce((total, item) => {
      return total + item.dish.price * item.quantity
    }, 0)
  }

  // 设置餐桌ID
  setTableId(tableId) {
    localStorage.setItem(this.tableKey, tableId)
  }

  // 获取餐桌ID
  getTableId() {
    return localStorage.getItem(this.tableKey)
  }
}

// 创建全局实例
export const cartManager = new CartManager()