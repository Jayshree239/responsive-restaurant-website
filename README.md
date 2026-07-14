# 🍴 Foodie Restaurant - MERN Stack Web Application

A fully functional MERN (MongoDB, Express, Node.js, React/Vanilla JS) restaurant web application with cart system, order placement, payment simulation, and admin dashboard.

---

## ✨ Features

### 🛒 User Features

1. **Authentication System**
   - User Registration with email validation
   - Secure Login with JWT tokens
   - Password hashing with bcrypt
   - Role-based access (User/Admin)

2. **Shopping Cart**
   - Add/Remove items to cart
   - View cart with item quantities
   - Real-time cart updates
   - Persistent cart in localStorage

3. **Order Management**
   - Place orders with delivery details
   - View order history
   - Order status tracking
   - Order confirmation

4. **Payment Simulation**
   - Simulate payment process
   - Update order status to "Paid"
   - Display payment confirmation

### 👨‍💼 Admin Features

1. **Admin Dashboard**
   - View all menu items
   - Add new menu items
   - Edit existing items
   - Delete items
   - Role-based access control

2. **Menu Management**
   - CRUD operations for menu items
   - Category-based organization
   - Image URL support
   - Price management

---

## 📁 Project Structure

```
Restaurant/
├── backend/
│   ├── models/
│   │   ├── Menu.js           # Menu schema
│   │   ├── User.js           # User schema with auth
│   │   └── Order.js          # Order schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── menuRoutes.js     # Menu CRUD endpoints
│   │   ├── cartRoutes.js     # Cart validation
│   │   └── orderRoutes.js    # Order management
│   ├── middleware/
│   │   └── authMiddleware.js # JWT & role verification
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── server.js             # Express server
│   ├── package.json          # Dependencies
│   └── .env.example          # Environment variables template
│
└── frontend/
    ├── pages/
    │   ├── index.html        # Home page
    │   ├── menu.html         # Menu listing
    │   ├── category.html     # Category view
    │   ├── login.html        # Login page
    │   ├── register.html     # Registration page
    │   ├── cart.html         # Shopping cart
    │   ├── payment.html      # Checkout
    │   ├── payment-success.html  # Order confirmation
    │   ├── admin.html        # Admin dashboard
    │   ├── about.html        # About us
    │   └── contact.html      # Contact us
    ├── js/
    │   ├── auth.js           # Authentication utilities
    │   ├── cart.js           # Cart management
    │   └── script.js         # General scripts
    ├── css/
    │   └── style.css         # Global styles
    └── images/               # Food images
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```
   
   **Update .env with your values:**
   ```
   MONGO_URI=mongodb://localhost:27017/restaurant
   PORT=5000
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Local: `mongod` (in separate terminal)
   - Or use MongoDB Atlas (cloud)

5. **Start the server**
   ```bash
   npm start
   ```
   
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **No installation needed** - Frontend uses vanilla HTML, CSS, JavaScript
2. **Open in browser**: Navigate to `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user info | ✅ |

### Menu Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/menu` | Get all menu items | ❌ | - |
| GET | `/api/menu/:id` | Get menu item by ID | ❌ | - |
| POST | `/api/menu` | Add new menu item | ✅ | Admin |
| PUT | `/api/menu/:id` | Update menu item | ✅ | Admin |
| DELETE | `/api/menu/:id` | Delete menu item | ✅ | Admin |

### Cart Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/cart` | Get cart info | ✅ |
| POST | `/api/cart/validate` | Validate cart items | ✅ |

### Order Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/order/place` | Place new order | ✅ |
| GET | `/api/order/my-orders` | Get user's orders | ✅ |
| GET | `/api/order/:id` | Get order details | ✅ |
| PUT | `/api/order/:id/pay` | Process payment | ✅ |

---

## 🔐 Authentication

- **JWT Tokens**: Tokens are stored in localStorage on the client
- **Token Format**: `Bearer <token>`
- **Token Expiry**: 7 days
- **Roles**: 
  - `user`: Regular user
  - `admin`: Administrator with menu management access

---

## 🔄 User Flow

### New User Journey

1. **Register** → Create account with email & password
2. **Login** → Enter email and password
3. **Browse Menu** → View all menu items by category
4. **Add to Cart** → Select items and add to cart
5. **View Cart** → Review items, adjust quantities
6. **Checkout** → Enter delivery details
7. **Payment** → Simulate payment
8. **Confirmation** → View order confirmation

### Admin Journey

1. **Login** → Use admin account
2. **Dashboard** → Redirected to admin dashboard
3. **Manage Menu** → Add, Edit, or Delete items
4. **CRUD Operations** → Full control over menu

---

## 🧪 Testing the Application

### Create Test Data

1. **Register a User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John","email":"john@test.com","password":"password123"}'
   ```

2. **Login User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@test.com","password":"password123"}'
   ```

3. **Create Admin Account** (manual in MongoDB)
   ```javascript
   db.users.insert({
     name: "Admin",
     email: "admin@test.com",
     password: "<hashed_password>",
     role: "admin"
   })
   ```

4. **Add Menu Items** (via admin dashboard or API)
   ```bash
   curl -X POST http://localhost:5000/api/menu \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <admin_token>" \
     -d '{
       "name":"Biryani",
       "description":"Fragrant basmati rice",
       "category":"Lunch",
       "price":250,
       "image":"https://example.com/biryani.jpg"
     }'
   ```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **Bootstrap 5** - UI Framework
- **Vanilla JavaScript** - Logic
- **localStorage** - Client-side cart storage
- **Fetch API** - HTTP requests

---

## 📋 Database Schema

### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date
}
```

### Menu Schema
```javascript
{
  name: String (required),
  description: String (required),
  category: String (enum: ['Starter', 'Lunch', 'Dinner'], required),
  price: Number (required),
  image: String (URL)
}
```

### Order Schema
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    menuId: ObjectId,
    name: String,
    price: Number,
    quantity: Number
  }],
  totalAmount: Number (required),
  status: String (enum: ['Placed', 'Paid', 'Preparing', 'Ready', 'Delivered']),
  deliveryAddress: String,
  phoneNumber: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🎨 UI Features

- **Responsive Design** - Works on desktop, tablet, mobile
- **Gradient Backgrounds** - Modern gradient UI
- **Card Layouts** - Clean card-based design
- **Bootstrap Components** - Modal, alerts, buttons
- **Form Validation** - Client-side validation
- **Loading States** - Spinners for async operations
- **Error Messages** - User-friendly error displays

---

## 🔒 Security Features

1. **Password Hashing** - bcrypt (10 salt rounds)
2. **JWT Authentication** - Secure token-based auth
3. **Role-Based Access** - Admin verification middleware
4. **Input Validation** - Server-side validation
5. **CORS** - Enabled for cross-origin requests
6. **Environment Variables** - Sensitive data in .env

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Ensure MongoDB is running
- For local: run `mongod`
- For cloud: verify connection string in .env
```

### CORS Error
```
Solution: Backend already has CORS enabled
- Check server.js for cors() middleware
```

### Token Expires
```
Solution: Re-login to get new token
- Token stored in localStorage
- Auto-redirect on 401 response
```

### Port Already in Use
```
Solution: Change PORT in .env or kill process
- Edit .env: PORT=5001
```

---

## 📦 Dependencies

### Backend
```json
{
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^4.22.1",
  "jsonwebtoken": "^9.1.2",
  "mongoose": "^7.8.9"
}
```

---

## 📝 Future Enhancements

- [ ] Email notifications for orders
- [ ] Real Stripe/PayPal integration
- [ ] Order tracking with real-time updates
- [ ] User reviews and ratings
- [ ] Promo codes and discounts
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Mobile app (React Native)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for food lovers!

For questions or support, contact: bhagyashriwalunj05@gmail.com

---

## 🎯 Next Steps

1. **Install Dependencies**
   ```bash
   cd backend && npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

3. **Start Backend**
   ```bash
   npm start
   ```

4. **Access Application**
   - Visit `http://localhost:5000` in browser
   - Create an account
   - Start ordering!

---

**Happy Ordering! 🍽️ 🚀**
