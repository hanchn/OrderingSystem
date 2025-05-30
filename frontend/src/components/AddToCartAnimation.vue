<template>
  <div class="add-to-cart-animation">
    <!-- 飞行的菜品图片 -->
    <div 
      v-if="isAnimating" 
      class="flying-dish"
      :style="flyingDishStyle"
    >
      <img :src="dishImage" :alt="dishName" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isAnimating = ref(false)
const dishImage = ref('')
const dishName = ref('')
const startX = ref(0)
const startY = ref(0)
const endX = ref(0)
const endY = ref(0)
const progress = ref(0)

// 计算飞行菜品的样式
const flyingDishStyle = computed(() => {
  if (!isAnimating.value) return {}
  
  // 抛物线轨迹计算
  const t = progress.value
  const x = startX.value + (endX.value - startX.value) * t
  const y = startY.value + (endY.value - startY.value) * t - 100 * Math.sin(Math.PI * t)
  
  // 缩放效果：开始大，结束小
  const scale = 1 - t * 0.7
  
  return {
    left: `${x}px`,
    top: `${y}px`,
    transform: `scale(${scale})`,
    opacity: 1 - t * 0.3
  }
})

// 开始动画
const startAnimation = (dish, clickEvent) => {
  if (isAnimating.value) return
  
  // 设置菜品信息
  dishImage.value = dish.image
  dishName.value = dish.name
  
  // 获取点击位置
  const rect = clickEvent.target.getBoundingClientRect()
  startX.value = rect.left + rect.width / 2
  startY.value = rect.top + rect.height / 2
  
  // 获取购物车图标位置
  const cartIcon = document.querySelector('.nav-item[data-cart] .nav-icon')
  if (cartIcon) {
    const cartRect = cartIcon.getBoundingClientRect()
    endX.value = cartRect.left + cartRect.width / 2
    endY.value = cartRect.top + cartRect.height / 2
  }
  
  // 开始动画
  isAnimating.value = true
  progress.value = 0
  
  // 动画进度控制
  const duration = 800 // 动画持续时间
  const startTime = Date.now()
  
  const animate = () => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min(elapsed / duration, 1)
    
    if (progress.value < 1) {
      requestAnimationFrame(animate)
    } else {
      // 动画结束
      isAnimating.value = false
      // 触发购物车跳跃动画
      triggerCartBounce()
    }
  }
  
  requestAnimationFrame(animate)
}

// 触发购物车跳跃动画
const triggerCartBounce = () => {
  const cartItem = document.querySelector('.nav-item[data-cart]')
  if (cartItem) {
    cartItem.classList.add('cart-bounce')
    setTimeout(() => {
      cartItem.classList.remove('cart-bounce')
    }, 600)
  }
}

// 暴露方法给父组件
defineExpose({
  startAnimation
})
</script>

<style scoped>
.add-to-cart-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
}

.flying-dish {
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: none;
}

.flying-dish img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>