export const mockDishes = [
  // 热菜
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
  
  // 凉菜
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
  
  // 汤类
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
  
  // 主食
  {
    id: 10,
    name: '白米饭',
    price: 3.00,
    description: '优质大米，香甜可口，粒粒分明',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop',
    categoryId: 4,
    status: 1,
    tags: ['主食'],
    nutrition: { calories: 130, protein: 3, fat: 0, carbs: 28 }
  },
  {
    id: 11,
    name: '蛋炒饭',
    price: 15.00,
    description: '粒粒分明，蛋香浓郁，经典炒饭',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop',
    categoryId: 4,
    status: 1,
    tags: ['经典', '蛋香'],
    nutrition: { calories: 280, protein: 12, fat: 10, carbs: 35 }
  },
  {
    id: 12,
    name: '牛肉面',
    price: 22.00,
    description: '牛肉鲜美，面条劲道，汤汁浓郁',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
    categoryId: 4,
    status: 1,
    tags: ['劲道', '浓郁'],
    nutrition: { calories: 420, protein: 25, fat: 12, carbs: 55 }
  },
  
  // 饮品
  {
    id: 13,
    name: '可乐',
    price: 8.00,
    description: '冰镇可乐，清爽解腻，经典饮品',
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop',
    categoryId: 5,
    status: 1,
    tags: ['冰镇', '经典'],
    nutrition: { calories: 140, protein: 0, fat: 0, carbs: 39 }
  },
  {
    id: 14,
    name: '鲜榨橙汁',
    price: 15.00,
    description: '新鲜橙子现榨，维C丰富，酸甜可口',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=200&fit=crop',
    categoryId: 5,
    status: 1,
    tags: ['新鲜', '维C', '现榨'],
    nutrition: { calories: 110, protein: 2, fat: 0, carbs: 26 }
  },
  {
    id: 15,
    name: '柠檬蜂蜜茶',
    price: 12.00,
    description: '柠檬清香，蜂蜜甘甜，美容养颜',
    image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300&h=200&fit=crop',
    categoryId: 5,
    status: 1,
    tags: ['清香', '美容', '养颜'],
    nutrition: { calories: 80, protein: 0, fat: 0, carbs: 22 }
  },
  
  // 甜品
  {
    id: 16,
    name: '红豆冰',
    price: 18.00,
    description: '红豆香甜，冰爽解腻，夏日甜品',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    categoryId: 6,
    status: 1,
    tags: ['香甜', '冰爽', '夏日'],
    nutrition: { calories: 180, protein: 6, fat: 1, carbs: 40 }
  },
  {
    id: 17,
    name: '芒果布丁',
    price: 20.00,
    description: '芒果浓郁，口感顺滑，热带风味',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop',
    categoryId: 6,
    status: 1,
    tags: ['浓郁', '顺滑', '热带'],
    nutrition: { calories: 160, protein: 4, fat: 3, carbs: 32 }
  }
]