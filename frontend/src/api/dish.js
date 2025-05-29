import request from './request'

export const dishApi = {
  // 获取菜品列表
  getDishes: (params = {}) => {
    return request.get('/dishes', { params })
  },

  // 获取菜品详情
  getDishById: (id) => {
    return request.get(`/dishes/${id}`)
  },

  // 创建菜品
  createDish: (data) => {
    return request.post('/dishes', data)
  },

  // 更新菜品
  updateDish: (id, data) => {
    return request.put(`/dishes/${id}`, data)
  },

  // 删除菜品
  deleteDish: (id) => {
    return request.delete(`/dishes/${id}`)
  },

  // 获取分类列表
  getCategories: () => {
    return request.get('/categories')
  },

  // 创建分类
  createCategory: (data) => {
    return request.post('/categories', data)
  },

  // 更新分类
  updateCategory: (id, data) => {
    return request.put(`/categories/${id}`, data)
  },

  // 删除分类
  deleteCategory: (id) => {
    return request.delete(`/categories/${id}`)
  }
}