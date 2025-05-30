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
const dish = ref({})
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
  e.target.src = '/images/placeholder-dish.jpg'
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

const loadDishDetail = async () => {
  try {
    const dishId = route.params.id
    const response = await getDishDetail(dishId)  // 修改：getDishById -> getDishDetail
    if (response.code === 200) {
      dish.value = response.data
    } else {
      ElMessage.error('加载菜品详情失败')
      router.back()
    }
  } catch (error) {
    console.error('加载菜品详情失败:', error)
    ElMessage.error('加载菜品详情失败')
    router.back()
  }
}

onMounted(() => {
  loadDishDetail()
})
</script>

<style scoped>
.dish-detail-container {
  min-height: 100vh;
  background: #f8f9fa;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #f0f0f0;
}

.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.header-placeholder {
  width: 40px;
}

.dish-image-section {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent 60%, rgba(0,0,0,0.3));
  display: flex;
  align-items: flex-end;
  padding: 20px;
}

.dish-tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.tag-signature {
  background: #ff6b6b;
}

.tag-classic {
  background: #4ecdc4;
}

.tag-spicy {
  background: #ff9f43;
}

.tag-new {
  background: #a55eea;
}

.tag-recommended {
  background: #26de81;
}

.dish-info {
  background: white;
  padding: 24px;
  margin-bottom: 20px;
}

.dish-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.dish-name {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  flex: 1;
  margin-right: 16px;
}

.dish-price {
  display: flex;
  align-items: baseline;
  color: #e74c3c;
}

.currency {
  font-size: 16px;
  font-weight: 500;
}

.price {
  font-size: 28px;
  font-weight: 700;
  margin-left: 2px;
}

.dish-description {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #666;
}

.dish-details {
  border-top: 1px solid #eee;
  padding-top: 16px;
}

.detail-item {
  display: flex;
  margin-bottom: 12px;
  align-items: flex-start;
}

.label {
  font-weight: 500;
  color: #333;
  min-width: 80px;
  margin-right: 12px;
}

.value {
  color: #666;
  flex: 1;
  line-height: 1.5;
}

.action-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 25px;
  overflow: hidden;
}

.quantity-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.quantity-btn:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.quantity {
  padding: 0 16px;
  font-size: 16px;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
}

.add-to-cart-btn {
  flex: 1;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  transition: transform 0.2s;
}

.add-to-cart-btn:hover {
  transform: translateY(-1px);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

.total-price {
  font-size: 18px;
  font-weight: 700;
}

@media (max-width: 480px) {
  .dish-info {
    padding: 20px 16px;
  }
  
  .action-section {
    padding: 16px;
  }
  
  .dish-name {
    font-size: 20px;
  }
  
  .price {
    font-size: 24px;
  }
}
</style>