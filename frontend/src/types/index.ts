export interface User {
  id: number
  username: string
  phone: string
  avatar?: string
  role: 'customer' | 'admin' | 'staff'
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: number
  name: string
  description?: string
  sortOrder: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Dish {
  id: number
  categoryId: number
  name: string
  description: string
  price: number
  image: string
  status: 'active' | 'inactive'
  sortOrder: number
  category?: Category
  createdAt: string
  updatedAt: string
}

export interface Table {
  id: number
  tableNumber: string
  qrCode: string
  status: 'available' | 'occupied' | 'reserved'
  capacity: number
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  dish: Dish
  quantity: number
  notes?: string
}

export interface OrderItem {
  id: number
  orderId: number
  dishId: number
  quantity: number
  price: number
  subtotal: number
  notes?: string
  dish?: Dish
  createdAt: string
  updatedAt: string
}

export interface Order {
  id: number
  tableId: number
  userId?: number
  orderNumber: string
  totalAmount: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  table?: Table
  user?: User
  items?: OrderItem[]
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  orderId: number
  paymentMethod: 'wechat' | 'alipay' | 'cash' | 'card'
  amount: number
  transactionId?: string
  status: 'pending' | 'success' | 'failed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  code?: number
}