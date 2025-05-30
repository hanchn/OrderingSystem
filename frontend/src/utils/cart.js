import { reactive, computed } from 'vue'
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
    }
  
    // 清空购物车
    const clearCart = () => {
      cartState.items = []
    }
  
    // 获取商品数量
    const getItemQuantity = (dishId) => {
      const item = cartState.items.find(item => item.id === dishId)
      return item ? item.quantity : 0
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
      getItemQuantity
    }
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