<template>
  <div class="menu-container">
    <!-- 桌号显示 -->
    <div class="table-info">
      <el-tag type="primary" size="large">
        {{ tableDisplay }}
      </el-tag>
    </div>

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
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { dishApi } from '@/api/dish'
import { cartManager } from '@/utils/cart'
import { tableManager } from '@/utils/table'

export default {
  name: 'MenuView',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const categories = ref([])
    const dishes = ref([])
    const activeCategory = ref('')
    const cartItems = ref([])
    const tableDisplay = ref('')

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

    // 初始化桌号信息
    const initTableInfo = () => {
      // 从URL参数初始化
      tableManager.initFromQuery(route.query)
      
      // 如果URL没有参数，尝试从localStorage恢复
      if (!tableManager.isValid()) {
        tableManager.restoreFromStorage()
      }
      
      // 更新显示
      tableDisplay.value = tableManager.getTableDisplay()
      
      // 如果仍然没有有效的桌号信息，显示警告
      if (!tableManager.isValid()) {
        ElMessage.warning('未检测到桌号信息，请扫描桌上的二维码')
      }
    }

    // 方法
    const loadCategories = async () => {
      try {
        const response = await dishApi.getCategories({
          storeId: tableManager.getStoreId()
        })
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
        const response = await dishApi.getDishes({ 
          status: 'active',
          storeId: tableManager.getStoreId()
        })
        dishes.value = response.data.data.dishes
      } catch (error) {
        ElMessage.error('加载菜品失败')
      }
    }

    const addToCart = (dish) => {
      cartManager.addItem(dish)
      cartItems.value = cartManager.getItems()
      ElMessage.success(`${dish.name} 已加入购物车`)
    }

    const goToCart = () => {
      router.push({
        path: '/cart',
        query: route.query // 保持URL参数
      })
    }

    const handleCategoryChange = () => {
      // 分类切换逻辑
    }

    onMounted(() => {
      initTableInfo()
      loadCategories()
      loadDishes()
      cartItems.value = cartManager.getItems()
    })

    return {
      categories,
      dishes,
      activeCategory,
      cartItems,
      tableDisplay,
      filteredDishes,
      cartItemCount,
      addToCart,
      goToCart,
      handleCategoryChange
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

.table-info {
  text-align: center;
  margin-bottom: 20px;
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
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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
  padding: 15px;
}

.dish-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.dish-description {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dish-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
}

.cart-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}
</style>