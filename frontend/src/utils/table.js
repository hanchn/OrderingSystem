class TableManager {
  constructor() {
    this.brandId = null
    this.companyId = null
    this.shopId = null
    this.deskNumber = null
  }

  // 从URL参数初始化所有信息
  initFromQuery(query) {
    this.brandId = query.brandId ? parseInt(query.brandId) : null
    this.companyId = query.companyId ? parseInt(query.companyId) : null
    this.shopId = query.shopId ? parseInt(query.shopId) : null
    this.deskNumber = query.desk ? parseInt(query.desk) : null
    
    // 保存到localStorage以便页面刷新后恢复
    if (this.isValid()) {
      localStorage.setItem('table_info', JSON.stringify({
        brandId: this.brandId,
        companyId: this.companyId,
        shopId: this.shopId,
        deskNumber: this.deskNumber
      }))
    }
  }

  // 从localStorage恢复信息
  restoreFromStorage() {
    const saved = localStorage.getItem('table_info')
    if (saved) {
      const { brandId, companyId, shopId, deskNumber } = JSON.parse(saved)
      this.brandId = brandId
      this.companyId = companyId
      this.shopId = shopId
      this.deskNumber = deskNumber
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

  // 获取完整的标识信息
  getFullIdentifier() {
    return {
      brandId: this.brandId,
      companyId: this.companyId,
      shopId: this.shopId,
      deskNumber: this.deskNumber
    }
  }

  // 获取桌号显示文本
  getTableDisplay() {
    if (this.isValid()) {
      return `品牌${this.brandId} 公司${this.companyId} 门店${this.shopId} ${this.deskNumber}桌`
    }
    return '未知桌号'
  }

  // 获取简化显示文本
  getSimpleDisplay() {
    if (this.shopId && this.deskNumber) {
      return `${this.shopId}店 ${this.deskNumber}桌`
    }
    return '未知桌号'
  }

  // 检查是否有有效的桌号信息
  isValid() {
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
    localStorage.removeItem('table_info')
  }

  // 生成URL查询参数
  getQueryParams() {
    if (this.isValid()) {
      return {
        brandId: this.brandId,
        companyId: this.companyId,
        shopId: this.shopId,
        desk: this.deskNumber
      }
    }
    return {}
  }
}

export const tableManager = new TableManager()