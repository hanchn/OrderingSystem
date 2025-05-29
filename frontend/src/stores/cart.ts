import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Dish } from '@/types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const tableId = ref<number | null>(null)

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalAmount = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.dish.price * item.quantity
    }, 0)
  })

  const isEmpty = computed(() => items.value.length === 0)

  // 添加到购物车
  const addToCart = (dish: Dish, quantity: number = 1, notes?: string) => {
    const existingItem = items.value.find(item => item.dish.id === dish.id)
    
    if (existingItem) {
      existingItem.quantity += quantity
      if (notes) existingItem.notes = notes
    } else {
      items.value.push({
        dish,
        quantity,
        notes
      })
    }
  }

  // 更新数量
  const updateQuantity = (dishId: number, quantity: number) => {
    const item = items.value.find(item => item.dish.id === dishId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(dishId)
      } else {
        item.quantity = quantity
      }
    }
  }

  // 从购物车移除
  const removeFromCart = (dishId: number) => {
    const index = items.value.findIndex(item => item.dish.id === dishId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  // 清空购物车
  const clearCart = () => {
    items.value = []
  }

  // 设置餐桌ID
  const setTableId = (id: number) => {
    tableId.value = id
  }

  return {
    items,
    tableId,
    totalItems,
    totalAmount,
    isEmpty,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    setTableId
  }
})