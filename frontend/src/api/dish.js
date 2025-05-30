import request from './request'
import { tableManager } from '@/utils/table'
import { mockData, createMockResponse } from '@/mock'

// 检查是否为测试模式
function isTestMode() {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('test') === '1'
}

// 获取菜品分类列表
export function getCategories() {
  if (isTestMode()) {
    return createMockResponse(mockData.categories)
  }
  
  return request({
    url: '/dish/category/list',
    method: 'get'
  })
}

// 根据分类ID获取菜品列表
export function getDishes(categoryId) {
  if (isTestMode()) {
    const dishes = categoryId 
      ? mockData.dishes.filter(dish => dish.categoryId === categoryId)
      : mockData.dishes
    
    return createMockResponse(dishes)
  }
  
  return request({
    url: '/dish/list',
    method: 'get',
    params: { categoryId }
  })
}

// 根据菜品ID获取菜品详情
export function getDishDetail(dishId) {
  if (isTestMode()) {
    // 确保dishId为数字类型进行比较
    const dish = mockData.dishes.find(dish => dish.id === parseInt(dishId))
    return createMockResponse(dish, dish ? '获取成功' : '菜品不存在')
  }
  
  return request({
    url: `/dish/${dishId}`,
    method: 'get'
  })
}

// 获取店铺信息
export function getShopInfo() {
  if (isTestMode()) {
    return createMockResponse(mockData.shop)
  }
  
  const { shopId } = tableManager.getTableInfo()
  return request({
    url: `/shop/${shopId}`,
    method: 'get'
  })
}

// 获取品牌信息
export function getBrandInfo() {
  if (isTestMode()) {
    return createMockResponse(mockData.brand)
  }
  
  const { brandId } = tableManager.getTableInfo()
  return request({
    url: `/brand/${brandId}`,
    method: 'get'
  })
}

// 获取公司信息
export function getCompanyInfo() {
  if (isTestMode()) {
    return createMockResponse(mockData.company)
  }
  
  const { companyId } = tableManager.getTableInfo()
  return request({
    url: `/company/${companyId}`,
    method: 'get'
  })
}