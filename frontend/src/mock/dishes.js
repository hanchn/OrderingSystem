export const mockDishes = [
  // 热菜 (增加到12个)
  {
    id: 1,
    name: '宫保鸡丁',
    price: 28.00,
    description: '经典川菜，鸡肉嫩滑，花生香脆，麻辣鲜香',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['招牌', '辣'],
    nutrition: { calories: 320, protein: 25, fat: 18, carbs: 12 }
  },
  {
    id: 2,
    name: '麻婆豆腐',
    price: 18.00,
    description: '麻辣鲜香，豆腐嫩滑，下饭神器',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['经典', '辣', '素食'],
    nutrition: { calories: 180, protein: 12, fat: 10, carbs: 8 }
  },
  {
    id: 3,
    name: '红烧肉',
    price: 35.00,
    description: '肥瘦相间，入口即化，色泽红亮',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['招牌', '甜'],
    nutrition: { calories: 450, protein: 20, fat: 35, carbs: 15 }
  },
  {
    id: 4,
    name: '糖醋里脊',
    price: 32.00,
    description: '酸甜可口，外酥内嫩，老少皆宜',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['酸甜', '儿童喜爱'],
    nutrition: { calories: 380, protein: 22, fat: 20, carbs: 25 }
  },
  {
    id: 18,
    name: '水煮鱼',
    price: 48.00,
    description: '鱼肉鲜嫩，麻辣过瘾，川菜经典',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['招牌', '麻辣', '鲜嫩'],
    nutrition: { calories: 350, protein: 30, fat: 20, carbs: 8 }
  },
  {
    id: 19,
    name: '回锅肉',
    price: 30.00,
    description: '肥瘦相间，香辣下饭，四川名菜',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['香辣', '下饭', '经典'],
    nutrition: { calories: 420, protein: 25, fat: 30, carbs: 12 }
  },
  {
    id: 20,
    name: '鱼香肉丝',
    price: 26.00,
    description: '酸甜微辣，肉丝嫩滑，鱼香浓郁',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['酸甜', '嫩滑', '鱼香'],
    nutrition: { calories: 280, protein: 20, fat: 15, carbs: 18 }
  },
  {
    id: 21,
    name: '白切鸡',
    price: 38.00,
    description: '鸡肉鲜嫩，原汁原味，蘸料丰富',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['鲜嫩', '原味', '健康'],
    nutrition: { calories: 200, protein: 35, fat: 8, carbs: 2 }
  },
  {
    id: 22,
    name: '蒜蓉西兰花',
    price: 16.00,
    description: '清香爽脆，营养丰富，健康素食',
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['清香', '爽脆', '素食', '健康'],
    nutrition: { calories: 80, protein: 5, fat: 3, carbs: 12 }
  },
  {
    id: 23,
    name: '红烧茄子',
    price: 20.00,
    description: '茄子软糯，汁浓味美，素食经典',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['软糯', '汁浓', '素食'],
    nutrition: { calories: 150, protein: 3, fat: 8, carbs: 20 }
  },
  {
    id: 24,
    name: '干煸四季豆',
    price: 18.00,
    description: '四季豆爽脆，干香微辣，开胃下饭',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['爽脆', '干香', '微辣'],
    nutrition: { calories: 120, protein: 4, fat: 6, carbs: 15 }
  },
  {
    id: 25,
    name: '清蒸鲈鱼',
    price: 45.00,
    description: '鱼肉鲜美，清淡营养，蒸制保鲜',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop',
    categoryId: 1,
    status: 1,
    tags: ['鲜美', '清淡', '营养'],
    nutrition: { calories: 180, protein: 32, fat: 5, carbs: 2 }
  },

  // 凉菜 (增加到10个)
  {
    id: 5,
    name: '凉拌黄瓜',
    price: 12.00,
    description: '清爽开胃，酸甜可口，夏日必备',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['清爽', '开胃', '素食'],
    nutrition: { calories: 45, protein: 2, fat: 1, carbs: 8 }
  },
  {
    id: 6,
    name: '酸辣土豆丝',
    price: 15.00,
    description: '酸辣开胃，口感爽脆，经典家常菜',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['酸辣', '爽脆', '素食'],
    nutrition: { calories: 120, protein: 3, fat: 5, carbs: 18 }
  },
  {
    id: 7,
    name: '口水鸡',
    price: 25.00,
    description: '麻辣鲜香，鸡肉嫩滑，川菜经典',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['麻辣', '招牌'],
    nutrition: { calories: 280, protein: 28, fat: 15, carbs: 5 }
  },
  {
    id: 26,
    name: '凉拌木耳',
    price: 14.00,
    description: '木耳爽脆，清香开胃，营养丰富',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['爽脆', '清香', '营养'],
    nutrition: { calories: 60, protein: 3, fat: 2, carbs: 10 }
  },
  {
    id: 27,
    name: '蒜泥白肉',
    price: 28.00,
    description: '肉片薄嫩，蒜香浓郁，川菜名品',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['薄嫩', '蒜香', '名品'],
    nutrition: { calories: 250, protein: 22, fat: 16, carbs: 4 }
  },
  {
    id: 28,
    name: '凉拌海带丝',
    price: 10.00,
    description: '海带爽滑，清淡解腻，健康素食',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['爽滑', '清淡', '健康'],
    nutrition: { calories: 40, protein: 2, fat: 1, carbs: 8 }
  },
  {
    id: 29,
    name: '拍黄瓜',
    price: 8.00,
    description: '黄瓜清脆，蒜香开胃，简单美味',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['清脆', '蒜香', '开胃'],
    nutrition: { calories: 35, protein: 1, fat: 1, carbs: 6 }
  },
  {
    id: 30,
    name: '凉拌豆腐皮',
    price: 16.00,
    description: '豆腐皮韧性十足，调料丰富，素食佳品',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['韧性', '丰富', '素食'],
    nutrition: { calories: 140, protein: 12, fat: 8, carbs: 6 }
  },
  {
    id: 31,
    name: '麻辣牛肉',
    price: 32.00,
    description: '牛肉香辣，口感劲道，下酒佳品',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['香辣', '劲道', '下酒'],
    nutrition: { calories: 300, protein: 28, fat: 18, carbs: 5 }
  },
  {
    id: 32,
    name: '凉拌三丝',
    price: 18.00,
    description: '豆腐丝、海带丝、胡萝卜丝，营养均衡',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
    categoryId: 2,
    status: 1,
    tags: ['三丝', '营养', '均衡'],
    nutrition: { calories: 90, protein: 6, fat: 3, carbs: 12 }
  },

  // 汤类 (增加到8个)
  {
    id: 8,
    name: '西红柿鸡蛋汤',
    price: 16.00,
    description: '营养丰富，酸甜可口，家常美味',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop',
    categoryId: 3,
    status: 1,
    tags: ['营养', '家常'],
    nutrition: { calories: 85, protein: 6, fat: 4, carbs: 8 }
  },
  {
    id: 9,
    name: '冬瓜排骨汤',
    price: 28.00,
    description: '清淡鲜美，营养滋补，老火靓汤',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=200&fit=crop',
    categoryId: 3,
    status: 1,
    tags: ['清淡', '滋补'],
    nutrition: { calories: 150, protein: 15, fat: 8, carbs: 6 }
  },
  {
    id: 33,
    name: '紫菜蛋花汤',
    price: 12.00,
    description: '紫菜鲜美，蛋花嫩滑，清淡营养',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop',
    categoryId: 3,
    status: 1,
    tags: ['鲜美', '嫩滑', '清淡'],
    nutrition: { calories: 70, protein: 5, fat: 3, carbs: 6 }
  },
  {
    id: 34,
    name: '酸辣汤',
    price: 18.00,
    description: '酸辣开胃，口感丰富，经典汤品',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=200&fit=crop',
    categoryId: 3,
    status: 1,
    tags: ['酸辣', '开胃'],
    nutrition: { calories: 90, protein: 4, fat: 2, carbs: 12 }
  }
]