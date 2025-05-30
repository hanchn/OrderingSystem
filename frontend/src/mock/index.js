// 统一导出所有mock数据
export { mockCategories } from './categories'
export { mockDishes } from './dishes'
export { mockShop } from './shop'
export { mockBrand } from './brand'
export { mockCompany } from './company'
export { mockOrders } from './orders'
export { mockTables } from './tables'

// 组合的mock数据对象
export const mockData = {
  categories: mockCategories,
  dishes: mockDishes,
  shop: mockShop,
  brand: mockBrand,
  company: mockCompany,
  orders: mockOrders,
  tables: mockTables
}

// 模拟API响应格式
export const createMockResponse = (data, message = '获取成功') => {
  return Promise.resolve({
    code: 200,
    data,
    message,
    timestamp: Date.now()
  })
}

// 模拟API错误响应
export const createMockError = (message = '请求失败', code = 500) => {
  return Promise.reject({
    code,
    message,
    timestamp: Date.now()
  })
}