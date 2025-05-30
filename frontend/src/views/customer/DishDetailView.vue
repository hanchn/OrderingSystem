<template>
  <div class="dish-detail-container">
    <!-- 头部导航 -->
    <div class="detail-header">
      <button class="back-btn" @click="goBack">
        <span class="back-icon">←</span>
      </button>
      <h1 class="page-title">菜品详情</h1>
      <div class="header-placeholder"></div>
    </div>

    <!-- 加载状态 -->
    <div v-if="!dish.id" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 菜品内容 -->
    <div v-else>
      <!-- 菜品图片 -->
      <div class="dish-image-section">
        <img 
          :src="dish.image" 
          :alt="dish.name"
          class="dish-image"
          @error="handleImageError"
        />
        <div class="image-overlay">
          <div class="dish-tags">
            <span 
              v-for="tag in dish.tags" 
              :key="tag"
              :class="['tag', `tag-${tag}`]"
            >
              {{ getTagName(tag) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 菜品信息 -->
      <div class="dish-info">
        <div class="dish-header">
          <h2 class="dish-name">{{ dish.name }}</h2>
          <div class="dish-price">
            <span class="currency">¥</span>
            <span class="price">{{ dish.price }}</span>
          </div>
        </div>
        
        <div class="dish-description">
          <p>{{ dish.description || '暂无描述' }}</p>
        </div>

        <div class="dish-details">
          <div class="detail-item">
            <span class="label">分类：</span>
            <span class="value">{{ dish.categoryName }}</span>
          </div>
          <div class="detail-item" v-if="dish.ingredients">
            <span class="label">主要食材：</span>
            <span class="value">{{ dish.ingredients }}</span>
          </div>
          <div class="detail-item" v-if="dish.allergens">
            <span class="label">过敏原：</span>
            <span class="value">{{ dish.allergens }}</span>
          </div>
          <!-- 修复营养信息显示 -->
          <div class="detail-item" v-if="dish.nutrition && Object.keys(dish.nutrition).length > 0">
            <span class="label">营养信息：</span>
            <div class="nutrition-info">
              <div class="nutrition-item" v-if="dish.nutrition.calories">
                <span class="nutrition-label">热量：</span>
                <span class="nutrition-value">{{ dish.nutrition.calories }} 千卡</span>
              </div>
              <div class="nutrition-item" v-if="dish.nutrition.protein">
                <span class="nutrition-label">蛋白质：</span>
                <span class="nutrition-value">{{ dish.nutrition.protein }}g</span>
              </div>
              <div class="nutrition-item" v-if="dish.nutrition.fat">
                <span class="nutrition-label">脂肪：</span>
                <span class="nutrition-value">{{ dish.nutrition.fat }}g</span>
              </div>
              <div class="nutrition-item" v-if="dish.nutrition.carbs">
                <span class="nutrition-label">碳水化合物：</span>
                <span class="nutrition-value">{{ dish.nutrition.carbs }}g</span>
              </div>
            </div>
          </div>
          
          <!-- 新增：菜品详细介绍 -->
          <div class="detail-item detail-introduction">
            <span class="label">详细介绍：</span>
            <div class="introduction-content">
              <p v-if="dish.detailedDescription">
                {{ dish.detailedDescription }}
              </p>
              <p v-else>
                {{ dish.name }}是我们精心制作的特色菜品，选用优质食材，经过传统工艺烹制而成。
                口感丰富，营养均衡，是您用餐的绝佳选择。我们致力于为每一位顾客提供最优质的美食体验，
                让您在品尝美味的同时，感受到我们对品质的坚持和对顾客的用心。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 移除购物车浮动按钮 -->
    <!-- <div class="cart-float" v-if="cartItemCount > 0" @click="goToCart">
      <div class="cart-btn">
        <span class="cart-icon">🛒</span>
        <span class="cart-badge" v-if="cartItemCount">{{ cartItemCount }}</span>
      </div>
    </div> -->

    <!-- 数量选择和添加到购物车 -->
    <div class="action-section">
      <div class="quantity-selector">
        <button 
          class="quantity-btn minus" 
          @click="decreaseQuantity"
          :disabled="dishQuantity <= 1"
        >
          -
        </button>
        <span class="quantity">{{ dishQuantity }}</span>
        <button class="quantity-btn plus" @click="increaseQuantity">
          +
        </button>
      </div>
      
      <button class="add-to-cart-btn" @click="addToCart">
        <span class="btn-text">加入购物车</span>
        <span class="total-price">¥{{ (dish.price * dishQuantity).toFixed(2) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getDishDetail } from '@/api/dish'
import { cartManager } from '@/utils/cart'

const router = useRouter()
const route = useRoute()

// 初始化dish对象，避免布局错乱
const dish = ref({
  id: '',
  name: '加载中...',
  price: 0,
  description: '',
  image: '',
  categoryName: '',
  tags: [],
  nutrition: {}
})
// 删除第162行，重新输入
const quantity = ref(1)

// 购物车相关
const cartItems = ref([])

// 计算购物车商品数量
const cartItemCount = computed(() => {
  return (cartItems.value || []).reduce((total, item) => total + item.quantity, 0)
})

// 跳转到购物车
const goToCart = () => {
  router.push({ path: '/cart', query: route.query })
}

const tagNames = {
  signature: '招牌',
  classic: '经典',
  spicy: '辣',
  new: '新品',
  recommended: '推荐'
}

const getTagName = (tag) => {
  return tagNames[tag] || tag
}

const goBack = () => {
  router.back()
}

const handleImageError = (e) => {
  // 使用base64编码的占位符图片，确保始终可用
  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTA1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPue+j+WRs+S9s+iBlDwvdGV4dD4KPC9zdmc+'
}

const loadDishDetail = async () => {
  try {
    const dishId = parseInt(route.params.id)  // 确保ID为数字类型
    console.log('加载菜品详情，ID:', dishId, '类型:', typeof dishId)
    console.log('当前URL:', window.location.href)
    console.log('是否测试模式:', new URLSearchParams(window.location.search).get('test') === '1')
    
    const response = await getDishDetail(dishId)
    console.log('API响应:', response)
    
    if (response.code === 200 && response.data) {
      dish.value = {
        ...response.data,
        // 确保必要字段存在
        categoryName: response.data.categoryName || '未分类',
        tags: response.data.tags || [],
        nutrition: response.data.nutrition || {}
      }
    } else {
      ElMessage.error('菜品不存在或已下架')
      router.back()
    }
  } catch (error) {
    console.error('加载菜品详情失败:', error)
    ElMessage.error('网络错误，请稍后重试')
    router.back()
  }
}

// 在script setup部分
const dishQuantity = ref(1)

// 更新相关函数
const increaseQuantity = () => {
  dishQuantity.value++
}

const decreaseQuantity = () => {
  if (dishQuantity.value > 1) {
    dishQuantity.value--
  }
}

// 在addToCart函数中
const addToCart = async () => {
  for (let i = 0; i < dishQuantity.value; i++) {
    cartManager.addItem({
      id: dish.value.id,
      name: dish.value.name,
      price: dish.value.price,
      image: dish.value.image
    })
  }
  
  // 显示自定义成功提示
  showAddSuccess.value = true
}

// 隐藏成功提示
const hideAddSuccess = () => {
  showAddSuccess.value = false
}

// 监听购物车变化
watch(() => cartManager.items, (newItems) => {
  cartItems.value = newItems || []
}, { deep: true, immediate: true })

onMounted(() => {
  loadDishDetail()
})
</script>

<style scoped>
.dish-detail-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 100px;
}

/* 头部导航样式 */
.detail-header {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: #f8f9fa;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: #e9ecef;
  transform: scale(1.05);
}

.back-icon {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-placeholder {
  width: 40px;
}

/* 加载状态样式 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  margin: 20px;
  border-radius: 12px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 图片区域样式 */
.dish-image-section {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #f0f0f0;
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.dish-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background: rgba(0,0,0,0.6);
}

/* 菜品信息样式 */
.dish-info {
  background: white;
  padding: 20px;
  margin: 0;
}

.dish-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
}

.dish-name {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  flex: 1;
  line-height: 1.3;
}

.dish-price {
  display: flex;
  align-items: baseline;
  color: #e74c3c;
  font-weight: 600;
  flex-shrink: 0;
}

.currency {
  font-size: 16px;
  margin-right: 2px;
}

.price {
  font-size: 28px;
}

.dish-description {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #3498db;
}

.dish-description p {
  margin: 0;
  color: #666;
  line-height: 1.6;
  font-size: 15px;
}

.dish-details {
  margin-top: 20px;
}

.detail-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: flex-start;
}

.detail-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
  min-width: 80px;
  flex-shrink: 0;
}

.value {
  color: #333;
  flex: 1;
  line-height: 1.4;
}

/* 操作区域样式 */
.action-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 16px 20px;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 8px 16px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: #3498db;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.quantity-btn:hover:not(:disabled) {
  background: #2980b9;
  transform: scale(1.05);
}

.quantity-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.quantity {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  min-width: 20px;
  text-align: center;
}

.add-to-cart-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #c0392b;
  transform: translateY(-1px);
}

.btn-text {
  flex: 1;
  text-align: left;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
}

      /* 购物车悬浮按钮 */
      .cart-float {
        position: fixed;
        bottom: 120px; /* 避免与底部操作栏重叠 */
        right: 20px;
        z-index: 1000;
      }
      
      .cart-btn {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4);
        position: relative;
      }
      
      .cart-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px rgba(255, 107, 107, 0.6);
      }
      
      .cart-icon {
        font-size: 24px;
        color: white;
      }
      
      .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #2ecc71;
        color: white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        border: 2px solid white;
      }

/* 营养信息样式 */
.nutrition-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.nutrition-item {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 13px;
}

.nutrition-label {
  color: #666;
  margin-right: 4px;
}

.nutrition-value {
  color: #333;
  font-weight: 500;
}

/* 详细介绍样式 */
.detail-introduction {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.detail-introduction .label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.introduction-content {
  margin-top: 12px;
  line-height: 1.6;
}

.introduction-content p {
  color: #666;
  font-size: 14px;
  margin: 0;
  text-align: justify;
}
/* 自定义 ElMessage 样式 */
:deep(.custom-add-cart-message) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
  font-weight: 500;
  padding: 16px 24px;
  font-size: 16px;
}

:deep(.custom-add-cart-message .el-message__icon) {
  color: white;
  font-size: 20px;
}

/* 加购成功弹窗样式 */
.add-success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.add-success-modal {
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin: 20px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: scale(0.9);
  animation: modalShow 0.3s ease-out forwards;
}

@keyframes modalShow {
  to {
    transform: scale(1);
  }
}

.success-header {
  text-align: center;
  margin-bottom: 20px;
}

.success-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 12px;
}

.success-icon svg {
  width: 100%;
  height: 100%;
}

.success-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.success-content {
  margin-bottom: 24px;
}

.dish-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.preview-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.preview-info {
  flex: 1;
}

.preview-info .dish-name {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.preview-info .quantity-info,
.preview-info .price-info {
  font-size: 14px;
  color: #6b7280;
  margin: 2px 0;
}

.preview-info .price-info {
  color: #ef4444;
  font-weight: 600;
}

.success-actions {
  display: flex;
  gap: 12px;
}

.continue-btn,
.cart-btn {
  flex: 1;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.continue-btn {
  background: #f3f4f6;
  color: #374151;
}

.continue-btn:hover {
  background: #e5e7eb;
}

.cart-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cart-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 响应式设计 */
@media (max-width: 480px) {
  .add-success-modal {
    margin: 16px;
    padding: 20px;
  }
  
  .success-actions {
    flex-direction: column;
  }
}
</style>
