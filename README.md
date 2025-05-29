


          
# 扫码点餐系统

一个基于Vue.js前端和Node.js + MySQL后端的现代化扫码点餐系统，为餐厅提供完整的数字化点餐解决方案。

## 🚀 项目概述

本系统通过二维码扫描实现无接触点餐，顾客可以通过手机扫码浏览菜单、下单支付，商家可以通过管理后台管理菜品、订单和营业数据。

## 📋 功能特性

### 顾客端功能
- 🔍 扫码进入点餐页面
- 📱 响应式菜单浏览
- 🛒 购物车管理
- 💰 在线支付集成
- 📝 订单状态实时查看
- ⭐ 菜品评价系统
- 👤 用户信息管理

### 商家管理端
- 🍽️ 菜品管理（增删改查）
- 📊 订单管理和状态更新
- 🏪 餐桌管理
- 📈 营业数据统计
- 👥 用户管理
- ⚙️ 系统设置

### 系统功能
- 🔐 JWT身份认证
- 📱 微信小程序支持
- 💳 多种支付方式
- 🔔 实时消息推送
- 📊 数据分析报表

## 🛠️ 技术栈

### 前端技术
- **Vue.js 3** - 渐进式JavaScript框架
- **Vue Router** - 官方路由管理器
- **Vuex/Pinia** - 状态管理
- **Element Plus** - Vue 3组件库
- **Axios** - HTTP客户端
- **Vite** - 构建工具
- **TypeScript** - 类型安全

### 后端技术
- **Node.js** - JavaScript运行环境
- **Express.js** - Web应用框架
- **MySQL** - 关系型数据库
- **Sequelize** - ORM框架
- **JWT** - 身份认证
- **Socket.io** - 实时通信
- **Multer** - 文件上传
- **bcrypt** - 密码加密

### 开发工具
- **ESLint** - 代码规范
- **Prettier** - 代码格式化
- **Husky** - Git钩子
- **PM2** - 进程管理

## 📁 项目结构

```
OrderingSystem/
├── frontend/                 # Vue.js前端项目
│   ├── public/
│   ├── src/
│   │   ├── components/       # 公共组件
│   │   ├── views/           # 页面组件
│   │   ├── router/          # 路由配置
│   │   ├── store/           # 状态管理
│   │   ├── api/             # API接口
│   │   ├── utils/           # 工具函数
│   │   └── assets/          # 静态资源
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js后端项目
│   ├── controllers/         # 控制器
│   ├── models/              # 数据模型
│   ├── routes/              # 路由定义
│   ├── middleware/          # 中间件
│   ├── config/              # 配置文件
│   ├── utils/               # 工具函数
│   ├── uploads/             # 文件上传目录
│   ├── package.json
│   └── app.js
├── database/                 # 数据库相关
│   ├── migrations/          # 数据库迁移
│   ├── seeders/             # 种子数据
│   └── schema.sql           # 数据库结构
├── docs/                     # 项目文档
├── docker-compose.yml        # Docker配置
└── README.md
```

## 🗄️ 数据库设计

### 主要数据表

#### 用户表 (users)
- id, username, password, phone, avatar, role, created_at, updated_at

#### 餐桌表 (tables)
- id, table_number, qr_code, status, capacity, created_at, updated_at

#### 菜品分类表 (categories)
- id, name, description, sort_order, status, created_at, updated_at

#### 菜品表 (dishes)
- id, category_id, name, description, price, image, status, sort_order, created_at, updated_at

#### 订单表 (orders)
- id, table_id, user_id, order_number, total_amount, status, payment_status, created_at, updated_at

#### 订单详情表 (order_items)
- id, order_id, dish_id, quantity, price, subtotal, notes, created_at, updated_at

#### 支付记录表 (payments)
- id, order_id, payment_method, amount, transaction_id, status, created_at, updated_at

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- MySQL >= 8.0
- npm >= 8.0.0

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd OrderingSystem
```

2. **安装后端依赖**
```bash
cd backend
npm install
```

3. **安装前端依赖**
```bash
cd ../frontend
npm install
```

4. **配置数据库**
```bash
# 创建数据库
mysql -u root -p
CREATE DATABASE ordering_system;

# 导入数据库结构
mysql -u root -p ordering_system < database/schema.sql
```

5. **配置环境变量**
```bash
# 后端配置
cd backend
cp .env.example .env
# 编辑.env文件，配置数据库连接等信息
```

6. **启动项目**
```bash
# 启动后端服务
cd backend
npm run dev

# 启动前端服务
cd ../frontend
npm run dev
```

### 访问地址
- 前端地址: http://localhost:3000
- 后端API: http://localhost:8000
- 管理后台: http://localhost:3000/admin

## 📱 使用说明

### 顾客使用流程
1. 扫描餐桌二维码
2. 浏览菜单选择菜品
3. 添加到购物车
4. 确认订单信息
5. 选择支付方式完成支付
6. 等待出餐，查看订单状态

### 商家管理流程
1. 登录管理后台
2. 管理菜品信息和分类
3. 处理顾客订单
4. 更新订单状态
5. 查看营业数据统计

## 🔧 开发指南

### API接口文档

#### 认证接口
- POST `/api/auth/login` - 用户登录
- POST `/api/auth/register` - 用户注册
- POST `/api/auth/logout` - 用户登出

#### 菜品接口
- GET `/api/dishes` - 获取菜品列表
- GET `/api/dishes/:id` - 获取菜品详情
- POST `/api/dishes` - 创建菜品
- PUT `/api/dishes/:id` - 更新菜品
- DELETE `/api/dishes/:id` - 删除菜品

#### 订单接口
- GET `/api/orders` - 获取订单列表
- POST `/api/orders` - 创建订单
- PUT `/api/orders/:id` - 更新订单状态
- GET `/api/orders/:id` - 获取订单详情

### 前端组件开发

```javascript
// 示例：菜品卡片组件
<template>
  <div class="dish-card">
    <img :src="dish.image" :alt="dish.name" />
    <div class="dish-info">
      <h3>{{ dish.name }}</h3>
      <p>{{ dish.description }}</p>
      <div class="price">¥{{ dish.price }}</div>
      <button @click="addToCart">加入购物车</button>
    </div>
  </div>
</template>
```

### 后端API开发

```javascript
// 示例：菜品控制器
const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll({
      include: [Category],
      where: { status: 'active' }
    });
    res.json({ success: true, data: dishes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## 🔒 安全考虑

- JWT token认证和授权
- 密码bcrypt加密存储
- SQL注入防护
- XSS攻击防护
- CORS跨域配置
- 文件上传安全检查
- API访问频率限制

## 📊 性能优化

- 前端代码分割和懒加载
- 图片压缩和CDN加速
- 数据库索引优化
- Redis缓存热点数据
- API响应数据压缩
- 静态资源缓存策略

## 🚀 部署指南

### Docker部署

```bash
# 构建和启动服务
docker-compose up -d
```

### 传统部署

```bash
# 构建前端
cd frontend
npm run build

# 启动后端服务
cd ../backend
pm2 start ecosystem.config.js
```

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

