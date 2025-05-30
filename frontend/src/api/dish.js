import request from './request'

export const dishApi = {
  // 获取菜品分类（支持多层级筛选）
  getCategories(params = {}) {
    return request.get('/categories', { params })
  },

  // 获取菜品列表（支持品牌、公司、门店筛选）
  getDishes(params = {}) {
    return request.get('/dishes', { params })
  },

  // 获取单个菜品详情
  getDishById(id, params = {}) {
    return request.get(`/dishes/${id}`, { params })
  },

  // 获取门店信息
  getShopInfo(shopId, params = {}) {
    return request.get(`/shops/${shopId}`, { params })
  },

  // 获取品牌信息
  getBrandInfo(brandId) {
    return request.get(`/brands/${brandId}`)
  },

  // 获取公司信息
  getCompanyInfo(companyId) {
    return request.get(`/companies/${companyId}`)
  }
}