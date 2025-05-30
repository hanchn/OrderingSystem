<template>
  <div class="home-container">
    <!-- 头部欢迎区域 -->
    <div class="welcome-header">
      <div class="welcome-content">
        <div class="restaurant-info">
          <h1 class="restaurant-name">美味餐厅</h1>
          <p class="table-info">{{ tableDisplay }}</p>
        </div>
        <div class="welcome-time">
          <div class="time-text">{{ currentTime }}</div>
          <div class="greeting">{{ greeting }}</div>
        </div>
      </div>
      <div class="header-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-circle"></div>
      </div>
    </div>

    <!-- 快捷操作区 -->
    <!-- <div class="quick-actions">
      <div class="action-item" @click="goToMenu">
        <div class="action-icon">📋</div>
        <div class="action-text">查看菜单</div>
      </div>
      <div class="action-item" @click="callService">
        <div class="action-icon">🔔</div>
        <div class="action-text">呼叫服务</div>
      </div>
      <div class="action-item" @click="viewCart">
        <div class="action-icon">🛒</div>
        <div class="action-text">购物车</div>
        <div class="action-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</div>
      </div>
      <div class="action-item" @click="viewProfile">
        <div class="action-icon">👤</div>
        <div class="action-text">个人中心</div>
      </div>
    </div> -->

    <!-- 热销菜品 -->
    <div class="section hot-dishes">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🔥</span>
          热销菜品
        </h2>
        <button class="more-btn" @click="goToCategory('hot')">
          更多 →
        </button>
      </div>
      <div class="dishes-scroll">
        <div 
          v-for="dish in hotDishes" 
          :key="dish.id"
          class="dish-card horizontal"
          @click="viewDishDetail(dish)"
        >
          <div class="dish-image">
            <img :src="dish.image" :alt="dish.name" @error="handleImageError" />
            <div class="hot-badge">🔥</div>
          </div>
          <div class="dish-info">
            <h3 class="dish-name">{{ dish.name }}</h3>
            <p class="dish-desc">{{ dish.description }}</p>
            <div class="dish-stats">
              <span class="sales">已售{{ dish.sales || 0 }}份</span>
              <span class="rating">⭐ {{ dish.rating || 4.5 }}</span>
            </div>
            <div class="price-action">
              <span class="price">¥{{ dish.price }}</span>
              <button class="add-btn" @click.stop="addToCart(dish, $event)">
                <span class="btn-icon">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 店长推荐 -->
    <div class="section recommended">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">👨‍🍳</span>
          店长推荐
        </h2>
        <button class="more-btn" @click="goToCategory('recommended')">
          更多 →
        </button>
      </div>
      <div class="recommended-grid">
        <div 
          v-for="dish in recommendedDishes" 
          :key="dish.id"
          class="dish-card featured"
          @click="viewDishDetail(dish)"
        >
          <div class="dish-image">
            <img :src="dish.image" :alt="dish.name" @error="handleImageError" />
            <div class="recommended-badge">店长推荐</div>
          </div>
          <div class="dish-info">
            <h3 class="dish-name">{{ dish.name }}</h3>
            <p class="dish-desc">{{ dish.description }}</p>
            <div class="dish-tags">
              <span v-for="tag in dish.tags?.slice(0, 2)" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
            <div class="price-action">
              <span class="price">¥{{ dish.price }}</span>
              <button class="add-btn" @click.stop="addToCart(dish, $event)">
                <span class="btn-text">加入购物车</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="section categories">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🍽️</span>
          菜品分类
        </h2>
      </div>
      <div class="categories-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="goToCategory(category.id)"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
          <div class="category-count">{{ getCategoryDishCount(category.id) }}道菜</div>
        </div>
      </div>
    </div>

    <!-- 今日特惠 -->
    <div class="section special-offers">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">💰</span>
          今日特惠
        </h2>
      </div>
      <div class="offers-list">
        <div 
          v-for="offer in specialOffers" 
          :key="offer.id"
          class="offer-card"
          @click="viewOfferDetail(offer)"
        >
          <div class="offer-image">
            <img :src="offer.image" :alt="offer.title" @error="handleImageError" />
            <div class="discount-badge">{{ offer.discount }}</div>
          </div>
          <div class="offer-info">
            <h3 class="offer-title">{{ offer.title }}</h3>
            <p class="offer-desc">{{ offer.description }}</p>
            <div class="offer-price">
              <span class="original-price">¥{{ offer.originalPrice }}</span>
              <span class="current-price">¥{{ offer.currentPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNavigation />
    
    <!-- 移除购物车浮动按钮 -->
    <!-- <div class="cart-float" v-if="cartItemCount > 0">
      <div class="cart-btn" @click="viewCart">
        <span class="cart-icon">🛒</span>
        <div class="cart-badge" v-if="cartItemCount > 0">
          {{ cartItemCount }}
        </div>
      </div>
    </div> -->
    
    <!-- 在模板最后添加动画组件 -->
    <AddToCartAnimation ref="addToCartAnimationRef" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/utils/cart'
import { mockData } from '@/mock'
import BottomNavigation from '@/components/BottomNavigation.vue'
import AddToCartAnimation from '@/components/AddToCartAnimation.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const currentTime = ref('')
const categories = ref([])
const hotDishes = ref([])
const recommendedDishes = ref([])
const specialOffers = ref([])
const dishOrderCount = ref({})

const tableDisplay = computed(() => {
  const { shopId, desk } = route.query
  if (shopId && desk) {
    return `${shopId}店 ${desk}号桌`
  }
  return '欢迎光临'
})

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 12) return '早上好！'
  if (hour < 18) return '下午好！'
  return '晚上好！'
})

const addToCartAnimationRef = ref(null)
const cartItemCount = computed(() => cartStore.itemCount)

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const loadData = () => {
  // 加载分类数据
  categories.value = mockData.categories || []
  
  // 加载菜品数据
  const dishes = mockData.dishes || []
  
  // 热销菜品 - 随机选择6道菜并添加销量数据
  hotDishes.value = dishes
    .slice(0, 6)
    .map(dish => ({
      ...dish,
      sales: Math.floor(Math.random() * 100) + 50,
      rating: (Math.random() * 1 + 4).toFixed(1)
    }))
  
  // 店长推荐 - 选择4道菜
  recommendedDishes.value = dishes.slice(6, 10)
  
  // 今日特惠
  specialOffers.value = [
    {
      id: 1,
      title: '双人套餐',
      description: '精选两道主菜+两份小食+两杯饮品',
      image: dishes[0]?.image || '',
      originalPrice: 128,
      currentPrice: 88,
      discount: '7折'
    },
    {
      id: 2,
      title: '家庭聚餐',
      description: '四道招牌菜+汤品+主食+饮品',
      image: dishes[1]?.image || '',
      originalPrice: 268,
      currentPrice: 198,
      discount: '8折'
    }
  ]
}

const getCategoryDishCount = (categoryId) => {
  const dishes = mockData.dishes || []
  return dishes.filter(dish => dish.categoryId === categoryId).length
}

const goToMenu = () => {
  router.push({ path: '/menu', query: route.query })
}

const goToCategory = (categoryId) => {
  router.push({ 
    path: '/menu', 
    query: { ...route.query, category: categoryId }
  })
}

const viewCart = () => {
  router.push({ path: '/cart', query: route.query })
}

const viewProfile = () => {
  router.push({ path: '/profile', query: route.query })
}

const callService = () => {
  if (confirm('确定要呼叫服务员吗？')) {
    alert('已通知服务员，请稍等...')
  }
}

const addToCart = (dish, event) => {
  // 统计点餐次数
  if (!dishOrderCount.value[dish.id]) {
    dishOrderCount.value[dish.id] = 0
  }
  dishOrderCount.value[dish.id]++
  
  // 先播放动画
  if (addToCartAnimationRef.value && event) {
    try {
      addToCartAnimationRef.value.startAnimation(dish, event)
    } catch (error) {
      console.warn('Animation failed:', error)
    }
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

const viewDishDetail = (dish) => {
  router.push({ 
    path: `/dish/${dish.id}`, 
    query: route.query 
  })
}

const viewOfferDetail = (offer) => {
  alert(`${offer.title}\n\n${offer.description}\n\n原价：¥${offer.originalPrice}\n现价：¥${offer.currentPrice}\n优惠：${offer.discount}`)
}

const handleImageError = (event) => {
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nvo7lkbPkvbPogZQ8L3RleHQ+Cjwvc3ZnPg=='
}

onMounted(() => {
  loadData()
  updateTime()
  setInterval(updateTime, 60000) // 每分钟更新时间
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

/* 头部欢迎区域 - 只优化padding */
.welcome-header {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px; /* 从30px减少到20px */
  margin-bottom: 20px;
  overflow: hidden;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.restaurant-name {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
}

.table-info {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.welcome-time {
  text-align: right;
}

.time-text {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b6b;
  margin-bottom: 4px;
}

.greeting {
  font-size: 14px;
  color: #666;
}

.header-decoration {
  position: absolute;
  top: -50px;
  right: -50px;
  z-index: 1;
}

.decoration-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 50%;
  opacity: 0.1;
  position: absolute;
}

.decoration-circle:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 30px;
  right: 30px;
  opacity: 0.2;
}

/* 快捷操作区 */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 20px;
  margin-bottom: 30px;
}

.action-item {
  background: white;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.action-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.action-item:active {
  transform: translateY(-1px);
}

.action-icon {
  font-size: 28px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.action-item:hover .action-icon {
  transform: scale(1.1);
}

.action-text {
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.action-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 内容区域样式 */
.section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 15px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.title-icon {
  font-size: 20px;
}

.more-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 热销菜品样式 */
.dishes-scroll {
  display: flex;
  gap: 15px;
  padding: 0 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.dishes-scroll::-webkit-scrollbar {
  display: none;
}

.dish-card.horizontal {
  min-width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dish-card.horizontal:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.dish-card .dish-image {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.dish-card .dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff6b6b;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
}

.dish-info {
  padding: 15px;
}

.dish-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.dish-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.dish-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.sales, .rating {
  font-size: 11px;
  color: #999;
}

.price-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b6b;
}

.add-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #ff5252;
  transform: scale(1.1);
}

/* 店长推荐样式 */
.recommended-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 0 20px;
}

.dish-card.featured {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dish-card.featured:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.recommended-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
}

.dish-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  background: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 10px;
}

.dish-card.featured .add-btn {
  width: auto;
  height: auto;
  padding: 6px 12px;
  border-radius: 12px;
}

.btn-text {
  font-size: 12px;
  font-weight: 500;
}

/* 分类导航样式 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 0 20px;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.category-count {
  font-size: 11px;
  color: #999;
}

/* 今日特惠样式 */
.offers-list {
  display: flex;
  gap: 15px;
  padding: 0 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.offers-list::-webkit-scrollbar {
  display: none;
}

.offer-card {
  min-width: 250px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.offer-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.offer-image {
  position: relative;
  height: 100px;
  overflow: hidden;
}

.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

.offer-info {
  padding: 15px;
}

.offer-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.offer-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.offer-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: #e74c3c;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .welcome-header {
    padding: 16px; /* 移动端进一步减少 */
  }
  
  .restaurant-name {
    font-size: 20px;
  }
  
  .time-text {
    font-size: 16px;
  }
  
  .quick-actions {
    padding: 0 16px;
    gap: 12px;
  }
  
  .action-item {
    padding: 16px 8px;
  }
  
  .action-icon {
    font-size: 24px;
  }
  
  .action-text {
    font-size: 11px;
  }
  
  .section-header {
    padding: 0 16px 15px;
  }
  
  .dishes-scroll, .offers-list {
    padding: 0 16px;
  }
  
  .recommended-grid, .categories-grid {
    padding: 0 16px;
  }
  
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

    /* 购物车浮动按钮 */
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

.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

/* 头部欢迎区域 - 只优化padding */
.welcome-header {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px; /* 从30px减少到20px */
  margin-bottom: 20px;
  overflow: hidden;
}

.welcome-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}

.restaurant-name {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin: 0 0 4px 0;
}

.table-info {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.welcome-time {
  text-align: right;
}

.time-text {
  font-size: 20px;
  font-weight: 600;
  color: #ff6b6b;
  margin-bottom: 4px;
}

.greeting {
  font-size: 14px;
  color: #666;
}

.header-decoration {
  position: absolute;
  top: -50px;
  right: -50px;
  z-index: 1;
}

.decoration-circle {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 50%;
  opacity: 0.1;
  position: absolute;
}

.decoration-circle:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 30px;
  right: 30px;
  opacity: 0.2;
}

/* 快捷操作区 */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 0 20px;
  margin-bottom: 30px;
}

.action-item {
  background: white;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.action-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.action-item:active {
  transform: translateY(-1px);
}

.action-icon {
  font-size: 28px;
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.action-item:hover .action-icon {
  transform: scale(1.1);
}

.action-text {
  font-size: 12px;
  font-weight: 500;
  color: #333;
}

.action-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* 内容区域样式 */
.section {
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 15px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.title-icon {
  font-size: 20px;
}

.more-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 热销菜品样式 */
.dishes-scroll {
  display: flex;
  gap: 15px;
  padding: 0 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.dishes-scroll::-webkit-scrollbar {
  display: none;
}

.dish-card.horizontal {
  min-width: 280px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dish-card.horizontal:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.dish-card .dish-image {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.dish-card .dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hot-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ff6b6b;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
}

.dish-info {
  padding: 15px;
}

.dish-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.dish-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 10px 0;
  line-height: 1.4;
}

.dish-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.sales, .rating {
  font-size: 11px;
  color: #999;
}

.price-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 16px;
  font-weight: 600;
  color: #ff6b6b;
}

.add-btn {
  background: #ff6b6b;
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #ff5252;
  transform: scale(1.1);
}

/* 店长推荐样式 */
.recommended-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 0 20px;
}

.dish-card.featured {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dish-card.featured:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.recommended-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #667eea;
  color: white;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
}

.dish-tags {
  display: flex;
  gap: 6px;
  margin-bottom: 10px;
}

.tag {
  background: #f0f0f0;
  color: #666;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 10px;
}

.dish-card.featured .add-btn {
  width: auto;
  height: auto;
  padding: 6px 12px;
  border-radius: 12px;
}

.btn-text {
  font-size: 12px;
  font-weight: 500;
}

/* 分类导航样式 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 0 20px;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.category-count {
  font-size: 11px;
  color: #999;
}

/* 今日特惠样式 */
.offers-list {
  display: flex;
  gap: 15px;
  padding: 0 20px;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.offers-list::-webkit-scrollbar {
  display: none;
}

.offer-card {
  min-width: 250px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.offer-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.offer-image {
  position: relative;
  height: 100px;
  overflow: hidden;
}

.offer-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

.offer-info {
  padding: 15px;
}

.offer-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px 0;
}

.offer-desc {
  font-size: 12px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.offer-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: #e74c3c;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .welcome-header {
    padding: 16px; /* 移动端进一步减少 */
  }
  
  .restaurant-name {
    font-size: 20px;
  }
  
  .time-text {
    font-size: 16px;
  }
  
  .quick-actions {
    padding: 0 16px;
    gap: 12px;
  }
  
  .action-item {
    padding: 16px 8px;
  }
  
  .action-icon {
    font-size: 24px;
  }
  
  .action-text {
    font-size: 11px;
  }
  
  .section-header {
    padding: 0 16px 15px;
  }
  
  .dishes-scroll, .offers-list {
    padding: 0 16px;
  }
  
  .recommended-grid, .categories-grid {
    padding: 0 16px;
  }
  
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

    /* 购物车浮动按钮 */
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
</style>

<style>
/* 自定义添加购物车消息样式 */
.custom-add-cart-message {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  color: white !important;
  font-weight: 500 !important;
  border-radius: 12px !important;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3) !important;
  white-space: pre-line !important;
}

.custom-add-cart-message .el-message__content {
  color: white !important;
  line-height: 1.4 !important;
}

.custom-add-cart-message .el-message__closeBtn {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-add-cart-message .el-message__closeBtn:hover {
  color: white !important;
}
</style>