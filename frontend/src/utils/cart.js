import { tableManager } from './table'

class CartManager {
  constructor() {
    this.storageKey = 'cart_items'
  }

  // 获取购物车商品
  getItems() {
    const items = localStorage.getItem(this.storageKey)
    return items ? JSON.parse(items) : []
  }

  // 添加商品到购物车
  addItem(dish) {
    const items = this.getItems()
    const existingItem = items.find(item => item.id === dish.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.push({
        ...dish,
        quantity: 1
      })
    }
    
    this.saveItems(items)
    return items
  }

  // 创建订单数据（包含完整的层级信息）
  createOrderData() {
    const items = this.getItems()
    const tableInfo = tableManager.getFullIdentifier()
    
    return {
      ...tableInfo,
      items: items,
      totalAmount: this.getTotalAmount(),
      orderTime: new Date().toISOString(),
      // 添加订单唯一标识
      orderKey: `${tableInfo.brandId}_${tableInfo.companyId}_${tableInfo.shopId}_${tableInfo.deskNumber}_${Date.now()}`
    }
  }

  // 计算总金额
  getTotalAmount() {
    const items = this.getItems()
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // 保存购物车数据
  saveItems(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }

  // 清空购物车
  clear() {
    localStorage.removeItem(this.storageKey)
  }
}

export const cartManager = new CartManager()