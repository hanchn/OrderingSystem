import { reactive, computed } from 'vue'
import { tableManager } from './table'

// 购物车状态
const cartState = reactive({
  items: []
})

// 购物车操作方法
export const useCartStore = () => {
  // 添加商品到购物车
  const addItem = (dish) => {
    const existingItem = cartState.items.find(item => item.id === dish.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartState.items.push({
        ...dish,
        quantity: 1
      })
    }
    
    // 保存到 localStorage
    localStorage.setItem('cart_items', JSON.stringify(cartState.items))
  }

  // 从购物车移除商品
  const removeItem = (dishId) => {
    const itemIndex = cartState.items.findIndex(item => item.id === dishId)
    
    if (itemIndex > -1) {
      const item = cartState.items[itemIndex]
      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        cartState.items.splice(itemIndex, 1)
      }
    }
    
    // 保存到 localStorage
    localStorage.setItem('cart_items', JSON.stringify(cartState.items))
  }

  // 清空购物车
  const clearCart = () => {
    cartState.items = []
    localStorage.removeItem('cart_items')
  }

  // 获取商品数量
  const getItemQuantity = (dishId) => {
    const item = cartState.items.find(item => item.id === dishId)
    return item ? item.quantity : 0
  }

  // 从 localStorage 恢复数据
  const restoreFromStorage = () => {
    const items = localStorage.getItem('cart_items')
    if (items) {
      cartState.items = JSON.parse(items)
    }
  }

  // 计算属性
  const items = computed(() => cartState.items)
  const itemCount = computed(() => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0)
  })
  const totalPrice = computed(() => {
    return cartState.items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  return {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
    getItemQuantity,
    restoreFromStorage
  }
}

// 保留原有的 CartManager 类用于兼容
class CartManager {
  constructor() {
    this.storageKey = 'cart_items'
  }

  getItems() {
    const items = localStorage.getItem(this.storageKey)
    return items ? JSON.parse(items) : []
  }

  addItem(item) {
    const items = this.getItems()
    const existingItem = items.find(i => i.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      items.push({ ...item, quantity: 1 })
    }
    
    this.saveItems(items)
  }

  saveItems(items) {
    localStorage.setItem(this.storageKey, JSON.stringify(items))
  }

  clear() {
    localStorage.removeItem(this.storageKey)
  }

  createOrderData() {
    const items = this.getItems()
    const tableInfo = tableManager.getFullIdentifier()
    
    return {
      ...tableInfo,
      items: items,
      totalAmount: this.getTotalAmount(),
      orderTime: new Date().toISOString(),
      orderKey: `${tableInfo.brandId}_${tableInfo.companyId}_${tableInfo.shopId}_${tableInfo.deskNumber}_${Date.now()}`
    }
  }

  getTotalAmount() {
    const items = this.getItems()
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}

export const cartManager = new CartManager()