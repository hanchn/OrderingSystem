<template>
  <div class="profile-container">
    <!-- 头部 -->
    <div class="profile-header">
      <button class="home-btn" @click="goToHome">
        <span class="home-icon">🏠</span>
      </button>
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

    <!-- 当前账单 - 只有在有商品时才显示 -->
    <div class="current-bill-section" v-if="currentBill.items.length > 0">
      <div class="section-header">
        <h3 class="section-title">当前账单</h3>
        <div class="bill-status">待结算</div>
      </div>
      
      <div class="current-bill">
        <div class="bill-items">
          <div 
            v-for="item in currentBill.items" 
            :key="item.id"
            class="bill-item"
          >
            <div class="item-info">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-quantity">x{{ item.quantity }}</div>
            </div>
            <div class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</div>
          </div>
        </div>
        
        <div class="bill-summary">
          <div class="summary-row">
            <span class="summary-label">商品总计</span>
            <span class="summary-value">¥{{ currentBill.totalAmount.toFixed(2) }}</span>
          </div>
          <div class="summary-row total">
            <span class="summary-label">应付金额</span>
            <span class="summary-value">¥{{ currentBill.totalAmount.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="bill-actions">
          <button class="action-btn secondary" @click="viewCartDetail">查看详情</button>
          <button class="action-btn primary" @click="proceedToCheckout">去结算</button>
        </div>
      </div>
    </div>

    <!-- 功能菜单 -->
    <div class="menu-section">
      <div class="menu-item" @click="showHistoryModal = true">
        <div class="menu-icon">📋</div>
        <div class="menu-text">
          <div class="menu-title">历史账单</div>
          <div class="menu-desc">查看历史订单记录</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="showCurrentOrderModal = true">
        <div class="menu-icon">🍽️</div>
        <div class="menu-text">
          <div class="menu-title">当前订单</div>
          <div class="menu-desc">查看当前桌台订单</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="showServiceModal = true">
        <div class="menu-icon">🔔</div>
        <div class="menu-text">
          <div class="menu-title">呼叫服务</div>
          <div class="menu-desc">需要帮助请点击</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
      
      <div class="menu-item" @click="showTableInfoModal = true">
        <div class="menu-icon">ℹ️</div>
        <div class="menu-text">
          <div class="menu-title">桌台信息</div>
          <div class="menu-desc">查看当前桌台详情</div>
        </div>
        <div class="menu-arrow">→</div>
      </div>
    </div>

    <!-- 历史账单弹窗 -->
    <div class="modal-overlay" v-if="showHistoryModal" @click="showHistoryModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">历史账单</h3>
          <button class="modal-close" @click="showHistoryModal = false">×</button>
        </div>
        
        <div class="modal-body">
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
      </div>
    </div>

    <!-- 当前订单弹窗 -->
    <div class="modal-overlay" v-if="showCurrentOrderModal" @click="showCurrentOrderModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">当前订单</h3>
          <button class="modal-close" @click="showCurrentOrderModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="current-order-info">
            <div class="info-item">
              <span class="info-label">桌台：</span>
              <span class="info-value">{{ tableDisplay }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">状态：</span>
              <span class="info-value status-active">用餐中</span>
            </div>
            <div class="info-item">
              <span class="info-label">开台时间：</span>
              <span class="info-value">{{ formatTime(Date.now()) }}</span>
            </div>
          </div>
          
          <div class="current-order-items" v-if="currentBill.items.length > 0">
            <h4 class="items-title">已点商品</h4>
            <div class="order-items-list">
              <div v-for="item in currentBill.items" :key="item.id" class="order-item-row">
                <span class="item-name">{{ item.name }}</span>
                <span class="item-quantity">x{{ item.quantity }}</span>
                <span class="item-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
            <div class="order-total-row">
              <span class="total-label">合计：</span>
              <span class="total-amount">¥{{ currentBill.totalAmount.toFixed(2) }}</span>
            </div>
          </div>
          
          <div v-else class="empty-order">
            <div class="empty-icon">🍽️</div>
            <div class="empty-text">暂无点餐记录</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 呼叫服务弹窗 -->
    <div class="modal-overlay" v-if="showServiceModal" @click="showServiceModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">呼叫服务</h3>
          <button class="modal-close" @click="showServiceModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="service-options">
            <div class="service-item" @click="callWaiter">
              <div class="service-icon">👨‍💼</div>
              <div class="service-text">
                <div class="service-title">呼叫服务员</div>
                <div class="service-desc">需要点餐或咨询</div>
              </div>
            </div>
            
            <div class="service-item" @click="requestBill">
              <div class="service-icon">🧾</div>
              <div class="service-text">
                <div class="service-title">要求买单</div>
                <div class="service-desc">结账离开</div>
              </div>
            </div>
            
            <div class="service-item" @click="requestClean">
              <div class="service-icon">🧹</div>
              <div class="service-text">
                <div class="service-title">清理桌面</div>
                <div class="service-desc">收拾餐具</div>
              </div>
            </div>
            
            <div class="service-item" @click="otherService">
              <div class="service-icon">❓</div>
              <div class="service-text">
                <div class="service-title">其他服务</div>
                <div class="service-desc">其他需求</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 桌台信息弹窗 -->
    <div class="modal-overlay" v-if="showTableInfoModal" @click="showTableInfoModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">桌台信息</h3>
          <button class="modal-close" @click="showTableInfoModal = false">×</button>
        </div>
        
        <div class="modal-body">
          <div class="table-info-details">
            <div class="info-row">
              <span class="info-label">品牌：</span>
              <span class="info-value">{{ route.query.brandId || '未知' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">公司：</span>
              <span class="info-value">{{ route.query.companyId || '未知' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">店铺：</span>
              <span class="info-value">{{ route.query.shopId || '未知' }}店</span>
            </div>
            <div class="info-row">
              <span class="info-label">桌号：</span>
              <span class="info-value">{{ route.query.desk || '未知' }}号桌</span>
            </div>
            <div class="info-row">
              <span class="info-label">容纳人数：</span>
              <span class="info-value">4-6人</span>
            </div>
            <div class="info-row">
              <span class="info-label">桌台状态：</span>
              <span class="info-value status-active">使用中</span>
            </div>
          </div>
          
          <div class="table-qr-info">
            <div class="qr-title">扫码点餐</div>
            <div class="qr-desc">其他客人可扫描桌台二维码加入点餐</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航 -->
    <BottomNavigation />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/utils/cart'
import BottomNavigation from '@/components/BottomNavigation.vue'
import { mockData } from '@/mock'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const orderHistory = ref([])

// 弹窗状态
const showHistoryModal = ref(false)
const showCurrentOrderModal = ref(false)
const showServiceModal = ref(false)
const showTableInfoModal = ref(false)

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

// 当前账单计算属性
const currentBill = computed(() => {
  const items = cartStore.items.value || []
  const totalAmount = cartStore.totalPrice.value || 0
  
  return {
    items,
    totalAmount
  }
})

// 查看购物车详情
const viewCartDetail = () => {
  router.push({
    path: '/cart',
    query: route.query
  })
}

// 去结算
const proceedToCheckout = () => {
  if (currentBill.value.items.length === 0) {
    alert('购物车为空，请先添加商品')
    return
  }
  
  if (confirm(`确认结算？\n总金额：¥${currentBill.value.totalAmount.toFixed(2)}`)) {
    alert('结算功能开发中...')
  }
}

// 服务相关功能
const callWaiter = () => {
  showServiceModal.value = false
  alert('已通知服务员，请稍等...')
}

const requestBill = () => {
  showServiceModal.value = false
  if (confirm('确定要求买单吗？')) {
    alert('已通知服务员准备账单...')
  }
}

const requestClean = () => {
  showServiceModal.value = false
  alert('已通知服务员清理桌面...')
}

const otherService = () => {
  showServiceModal.value = false
  const request = prompt('请描述您的需求：')
  if (request) {
    alert('已将您的需求发送给服务员...')
  }
}

const loadOrderHistory = () => {
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
  cartStore.restoreFromStorage()
})

// 添加跳转到首页的方法
const goToHome = () => {
  router.push({
    path: '/',
    query: route.query
  })
}
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
  position: relative;
}

.home-btn {
  position: absolute;
  top: 20px;
  left: 20px;
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
  z-index: 10;
}

.home-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.home-icon {
  font-size: 18px;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 60px; /* 为Home按钮留出空间 */
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.user-details {
  flex: 1;
}

.username {
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.table-info {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* 当前账单样式 */
.current-bill-section {
  margin: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.bill-status {
  background: #ff6b6b;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.current-bill {
  padding: 20px;
}

.bill-items {
  margin-bottom: 20px;
}

.bill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.bill-item:last-child {
  border-bottom: none;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-quantity {
  color: #666;
  font-size: 14px;
}

.item-price {
  font-weight: 600;
  color: #ff6b6b;
}

.bill-summary {
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding-top: 16px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.summary-row.total {
  font-size: 18px;
  font-weight: 600;
  color: #ff6b6b;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 12px;
  margin-top: 8px;
}

.summary-label {
  color: #666;
}

.summary-value {
  font-weight: 600;
}

.bill-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.secondary {
  background: #f8f9fa;
  color: #666;
  border: 1px solid #e9ecef;
}

.action-btn.secondary:hover {
  background: #e9ecef;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 其他现有样式保持不变 */
.menu-section {
  margin: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(4px);
}

.menu-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin-right: 16px;
}

.menu-text {
  flex: 1;
}

.menu-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.menu-desc {
  font-size: 14px;
  color: #666;
}

.menu-arrow {
  font-size: 18px;
  color: #ccc;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-arrow {
  color: #667eea;
  transform: translateX(4px);
}

.orders-section {
  margin: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #666;
}

.orders-list {
  max-height: 400px;
  overflow-y: auto;
}

.order-item {
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item:hover {
  background: rgba(102, 126, 234, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.order-number {
  font-weight: 600;
  color: #333;
}

.order-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.order-status.pending {
  background: #fff3cd;
  color: #856404;
}

.order-status.confirmed {
  background: #d4edda;
  color: #155724;
}

.order-status.preparing {
  background: #cce5ff;
  color: #004085;
}

.order-status.completed {
  background: #d1ecf1;
  color: #0c5460;
}

.order-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.order-time {
  color: #666;
  font-size: 14px;
}

.order-total {
  font-weight: 600;
  color: #ff6b6b;
}

.order-items {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

.empty-orders {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-text {
  font-size: 16px;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .profile-header {
    padding: 20px 16px;
  }
  
  .current-bill-section,
  .menu-section,
  .orders-section {
    margin: 16px;
  }
  
  .bill-actions {
    flex-direction: column;
  }
  
  .action-btn {
    padding: 14px;
  }
}

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.modal-body {
  padding: 0;
  max-height: 60vh;
  overflow-y: auto;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 服务选项样式 */
.service-options {
  padding: 20px;
}

.service-option {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-bottom: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.service-option:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  transform: translateY(-2px);
}

.service-option:last-child {
  margin-bottom: 0;
}

.service-icon {
  font-size: 24px;
  margin-right: 16px;
  width: 40px;
  text-align: center;
}

.service-text {
  flex: 1;
}

.service-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.service-desc {
  color: #666;
  font-size: 14px;
}

/* 桌台信息样式 */
.table-details {
  padding: 20px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  color: #666;
  font-weight: 500;
}

.detail-value {
  color: #333;
  font-weight: 600;
}

/* 当前订单详情样式 */
.current-order-content {
  padding: 20px;
  text-align: center;
}

.no-order-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-order-text {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.order-action-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.order-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端优化 */
@media (max-width: 480px) {
  .modal-overlay {
    padding: 10px;
  }
  
  .modal-content {
    max-height: 90vh;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-title {
    font-size: 16px;
  }
  
  .service-options,
  .table-details,
  .current-order-content {
    padding: 16px;
  }
  
  .service-option {
    padding: 12px;
  }
}
</style>