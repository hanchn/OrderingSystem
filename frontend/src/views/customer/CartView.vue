<template>
  <div class="cart-container">
    <!-- 头部 -->
    <div class="cart-header">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
      </button>
      <h1 class="page-title">购物车</h1>
      <button class="clear-btn" @click="clearCart" v-if="cartItems.length > 0">
        清空
      </button>
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
            <p class="item-desc">{{ item.description }}</p>
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/utils/cart'
import BottomNavigation from '@/components/BottomNavigation.vue'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const totalItems = computed(() => cartStore.itemCount)
const totalPrice = computed(() => cartStore.totalPrice)

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
  // 这里可以跳转到结算页面或显示结算弹窗
  alert('结算功能开发中...')
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nvo7lkbPkvbPogZQ8L3RleHQ+Cjwvc3ZnPg=='
}
</script>

<style scoped>
.cart-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

.cart-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.back-btn, .clear-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover, .clear-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.back-icon {
  font-size: 20px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.clear-btn {
  color: #e74c3c;
}

.cart-content {
  flex: 1;
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  margin: 20px 0;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.empty-desc {
  color: #666;
  margin-bottom: 30px;
}

.go-menu-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.go-menu-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.cart-items {
  background: white;
  border-radius: 16px;
  overflow: hidden;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 12px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
  margin-right: 12px;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.item-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: #f8f9fa;
  border-color: #ff6b6b;
}

.quantity {
  font-size: 16px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.cart-footer {
  position: fixed;
  bottom: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 16px 20px;
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
}

.total-info {
  flex: 1;
}

.total-items {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.total-price {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 14px;
  color: #ff6b6b;
  margin-right: 2px;
}

.price {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b6b;
}

.checkout-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}
</style>