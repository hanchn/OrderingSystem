class TableManager {
  constructor() {
    this.brandId = null
    this.companyId = null
    this.shopId = null
    this.deskNumber = null
    this.isTestMode = false
    
    // 测试模式默认值
    this.testDefaults = {
      brandId: 1,
      companyId: 1,
      shopId: 1,
      deskNumber: 1
    }
  }

  // 从URL参数初始化所有信息
  initFromQuery(query) {
    // 检查是否为测试模式
    this.isTestMode = query.test === '1'
    
    if (this.isTestMode) {
      // 测试模式：使用默认值，但允许URL参数覆盖
      this.brandId = query.brandId ? parseInt(query.brandId) : this.testDefaults.brandId
      this.companyId = query.companyId ? parseInt(query.companyId) : this.testDefaults.companyId
      this.shopId = query.shopId ? parseInt(query.shopId) : this.testDefaults.shopId
      this.deskNumber = query.desk ? parseInt(query.desk) : this.testDefaults.deskNumber
    } else {
      // 正常模式：需要完整参数
      this.brandId = query.brandId ? parseInt(query.brandId) : null
      this.companyId = query.companyId ? parseInt(query.companyId) : null
      this.shopId = query.shopId ? parseInt(query.shopId) : null
      this.deskNumber = query.desk ? parseInt(query.desk) : null
    }
    
    // 保存到localStorage以便页面刷新后恢复
    if (this.isValid()) {
      localStorage.setItem('table_info', JSON.stringify({
        brandId: this.brandId,
        companyId: this.companyId,
        shopId: this.shopId,
        deskNumber: this.deskNumber,
        isTestMode: this.isTestMode
      }))
    }
  }

  // 从localStorage恢复信息
  restoreFromStorage() {
    const saved = localStorage.getItem('table_info')
    if (saved) {
      const { brandId, companyId, shopId, deskNumber, isTestMode } = JSON.parse(saved)
      this.brandId = brandId
      this.companyId = companyId
      this.shopId = shopId
      this.deskNumber = deskNumber
      this.isTestMode = isTestMode || false
    }
  }

  // 获取品牌ID
  getBrandId() {
    return this.brandId
  }

  // 获取公司ID
  getCompanyId() {
    return this.companyId
  }

  // 获取门店ID
  getShopId() {
    return this.shopId
  }

  // 获取桌号
  getDeskNumber() {
    return this.deskNumber
  }

  // 检查是否为测试模式
  getIsTestMode() {
    return this.isTestMode
  }

  // 获取完整的标识信息
  getFullIdentifier() {
    return {
      brandId: this.brandId,
      companyId: this.companyId,
      shopId: this.shopId,
      deskNumber: this.deskNumber,
      isTestMode: this.isTestMode
    }
  }

  // 获取桌号显示文本
  getTableDisplay() {
    if (this.isValid()) {
      const testModeText = this.isTestMode ? ' [测试模式]' : ''
      return `品牌${this.brandId} 公司${this.companyId} 门店${this.shopId} ${this.deskNumber}桌${testModeText}`
    }
    return '未知桌号'
  }

  // 获取简化显示文本
  getSimpleDisplay() {
    if (this.shopId && this.deskNumber) {
      const testModeText = this.isTestMode ? ' [测试]' : ''
      return `${this.shopId}店 ${this.deskNumber}桌${testModeText}`
    }
    return '未知桌号'
  }

  // 检查是否有有效的桌号信息
  isValid() {
    if (this.isTestMode) {
      // 测试模式下，只要有基本信息就认为有效
      return this.shopId && this.deskNumber
    }
    // 正常模式需要完整信息
    return this.brandId && this.companyId && this.shopId && this.deskNumber
  }

  // 检查基本信息是否完整（至少有门店和桌号）
  hasBasicInfo() {
    return this.shopId && this.deskNumber
  }

  // 清除桌号信息
  clear() {
    this.brandId = null
    this.companyId = null
    this.shopId = null
    this.deskNumber = null
    this.isTestMode = false
    localStorage.removeItem('table_info')
  }

  // 生成URL查询参数
  getQueryParams() {
    const params = {}
    
    if (this.isTestMode) {
      params.test = '1'
    }
    
    if (this.isValid()) {
      params.brandId = this.brandId
      params.companyId = this.companyId
      params.shopId = this.shopId
      params.desk = this.deskNumber
    }
    
    return params
  }

  // 设置测试模式默认值
  setTestDefaults(defaults) {
    this.testDefaults = { ...this.testDefaults, ...defaults }
  }
}

export const tableManager = new TableManager()