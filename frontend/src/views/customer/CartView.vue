<template>
  <div class="cart-container">
    <!-- 头部 -->
    <div class="cart-header">
      <div class="header-content">
        <h1 class="page-title">购物车</h1>
        <p class="page-subtitle">{{ tableDisplay }}</p>
      </div>
    </div>

    <!-- 购物车内容 -->
    <div class="cart-content">
      <!-- 空购物车状态 -->
      <div v-if="cartItems.length === 0" class="empty-cart">
        <div class="empty-icon">🛒</div>
        <div class="empty-text">购物车是空的</div>
        <div class="empty-desc">快去选择您喜欢的美食吧</div>
        <button class="go-menu-btn" @click="goToMenu">
          去点餐
        </button>
      </div>

      <!-- 购物车商品列表 -->
      <div v-else class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="cart-item"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name" @error="handleImageError" />
          </div>
          <div class="item-info">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-desc">{{ item.description || '美味佳肴' }}</p>
            <div class="item-price">¥{{ item.price }}</div>
          </div>
          <div class="item-controls">
            <button class="control-btn" @click="decreaseQuantity(item)">
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="control-btn" @click="increaseQuantity(item)">
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部结算 -->
    <div v-if="cartItems.length > 0" class="cart-footer">
      <div class="total-info">
        <div class="total-items">共 {{ totalItems }} 件商品</div>
        <div class="total-price">
          <span class="currency">¥</span>
          <span class="price">{{ totalPrice.toFixed(2) }}</span>
        </div>
      </div>
      <button class="checkout-btn" @click="checkout">
        去结算
      </button>
    </div>

    <!-- 底部导航 -->
    <BottomNavigation />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/utils/cart'
import BottomNavigation from '@/components/BottomNavigation.vue'

const router = useRouter()
const cartStore = useCartStore()

// 直接使用cartStore的computed属性，不需要再次包装
const cartItems = computed(() => cartStore.items.value || [])
const totalItems = computed(() => cartStore.itemCount.value || 0)
const totalPrice = computed(() => cartStore.totalPrice.value || 0)

const goBack = () => {
  router.go(-1)
}

const goToMenu = () => {
  router.push({ path: '/menu', query: router.currentRoute.value.query })
}

const clearCart = () => {
  if (confirm('确定要清空购物车吗？')) {
    cartStore.clearCart()
  }
}

const increaseQuantity = (item) => {
  cartStore.addItem(item)
}

const decreaseQuantity = (item) => {
  cartStore.removeItem(item.id)
}

const checkout = () => {
  if (cartItems.value.length === 0) {
    alert('购物车为空，请先添加商品')
    return
  }
  
  // 这里可以跳转到结算页面或显示结算弹窗
  const total = totalPrice.value.toFixed(2)
  if (confirm(`确认结算？\n总金额：¥${total}`)) {
    alert('结算功能开发中...')
  }
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nvo7lkbPkvbPogZQ8L3RleHQ+Cjwvc3ZnPg=='
}

// 组件挂载时恢复购物车数据
onMounted(() => {
  cartStore.restoreFromStorage()
})

// 移除 goToHome 和 goBack 方法
// const goToHome = () => {
//   router.push({
//     path: '/',
//     query: route.query
//   })
// }

// const goBack = () => {
//   router.back()
// }
</script>

<style scoped>
.cart-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

.cart-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.page-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.page-subtitle {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.clear-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #ff5252;
  transform: translateY(-1px);
}

/* 移除 home-btn 和 back-btn 相关样式 */
.home-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.home-icon {
  font-size: 18px;
  color: white;
}

.back-btn {
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 8px;
}

.page-title {
  flex: 1;
  text-align: center;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.clear-btn {
  color: #ff6b6b;
  font-weight: 500;
}

.cart-content {
  flex: 1;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.empty-desc {
  color: #666;
  margin-bottom: 30px;
}

.go-menu-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.go-menu-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.cart-items {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 16px;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  margin-right: 16px;
}

.item-name {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.item-desc {
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.item-price {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b6b;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.control-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: scale(1.1);
}

.quantity {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 24px;
  text-align: center;
}

.cart-footer {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.total-info {
  flex: 1;
}

.total-items {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.total-price {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 16px;
  color: #ff6b6b;
  margin-right: 2px;
}

.price {
  font-size: 24px;
  font-weight: 600;
  color: #ff6b6b;
}

.checkout-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 20px;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 响应式优化 */
@media (max-width: 480px) {
  .cart-header {
    padding: 16px;
  }
  
  .cart-content {
    padding: 16px;
  }
  
  .cart-item {
    padding: 16px;
  }
  
  .item-image {
    width: 60px;
    height: 60px;
  }
  
  .cart-footer {
    padding: 16px;
  }
  
  .checkout-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>