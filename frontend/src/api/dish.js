import request from './request'
import { tableManager } from '@/utils/table'

// 测试模式模拟数据
const mockData = {
  categories: [
    { id: 1, name: '热菜', sort: 1 },
    { id: 2, name: '凉菜', sort: 2 },
    { id: 3, name: '汤类', sort: 3 },
    { id: 4, name: '主食', sort: 4 },
    { id: 5, name: '饮品', sort: 5 }
  ],
  dishes: [
    // 热菜
    {
      id: 1,
      name: '宫保鸡丁',
      description: '经典川菜，鸡肉嫩滑，花生香脆',
      price: 28,
      image: 'https://via.placeholder.com/200x150/FF6B6B/FFFFFF?text=宫保鸡丁',
      categoryId: 1,
      available: true
    },
    {
      id: 2,
      name: '红烧肉',
      description: '肥而不腻，入口即化的经典家常菜',
      price: 35,
      image: 'https://via.placeholder.com/200x150/4ECDC4/FFFFFF?text=红烧肉',
      categoryId: 1,
      available: true
    },
    {
      id: 3,
      name: '麻婆豆腐',
      description: '麻辣鲜香，豆腐嫩滑',
      price: 18,
      image: 'https://via.placeholder.com/200x150/45B7D1/FFFFFF?text=麻婆豆腐',
      categoryId: 1,
      available: true
    },
    // 凉菜
    {
      id: 4,
      name: '凉拌黄瓜',
      description: '清爽开胃，酸甜可口',
      price: 12,
      image: 'https://via.placeholder.com/200x150/96CEB4/FFFFFF?text=凉拌黄瓜',
      categoryId: 2,
      available: true
    },
    {
      id: 5,
      name: '口水鸡',
      description: '麻辣鲜香，鸡肉嫩滑',
      price: 25,
      image: 'https://via.placeholder.com/200x150/FFEAA7/FFFFFF?text=口水鸡',
      categoryId: 2,
      available: true
    },
    // 汤类
    {
      id: 6,
      name: '西红柿鸡蛋汤',
      description: '酸甜开胃，营养丰富',
      price: 15,
      image: 'https://via.placeholder.com/200x150/DDA0DD/FFFFFF?text=西红柿鸡蛋汤',
      categoryId: 3,
      available: true
    },
    {
      id: 7,
      name: '冬瓜排骨汤',
      description: '清淡鲜美，营养滋补',
      price: 22,
      image: 'https://via.placeholder.com/200x150/98D8C8/FFFFFF?text=冬瓜排骨汤',
      categoryId: 3,
      available: true
    },
    // 主食
    {
      id: 8,
      name: '米饭',
      description: '优质大米，粒粒饱满',
      price: 3,
      image: 'https://via.placeholder.com/200x150/F7DC6F/FFFFFF?text=米饭',
      categoryId: 4,
      available: true
    },
    {
      id: 9,
      name: '蛋炒饭',
      description: '粒粒分明，香味浓郁',
      price: 12,
      image: 'https://via.placeholder.com/200x150/F8C471/FFFFFF?text=蛋炒饭',
      categoryId: 4,
      available: true
    },
    // 饮品
    {
      id: 10,
      name: '可乐',
      description: '冰爽可乐，解腻必备',
      price: 8,
      image: 'https://via.placeholder.com/200x150/85C1E9/FFFFFF?text=可乐',
      categoryId: 5,
      available: true
    },
    {
      id: 11,
      name: '鲜榨橙汁',
      description: '新鲜橙子现榨，维C丰富',
      price: 15,
      image: 'https://via.placeholder.com/200x150/F8C471/FFFFFF?text=鲜榨橙汁',
      categoryId: 5,
      available: true
    }
  ],
  shopInfo: {
    id: 1,
    name: '测试餐厅',
    address: '测试地址123号',
    phone: '400-123-4567',
    businessHours: '09:00-22:00'
  },
  brandInfo: {
    id: 1,
    name: '测试品牌',
    logo: 'https://via.placeholder.com/100x100/FF6B6B/FFFFFF?text=LOGO'
  },
  companyInfo: {
    id: 1,
    name: '测试公司',
    region: '测试区域'
  }
}

// 模拟API响应
function mockApiResponse(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          success: true,
          data: data,
          message: '请求成功'
        }
      })
    }, 300) // 模拟网络延迟
  })
}

export const dishApi = {
  // 获取菜品分类（支持多层级筛选）
  getCategories(params = {}) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse(mockData.categories)
    }
    return request.get('/categories', { params })
  },

  // 获取菜品列表（支持品牌、公司、门店筛选）
  getDishes(params = {}) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse(mockData.dishes)
    }
    return request.get('/dishes', { params })
  },

  // 获取单个菜品详情
  getDishById(id, params = {}) {
    if (tableManager.getIsTestMode()) {
      const dish = mockData.dishes.find(d => d.id === parseInt(id))
      return mockApiResponse(dish || null)
    }
    return request.get(`/dishes/${id}`, { params })
  },

  // 获取门店信息
  getShopInfo(shopId, params = {}) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse(mockData.shopInfo)
    }
    return request.get(`/shops/${shopId}`, { params })
  },

  // 获取品牌信息
  getBrandInfo(brandId) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse(mockData.brandInfo)
    }
    return request.get(`/brands/${brandId}`)
  },

  // 获取公司信息
  getCompanyInfo(companyId) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse(mockData.companyInfo)
    }
    return request.get(`/companies/${companyId}`)
  },

  // 提交订单（测试模式）
  submitOrder(orderData) {
    if (tableManager.getIsTestMode()) {
      return mockApiResponse({
        orderId: 'TEST_' + Date.now(),
        status: 'pending',
        message: '订单提交成功（测试模式）'
      })
    }
    return request.post('/orders', orderData)
  }
}