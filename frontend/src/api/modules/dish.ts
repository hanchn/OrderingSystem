import request from '../request'
import type { Dish, Category, ApiResponse } from '@/types'

export const dishApi = {
  // 获取菜品列表
  getDishes: (params?: {
    categoryId?: number
    status?: string
    page?: number
    limit?: number
  }) => {
    return request.get<ApiResponse<{ dishes: Dish[]; total: number }>>('/dishes', { params })
  },

  // 获取菜品详情
  getDishById: (id: number) => {
    return request.get<ApiResponse<Dish>>(`/dishes/${id}`)
  },

  // 创建菜品
  createDish: (data: Partial<Dish>) => {
    return request.post<ApiResponse<Dish>>('/dishes', data)
  },

  // 更新菜品
  updateDish: (id: number, data: Partial<Dish>) => {
    return request.put<ApiResponse<Dish>>(`/dishes/${id}`, data)
  },

  // 删除菜品
  deleteDish: (id: number) => {
    return request.delete<ApiResponse>(`/dishes/${id}`)
  },

  // 获取分类列表
  getCategories: () => {
    return request.get<ApiResponse<Category[]>>('/categories')
  },

  // 创建分类
  createCategory: (data: Partial<Category>) => {
    return request.post<ApiResponse<Category>>('/categories', data)
  },

  // 更新分类
  updateCategory: (id: number, data: Partial<Category>) => {
    return request.put<ApiResponse<Category>>(`/categories/${id}`, data)
  },

  // 删除分类
  deleteCategory: (id: number) => {
    return request.delete<ApiResponse>(`/categories/${id}`)
  }
}