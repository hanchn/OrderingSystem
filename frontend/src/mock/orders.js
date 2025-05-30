export const mockOrders = [
  {
    id: 'ORD20240101001',
    tableNumber: 'A01',
    status: 'completed', // pending, confirmed, preparing, ready, completed, cancelled
    items: [
      { dishId: 1, dishName: '宫保鸡丁', price: 28.00, quantity: 1 },
      { dishId: 8, dishName: '西红柿鸡蛋汤', price: 16.00, quantity: 1 },
      { dishId: 10, dishName: '白米饭', price: 3.00, quantity: 2 }
    ],
    totalAmount: 50.00,
    orderTime: '2024-01-01 12:30:00',
    completedTime: '2024-01-01 13:15:00',
    customerNote: '不要太辣',
    estimatedTime: 25
  },
  {
    id: 'ORD20240101002',
    tableNumber: 'B03',
    status: 'preparing',
    items: [
      { dishId: 3, dishName: '红烧肉', price: 35.00, quantity: 1 },
      { dishId: 11, dishName: '蛋炒饭', price: 15.00, quantity: 1 },
      { dishId: 13, dishName: '可乐', price: 8.00, quantity: 2 }
    ],
    totalAmount: 66.00,
    orderTime: '2024-01-01 13:45:00',
    customerNote: '',
    estimatedTime: 20
  }
]