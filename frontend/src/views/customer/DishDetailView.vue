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
        <div class="detail-item" v-if="dish.nutrition">
          <span class="label">营养信息：</span>
          <span class="value">{{ dish.nutrition }}</span>
        </div>
      </div>
    </div>

    <!-- 数量选择和添加到购物车 -->
    <div class="action-section">
      <div class="quantity-selector">
        <button 
          class="quantity-btn minus" 
          @click="decreaseQuantity"
          :disabled="quantity <= 1"
        >
          -
        </button>
        <span class="quantity">{{ quantity }}</span>
        <button class="quantity-btn plus" @click="increaseQuantity">
          +
        </button>
      </div>
      
      <button class="add-to-cart-btn" @click="addToCart">
        <span class="btn-text">加入购物车</span>
        <span class="total-price">¥{{ (dish.price * quantity).toFixed(2) }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getDishDetail } from '@/api/dish'  // 修改：getDishById -> getDishDetail
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
const quantity = ref(1)

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
    const response = await getDishDetail(dishId)
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

const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    cartManager.addItem({
      id: dish.value.id,
      name: dish.value.name,
      price: dish.value.price,
      image: dish.value.image
    })
  }
  
  ElMessage({
    message: `已添加 ${quantity.value} 份 ${dish.value.name} 到购物车`,
    type: 'success',
    duration: 2000
  })
  
  // 添加成功后返回菜单页
  setTimeout(() => {
    router.back()
  }, 1000)
}

onMounted(() => {
  loadDishDetail()
})
</script>

<style scoped>
.dish-detail-container {
  min-height: 100vh;
  background: #f8f9fa;
  padding-bottom: 100px; /* 为底部按钮留出空间 */
}

.dish-image-section {
  position: relative;
  height: 300px;
  overflow: hidden;
  background: #f0f0f0; /* 添加背景色，避免加载时空白 */
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

.dish-info {
  background: white;
  padding: 20px;
  margin: 0;
  border-radius: 0; /* 移除圆角，确保无缝连接 */
}

.dish-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px; /* 添加间距 */
}

.dish-name {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  flex: 1; /* 允许名称占用剩余空间 */
  line-height: 1.3;
}

.dish-price {
  display: flex;
  align-items: baseline;
  color: #e74c3c;
  font-weight: 600;
  flex-shrink: 0; /* 防止价格被压缩 */
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

/* 修复底部按钮区域 */
.quantity-cart-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 16px 20px;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 100;
}

/* 确保标签正确显示 */
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

/* 详情项样式优化 */
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
</style>