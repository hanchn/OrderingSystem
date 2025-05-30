<template>
  <div class="menu-management-container">
    <!-- 头部 -->
    <div class="management-header">
      <h1 class="page-title">菜单管理</h1>
      <div class="test-mode-toggle">
        <label class="toggle-label">
          <input 
            type="checkbox" 
            v-model="isTestMode"
            @change="toggleTestMode"
          />
          <span class="toggle-slider"></span>
          <span class="toggle-text">测试模式</span>
        </label>
      </div>
    </div>

    <!-- 管理功能卡片 -->
    <div class="management-grid">
      <div class="management-card" @click="goToMenuMaintenance">
        <div class="card-icon">📋</div>
        <h3 class="card-title">菜单维护</h3>
        <p class="card-description">管理菜品信息、价格、描述等</p>
      </div>

      <div class="management-card" @click="goToDishStatus">
        <div class="card-icon">🔄</div>
        <h3 class="card-title">菜品上下架</h3>
        <p class="card-description">控制菜品的可用状态</p>
      </div>

      <div class="management-card" @click="goToTagManagement">
        <div class="card-icon">🏷️</div>
        <h3 class="card-title">标签维护</h3>
        <p class="card-description">管理招牌、经典、辣等标签</p>
      </div>

      <div class="management-card" @click="goToModuleManagement">
        <div class="card-icon">📦</div>
        <h3 class="card-title">模块维护</h3>
        <p class="card-description">管理店长推荐、新品等模块</p>
      </div>

      <div class="management-card" @click="goToCategoryManagement">
        <div class="card-icon">📂</div>
        <h3 class="card-title">分类管理</h3>
        <p class="card-description">管理菜品分类和排序</p>
      </div>

      <div class="management-card" @click="goToStatistics">
        <div class="card-icon">📊</div>
        <h3 class="card-title">数据统计</h3>
        <p class="card-description">查看菜品销售数据</p>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="quick-actions">
      <h2 class="section-title">快捷操作</h2>
      <div class="action-buttons">
        <button class="action-btn primary" @click="addNewDish">
          <span class="btn-icon">➕</span>
          添加新菜品
        </button>
        <button class="action-btn secondary" @click="batchOperation">
          <span class="btn-icon">📝</span>
          批量操作
        </button>
        <button class="action-btn secondary" @click="exportData">
          <span class="btn-icon">📤</span>
          导出数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const isTestMode = ref(false)

const toggleTestMode = () => {
  const mode = isTestMode.value ? '测试模式' : '正式模式'
  ElMessage({
    message: `已切换到${mode}`,
    type: 'info',
    duration: 2000
  })
  
  // 这里可以设置全局的测试模式状态
  localStorage.setItem('adminTestMode', isTestMode.value)
}

// 导航方法
const goToMenuMaintenance = () => {
  router.push('/admin/menu/maintenance')
}

const goToDishStatus = () => {
  router.push('/admin/menu/status')
}

const goToTagManagement = () => {
  router.push('/admin/menu/tags')
}

const goToModuleManagement = () => {
  router.push('/admin/menu/modules')
}

const goToCategoryManagement = () => {
  router.push('/admin/menu/categories')
}

const goToStatistics = () => {
  router.push('/admin/menu/statistics')
}

// 快捷操作
const addNewDish = () => {
  router.push('/admin/menu/maintenance?action=add')
}

const batchOperation = () => {
  router.push('/admin/menu/batch')
}

const exportData = () => {
  ElMessage({
    message: '数据导出功能开发中...',
    type: 'info'
  })
}
</script>

<style scoped>
.menu-management-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.management-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.page-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.test-mode-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.toggle-label input {
  display: none;
}

.toggle-slider {
  width: 50px;
  height: 24px;
  background: #ccc;
  border-radius: 12px;
  position: relative;
  transition: background 0.3s;
}

.toggle-slider::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.3s;
}

.toggle-label input:checked + .toggle-slider {
  background: #667eea;
}

.toggle-label input:checked + .toggle-slider::before {
  transform: translateX(26px);
}

.toggle-text {
  font-weight: 500;
  color: #333;
}

.management-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.management-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.management-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.15);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.card-title {
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.card-description {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.quick-actions {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.section-title {
  margin: 0 0 20px 0;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.action-btn.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-icon {
  font-size: 18px;
}

@media (max-width: 768px) {
  .management-header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  .management-grid {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    justify-content: center;
  }
}
</style>