<template>
  <div class="menu-container">
    <!-- 头部 -->
    <div class="menu-header">
      <div class="header-content">
        <h1 class="page-title">点餐菜单</h1>
        <p class="page-subtitle">美味餐厅 · {{ tableDisplay }}</p>
      </div>
    </div>

    <!-- 分类导航 - 添加 ref -->
    <div class="category-nav">
      <div 
        ref="categoryNavRef"
        class="category-scroll"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        :style="{ transform: `translateX(${translateX}px)` }"
      >
        <div 
          v-for="category in categories" 
          :key="category.id"
          :class="['category-item', { active: activeCategory === category.id.toString() }]"
          :data-category-id="category.id"
          @click="switchCategory(category.id.toString())"
        >
          <span class="category-icon">{{ category.icon }}</span>
          <span class="category-name">{{ category.name }}</span>
        </div>
      </div>
    </div>

    <!-- 滑动指示器 -->
    <div class="swipe-indicator">
      <div class="indicator-dots">
        <div 
          v-for="(category, index) in categories" 
          :key="category.id"
          :class="['dot', { active: activeCategory === category.id.toString() }]"
        ></div>
      </div>
      <div class="swipe-hint">← 左右滑动切换分类 →</div>
    </div>

    <!-- 菜品列表 - 添加 ref -->
    <div 
      class="dishes-container"
      ref="dishesContainerRef"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div class="dishes-wrapper" :style="{ transform: `translateX(${translateX}px)` }">
        <div class="dishes-grid">
          <div 
            v-for="dish in filteredDishes" 
            :key="dish.id" 
            class="dish-card"
            @click="goToDishDetail(dish.id)"
          >
            <div class="dish-image-container">
              <img 
                :src="dish.image" 
                :alt="dish.name" 
                class="dish-image"
                @error="handleImageError"
                @load="handleImageLoad"
              />
              <div class="image-placeholder" v-if="!dish.imageLoaded">
                <div class="placeholder-icon">🍽️</div>
                <div class="placeholder-text">美味佳肴</div>
              </div>
              <div class="dish-tags" v-if="dish.tags && dish.tags.length">
                <span 
                  v-for="tag in dish.tags.slice(0, 2)" 
                  :key="tag"
                  class="tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="dish-info">
              <h3 class="dish-name">{{ dish.name }}</h3>
              <p class="dish-description">{{ dish.description }}</p>
              <div class="dish-footer">
                <div class="price-section">
                  <span class="currency">¥</span>
                  <span class="price">{{ dish.price }}</span>
                </div>
                <button 
                  class="add-btn"
                  @click.stop="addToCart(dish, $event)"
                >
                  <span class="btn-icon">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNavigation />
    
    <!-- 添加购物车动画组件 -->
    <AddToCartAnimation ref="addToCartAnimationRef" />
    
    <!-- 移除购物车浮动按钮 -->
    <!-- <div class="cart-float" v-if="cartItemCount > 0">
      <div class="cart-btn" @click="goToCart">
        <span class="cart-icon">🛒</span>
        <div class="cart-badge" v-if="cartItemCount > 0">
          {{ cartItemCount }}
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCategories, getDishes } from '@/api/dish'
import { useCartStore } from '@/utils/cart'
import { tableManager } from '@/utils/table'
import BottomNavigation from '@/components/BottomNavigation.vue'
import AddToCartAnimation from '@/components/AddToCartAnimation.vue'

const router = useRouter()
const route = useRoute()

// 使用新的购物车store
const cartStore = useCartStore()
// 恢复cartItemCount的定义
const cartItemCount = computed(() => cartStore.itemCount)

// Component state
const categories = ref([])
const dishes = ref([])
const activeCategory = ref('')
const tableDisplay = ref('')

// Add this line:
const addToCartAnimationRef = ref(null)

// 滑动相关
const touchStartX = ref(0)
const touchStartY = ref(0)
const translateX = ref(0)
const isDragging = ref(false)
const minSwipeDistance = 50
const maxVerticalDistance = 80

// 触摸事件处理
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  isDragging.value = true
  
  // 移除这行，不要在触摸开始时就阻止默认行为
  // e.preventDefault()
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  
  const currentX = e.touches[0].clientX
  const currentY = e.touches[0].clientY
  const deltaX = currentX - touchStartX.value
  const deltaY = Math.abs(currentY - touchStartY.value)
  
  // 如果垂直滑动距离小于限制，则处理水平滑动
  if (deltaY < maxVerticalDistance) {
    translateX.value = deltaX * 0.4 // 增加阻尼效果的响应度
    e.preventDefault() // 只在确实进行水平滑动时阻止页面滚动
  } else {
    // 如果垂直滑动距离过大，取消水平滑动
    isDragging.value = false
    translateX.value = 0
  }
}

const handleTouchEnd = (e) => {
  if (!isDragging.value) {
    translateX.value = 0
    return
  }
  
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  
  const deltaX = touchEndX - touchStartX.value
  const deltaY = Math.abs(touchEndY - touchStartY.value)
  
  // 重置位移
  translateX.value = 0
  isDragging.value = false
  
  // 判断是否为有效的水平滑动
  if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalDistance) {
    if (deltaX > 0) {
      // 向右滑动，切换到上一个分类
      switchToCategory('prev')
    } else {
      // 向左滑动，切换到下一个分类
      switchToCategory('next')
    }
  }
}

// 过滤菜品的计算属性
const filteredDishes = computed(() => {
  if (!activeCategory.value) return dishes.value
  return dishes.value.filter(dish => 
    dish.categoryId.toString() === activeCategory.value
  )
})

// Fix the initTableInfo function
const initTableInfo = () => {
  // Initialize table info from URL query parameters
  tableManager.initFromQuery(route.query)
  
  // Set the table display text using the correct method name
  if (tableManager.isValid()) {
    tableDisplay.value = tableManager.getSimpleDisplay() // or getTableDisplay() for full text
  } else {
    tableDisplay.value = '餐桌信息'
  }
}

// 在goToDishDetail函数之前添加以下函数

// 加载分类数据
const loadCategories = async () => {
  try {
    const response = await getCategories()
    categories.value = response.data || []
    if (categories.value.length > 0) {
      activeCategory.value = categories.value[0].id.toString()
    }
  } catch (error) {
    console.error('加载分类失败:', error)
    ElMessage.error('加载分类失败')
  }
}

// 加载菜品数据
const loadDishes = async () => {
  try {
    const response = await getDishes()
    dishes.value = response.data || []
  } catch (error) {
    console.error('加载菜品失败:', error)
    ElMessage.error('加载菜品失败')
  }
}

// 滚动到指定分类
const scrollCategoryIntoView = () => {
  // 实现分类滚动逻辑
  nextTick(() => {
    const activeElement = document.querySelector('.category-item.active')
    if (activeElement) {
      activeElement.scrollIntoView({ behavior: 'smooth', inline: 'center' })
    }
  })
}

// 切换分类
const switchCategory = (categoryId) => {
  activeCategory.value = categoryId.toString()
  scrollCategoryIntoView()
}

// 切换到上一个或下一个分类
const switchToCategory = (direction) => {
  if (categories.value.length === 0) return
  
  const currentIndex = categories.value.findIndex(cat => cat.id.toString() === activeCategory.value)
  let newIndex
  
  if (direction === 'prev') {
    newIndex = currentIndex > 0 ? currentIndex - 1 : categories.value.length - 1
  } else if (direction === 'next') {
    newIndex = currentIndex < categories.value.length - 1 ? currentIndex + 1 : 0
  } else {
    return
  }
  
  const newCategoryId = categories.value[newIndex].id.toString()
  switchCategory(newCategoryId)
}

// 添加onMounted钩子
onMounted(() => {
  initTableInfo()
  loadCategories()
  loadDishes()
  
  // 初始化后自动滚动到第一个分类
  nextTick(() => {
    scrollCategoryIntoView()
  })
})

// 跳转到购物车
const goToCart = () => {
  router.push({
    path: '/cart',
    query: route.query
  })
}

// 跳转到菜品详情页
const goToDishDetail = (dishId) => {
  console.log('点击菜品，ID:', dishId) // 添加调试信息
  if (!dishId) {
    console.error('菜品ID无效')
    return
  }
  router.push(`/dish/${dishId}`)
}

// 在 goToDishDetail 方法后面添加

// 添加商品到购物车
// 添加重复点餐统计
const dishOrderCount = ref({})

// 优化addToCart函数
const addToCart = (dish, event) => {
  // 统计点餐次数
  if (!dishOrderCount.value[dish.id]) {
    dishOrderCount.value[dish.id] = 0
  }
  dishOrderCount.value[dish.id]++
  
  // 先播放动画
  if (addToCartAnimationRef.value) {
    addToCartAnimationRef.value.startAnimation(dish, event)
  }
  
  // 延迟添加到购物车，让动画先开始
  setTimeout(() => {
    cartStore.addItem(dish)
    
    // 优化提示消息
    let message = `${dish.name} 已添加到购物车`
    if (dishOrderCount.value[dish.id] > 1) {
      message += `\n😋 我知道这道菜肯定很好吃，今天您已经第${dishOrderCount.value[dish.id]}次点啦！`
    }
    
    ElMessage({
      message: message,
      type: 'success',
      duration: 3000,
      showClose: true,
      customClass: 'custom-add-cart-message'
    })
  }, 100)
}
</script>

<style scoped>
.menu-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

.menu-header {
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

/* 桌号显示优化 */
.table-info {
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.table-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.table-icon {
  font-size: 24px;
}

/* 分类导航优化 - 现代化设计 */
.category-nav {
  padding: 0 20px;
  margin-bottom: 20px;
  margin-top: 20px; /* 增加顶部间距 */
}

.category-scroll {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 15px 0;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 85px;
  padding: 16px 12px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  transform: scale(1);
}

.category-item:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.category-item.active {
  background: #667eea;
  border: 2px solid #667eea;
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4), 0 2px 10px rgba(0,0,0,0.15);
  transform: translateY(-3px) scale(1.1);
}

.category-icon {
  font-size: 28px;
  margin-bottom: 6px;
  transition: all 0.3s ease;
  color: #666;
}

.category-item.active .category-icon {
  color: white;
  transform: scale(1.1);
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.category-name {
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: #666;
  transition: all 0.3s ease;
}

.category-item.active .category-name {
  color: white;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* 移动端优化 */
@media (max-width: 480px) {
  .category-nav {
    margin-top: 15px;
    padding: 0 15px;
  }
  
  .category-item {
    min-width: 75px;
    padding: 14px 10px;
  }
  
  .category-icon {
    font-size: 24px;
  }
  
  .category-name {
    font-size: 12px;
  }
}

/* 滑动指示器 */
.swipe-indicator {
  text-align: center;
  margin-bottom: 20px;
}

.indicator-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ddd;
  transition: all 0.3s ease;
}

.dot.active {
  background: #667eea;
  transform: scale(1.2);
}

.swipe-hint {
  font-size: 12px;
  color: #999;
  opacity: 0.8;
}

/* 菜品容器 */
.dishes-container {
  padding: 0 20px;
  overflow: hidden;
}

.dishes-wrapper {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 100px;
}

/* 菜品卡片优化 */
.dish-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  position: relative;
}

.dish-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.dish-image-container {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.dish-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.dish-card:hover .dish-image {
  transform: scale(1.05);
}

/* 图片占位符 */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.placeholder-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.placeholder-text {
  font-size: 12px;
  font-weight: 500;
}

/* 标签 */
.dish-tags {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  gap: 4px;
}

.tag {
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 500;
}

/* 菜品信息 */
.dish-info {
  padding: 12px;
}

.dish-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #2c3e50;
  line-height: 1.2;
}

.dish-description {
  color: #7f8c8d;
  font-size: 11px;
  margin-bottom: 12px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price-section {
  display: flex;
  align-items: baseline;
}

.currency {
  font-size: 12px;
  color: #e74c3c;
  font-weight: 500;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
  margin-left: 2px;
}

/* 添加按钮优化 */
.add-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.add-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
}

.btn-icon {
  font-size: 18px;
  font-weight: bold;
}

/* 购物车悬浮按钮优化 */
.cart-float {
  position: fixed;
  bottom: 30px;
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

/* Home按钮样式 */
.table-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

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

.table-badge {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  margin-left: 12px;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .dishes-grid {
    gap: 12px;
  }
  
  .dish-image-container {
    height: 100px;
  }
  
  .dish-info {
    padding: 10px;
  }
  
  .dish-name {
    font-size: 13px;
  }
  
  .dish-description {
    font-size: 10px;
  }
  
  .price {
    font-size: 14px;
  }
  
  .add-btn {
    width: 28px;
    height: 28px;
  }
  
  .btn-icon {
    font-size: 16px;
  }
}

/* 加载动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dish-card {
  animation: fadeIn 0.5s ease-out;
}
</style>