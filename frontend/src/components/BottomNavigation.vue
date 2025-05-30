<template>
  <div class="bottom-nav">
    <div 
      v-for="item in navItems" 
      :key="item.name"
      :class="['nav-item', { active: currentRoute === item.path }]"
      @click="navigateTo(item.path)"
    >
      <div class="nav-icon">{{ item.icon }}</div>
      <div class="nav-text">{{ item.label }}</div>
      <div class="nav-badge" v-if="item.badge && item.badge > 0">{{ item.badge }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/utils/cart'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()

const currentRoute = computed(() => route.path)

const navItems = computed(() => [
  {
    name: 'home',
    path: '/',
    icon: '🏠',
    label: '首页'
  },
  {
    name: 'menu',
    path: '/menu',
    icon: '📋',
    label: '菜单'
  },
  {
    name: 'cart',
    path: '/cart',
    icon: '🛒',
    label: '购物车',
    badge: cartStore.itemCount
  },
  {
    name: 'profile',
    path: '/profile',
    icon: '👤',
    label: '我的'
  }
])

const navigateTo = (path) => {
  // 保持当前的查询参数
  router.push({
    path,
    query: route.query
  })
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-top: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1000;
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 12px;
  position: relative;
  min-width: 60px;
}

.nav-item:hover {
  background: rgba(255, 107, 107, 0.1);
  transform: translateY(-2px);
}

.nav-item.active {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
}

.nav-item.active .nav-icon {
  transform: scale(1.1);
}

.nav-text {
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-item.active .nav-text {
  font-weight: 600;
}

.nav-badge {
  position: absolute;
  top: 2px;
  right: 8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  border: 2px solid white;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* 响应式优化 */
@media (max-width: 480px) {
  .bottom-nav {
    height: 65px;
  }
  
  .nav-item {
    padding: 6px 12px;
    min-width: 50px;
  }
  
  .nav-icon {
    font-size: 18px;
  }
  
  .nav-text {
    font-size: 11px;
  }
}
</style>