<template>
  <div class="profile-container">
    <!-- 头部 -->
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar">
          <span class="avatar-icon">👤</span>
        </div>
        <div class="user-details">
          <h2 class="username">用户{{ tableNumber }}</h2>
          <p class="table-info">{{ tableDisplay }}</p>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section">
      <div class="menu-item" @click="viewOrderHistory">
        <div class="menu-icon">📋</div>
        <div class="menu-text">
          <div class="menu-title">历史账单</div>
          <div class="menu-desc">查看历史订单记录</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="viewCurrentOrder">
        <div class="menu-icon">🍽️</div>
        <div class="menu-text">
          <div class="menu-title">当前订单</div>
          <div class="menu-desc">查看当前桌台订单</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="callService">
        <div class="menu-icon">🔔</div>
        <div class="menu-text">
          <div class="menu-title">呼叫服务</div>
          <div class="menu-desc">需要帮助请点击</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="viewTableInfo">
        <div class="menu-icon">ℹ️</div>
        <div class="menu-text">
          <div class="menu-title">桌台信息</div>
          <div class="menu-desc">查看当前桌台详情</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
    </div>

    <!-- 历史账单列表 -->
    <div class="orders-section" v-if="showOrderHistory">
      <div class="section-header">
        <h3 class="section-title">历史账单</h3>
        <button class="close-btn" @click="showOrderHistory = false">×</button>
      </div>
      
      <div class="orders-list">
        <div 
          v-for="order in orderHistory" 
          :key="order.id"
          class="order-item"
          @click="viewOrderDetail(order)"
        >
          <div class="order-header">
            <div class="order-number">订单 #{{ order.orderNumber }}</div>
            <div class="order-status" :class="order.status">{{ getStatusText(order.status) }}</div>
          </div>
          <div class="order-info">
            <div class="order-time">{{ formatTime(order.createTime) }}</div>
            <div class="order-total">¥{{ order.totalAmount.toFixed(2) }}</div>
          </div>
          <div class="order-items">
            <span v-for="(item, index) in order.items.slice(0, 3)" :key="item.id">
              {{ item.name }}{{ index < Math.min(order.items.length, 3) - 1 ? '、' : '' }}
            </span>
            <span v-if="order.items.length > 3">等{{ order.items.length }}件商品</span>
          </div>
        </div>
        
        <div v-if="orderHistory.length === 0" class="empty-orders">
          <div class="empty-icon">📋</div>
          <div class="empty-text">暂无历史订单</div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { mockData } from '@/mock'

const route = useRoute()
const showOrderHistory = ref(false)
const orderHistory = ref([])

const tableNumber = computed(() => {
  return route.query.desk || '未知'
})

const tableDisplay = computed(() => {
  const { shopId, desk } = route.query
  if (shopId && desk) {
    return `${shopId}店 ${desk}号桌`
  }
  return '桌台信息'
})

const viewOrderHistory = () => {
  showOrderHistory.value = true
  loadOrderHistory()
}

const viewCurrentOrder = () => {
  alert('当前订单功能开发中...')
}

const callService = () => {
  if (confirm('确定要呼叫服务员吗？')) {
    alert('已通知服务员，请稍等...')
  }
}

const viewTableInfo = () => {
  const info = `桌台信息：\n店铺：${route.query.shopId || '未知'}\n桌号：${route.query.desk || '未知'}\n品牌：${route.query.brandId || '未知'}\n公司：${route.query.companyId || '未知'}`
  alert(info)
}

const loadOrderHistory = () => {
  // 使用mock数据
  orderHistory.value = mockData.orders || []
}

const viewOrderDetail = (order) => {
  const items = order.items.map(item => `${item.name} x${item.quantity}`).join('\n')
  const detail = `订单详情：\n订单号：${order.orderNumber}\n时间：${formatTime(order.createTime)}\n状态：${getStatusText(order.status)}\n总金额：¥${order.totalAmount.toFixed(2)}\n\n商品清单：\n${items}`
  alert(detail)
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': '待处理',
    'confirmed': '已确认',
    'preparing': '制作中',
    'ready': '待取餐',
    'completed': '已完成',
    'cancelled': '已取消'
  }
  return statusMap[status] || status
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  loadOrderHistory()
})
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 70px;
}

.profile-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 24px;
  color: white;
}

.username {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #333;
}

.table-info {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.menu-section {
  background: white;
  margin: 20px;
  border-radius: 16px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: #f8f9fa;
}

.menu-icon {
  font-size: 20px;
  margin-right: 16px;
  width: 24px;
  text-align: center;
}

.menu-text {
  flex: 1;
}

.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.menu-desc {
  font-size: 12px;
  color: #666;
}

.menu-arrow {
  font-size: 16px;
  color: #ccc;
}

.orders-section {
  background: white;
  margin: 20px;
  border-radius: 16px;
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: #f8f9fa;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #e9ecef;
}

.orders-list {
  max-height: 400px;
  overflow-y: auto;
}

.order-item {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item:hover {
  background: #f8f9fa;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.order-number {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.order-status {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.order-status.completed {
  background: #d4edda;
  color: #155724;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.cancelled {
  background: #f8d7da;
  color: #721c24;
}

.order-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.order-time {
  font-size: 12px;
  color: #666;
}

.order-total {
  font-size: 14px;
  font-weight: 600;
  color: #ff6b6b;
}

.order-items {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
}

.empty-orders {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.empty-text {
  font-size: 14px;
  color: #666;
}
</style>