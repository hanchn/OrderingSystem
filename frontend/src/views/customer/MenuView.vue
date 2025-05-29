<template>
  <div class="menu-container">
    <!-- 分类导航 -->
    <div class="category-nav">
      <el-tabs v-model="activeCategory" @tab-click="handleCategoryChange">
        <el-tab-pane 
          v-for="category in categories" 
          :key="category.id"
          :label="category.name" 
          :name="category.id.toString()"
        />
      </el-tabs>
    </div>

    <!-- 菜品列表 -->
    <div class="dishes-grid">
      <div 
        v-for="dish in filteredDishes" 
        :key="dish.id" 
        class="dish-card"
      >
        <img :src="dish.image" :alt="dish.name" class="dish-image" />
        <div class="dish-info">
          <h3 class="dish-name">{{ dish.name }}</h3>
          <p class="dish-description">{{ dish.description }}</p>
          <div class="dish-footer">
            <span class="dish-price">¥{{ dish.price }}</span>
            <el-button 
              type="primary" 
              size="small" 
              @click="addToCart(dish)"
            >
              加入购物车
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 购物车悬浮按钮 -->
    <div class="cart-float" @click="goToCart">
      <el-badge :value="cartItemCount" :hidden="cartItemCount === 0">
        <el-button type="primary" size="large" circle>
          <el-icon><ShoppingCart /></el-icon>
        </el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { dishApi } from '@/api/dish'
import { cartManager } from '@/utils/cart'

export default {
  name: 'MenuView',
  setup() {
    const router = useRouter()
    const categories = ref([])
    const dishes = ref([])
    const activeCategory = ref('')
    const cartItems = ref([])

    // 计算属性
    const filteredDishes = computed(() => {
      if (!activeCategory.value) return dishes.value
      return dishes.value.filter(dish => 
        dish.categoryId.toString() === activeCategory.value
      )
    })

    const cartItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0)
    })

    // 方法
    const loadCategories = async () => {
      try {
        const response = await dishApi.getCategories()
        categories.value = response.data.data
        if (categories.value.length > 0) {
          activeCategory.value = categories.value[0].id.toString()
        }
      } catch (error) {
        ElMessage.error('加载分类失败')
      }
    }

    const loadDishes = async () => {
      try {
        const response = await dishApi.getDishes({ status: 'active' })
        dishes.value = response.data.data.dishes
      } catch (error) {
        ElMessage.error('加载菜品失败')
      }
    }

    const loadCart = () => {
      cartItems.value = cartManager.getCart()
    }

    const addToCart = (dish) => {
      cartManager.addToCart(dish, 1)
      cartItems.value = cartManager.getCart()
      ElMessage.success(`${dish.name} 已加入购物车`)
    }

    const handleCategoryChange = (tab) => {
      activeCategory.value = tab.name
    }

    const goToCart = () => {
      router.push('/cart')
    }

    // 生命周期
    onMounted(() => {
      loadCategories()
      loadDishes()
      loadCart()
    })

    return {
      categories,
      dishes,
      activeCategory,
      cartItems,
      filteredDishes,
      cartItemCount,
      addToCart,
      handleCategoryChange,
      goToCart
    }
  }
}
</script>

<style scoped>
.menu-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.category-nav {
  margin-bottom: 20px;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
}

.dish-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
}

.dish-card:hover {
  transform: translateY(-2px);
}

.dish-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.dish-info {
  padding: 16px;
}

.dish-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.dish-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.cart-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>