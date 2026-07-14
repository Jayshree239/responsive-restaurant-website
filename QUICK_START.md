# ⚡ Quick Start Guide

Get your Foodie Restaurant application running in 5 minutes!

---

## 📋 Prerequisites

- ✅ Node.js installed (v14+)
- ✅ MongoDB installed or MongoDB Atlas account
- ✅ Git installed

---

## 🚀 Setup in 5 Steps

### Step 1: Clone & Navigate
```bash
# Navigate to the project
cd d:\Projects\Restaurant\backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
```bash
# Copy example file
copy .env.example .env

# Edit .env (use any text editor)
# Change MONGO_URI to your MongoDB connection string
```

**For Local MongoDB:**
```
MONGO_URI=mongodb://localhost:27017/restaurant
PORT=5000
JWT_SECRET=your_secret_key_12345
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant
PORT=5000
JWT_SECRET=your_secret_key_12345
NODE_ENV=development
```

### Step 4: Start MongoDB
```bash
# Terminal 1 - Start MongoDB (if local)
mongod

# OR use MongoDB Atlas (skip this step)
```

### Step 5: Start the Server
```bash
# Terminal 2 - Backend
npm start

# You should see:
# ✅ MongoDB Connected Successfully
# 🚀 Server running on http://localhost:5000
```

---

## 🌐 Access the Application

1. **Open Browser**: `http://localhost:5000`
2. **See Home Page**: Should load with "Foodie Restaurant"

---

## 📝 Create Your First Account

### 1. Register a User
- Click "🔐 Login" in navbar
- Click "Register here"
- Fill in:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Password: `password123`
  - Confirm: `password123`
- Click "Register" → You'll be logged in

### 2. Browse Menu
- Click "Menu" in navbar
- See food items by category
- View "Add to Cart" button on each item

### 3. Add Items to Cart
- Click "🛒 Add to Cart" on any item
- Item is added to your cart
- See badge with count on navbar

### 4. View Cart
- Click "🛒 Cart" in navbar (if logged in)
- See all items with quantities
- Adjust quantities or remove items
- See total price with tax

### 5. Place Order
- Click "💳 Proceed to Checkout"
- Fill delivery details:
  - Address
  - Phone Number
  - City
  - Zip Code
- Click "💳 Proceed to Payment"

## 👨‍💼 Admin Features

### Create Admin Account
```bash
# In MongoDB Console
use restaurant

db.users.insertOne({
  name: "Admin",
  email: "admin@example.com",
  password: "$2a$10$...", # Use any hashed password
  role: "admin",
  createdAt: new Date()
})
```

**OR Register & Update Role:**
```bash
# Register normally first, then:
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Admin Login
- Navigate to login page
- Login with admin account
- Auto-redirected to Admin Dashboard

### Admin Dashboard Features

1. **View All Menu Items**
   - See all items in table format
   - Display: Image, Name, Description, Category, Price

2. **Add New Item**
   - Click "+ Add New Item" button
   - Fill form:
     - Name
     - Description
     - Category (Starter/Lunch/Dinner)
     - Price
     - Image URL
   - Click "Save Item"

3. **Edit Item**
   - Click "Edit" button on any item
   - Modify details
   - Click "Save Item"

4. **Delete Item**
   - Click "Delete" button
   - Confirm deletion
   - Item removed

---

## 🧪 Test Data

### Sample Menu Item
```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": "Chicken Biryani",
    "description": "Fragrant basmati rice with spiced chicken",
    "category": "Lunch",
    "price": 250,
    "image": "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500"
  }'
```

### Sample Test Credentials
- **User Email**: john@example.com
- **User Password**: password123
- **Admin Email**: admin@example.com

---

## 📱 Application URLs

| Page | URL |
|------|-----|
| Home | `http://localhost:5000/` |
| Menu | `http://localhost:5000/menu.html` |
| About | `http://localhost:5000/about.html` |
| Contact | `http://localhost:5000/contact.html` |
| Login | `http://localhost:5000/login.html` |
| Register | `http://localhost:5000/register.html` |
| Cart | `http://localhost:5000/cart.html` |
| Checkout | `http://localhost:5000/payment.html` |
| Admin | `http://localhost:5000/admin.html` |

---

## 🔌 API Quick Reference

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "63f...",
    "name": "John",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Menu
```bash
GET /api/menu
```

### Place Order
```bash
POST /api/order/place
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "items": [
    {
      "menuId": "63f...",
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main St",
  "phoneNumber": "9876543210"
}
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /"
**Solution**: Ensure backend is running
```bash
# Terminal: Check if server started
npm start
# Should show: 🚀 Server running on http://localhost:5000
```

### Issue: MongoDB Connection Error
**Solution**: Start MongoDB or update connection string
```bash
# For local MongoDB
mongod

# OR update .env with correct MongoDB URI
```

### Issue: Can't Login
**Solution**: Check if user exists
```bash
# In MongoDB:
db.users.find()
# Should show your registered user
```

### Issue: "Cannot add to cart - not logged in"
**Solution**: Login first
- Navigate to `/login.html`
- Enter credentials
- Cart will work

### Issue: Admin can't access dashboard
**Solution**: Verify admin role
```bash
# In MongoDB:
db.users.findOne({ email: "admin@example.com" })
# Check if role: "admin"
```

---

## 💻 Development Commands

```bash
# Start backend
npm start

# Stop server
# Press Ctrl + C

# Clear cart (in browser console)
localStorage.removeItem("restaurant_cart")

# Clear auth (in browser console)
localStorage.removeItem("token")
localStorage.removeItem("user")

# View all data
# MongoDB: use restaurant
# Show: db.users.find()
```

---

## 📊 Feature Checklist

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Add to Cart
- ✅ View Cart
- ✅ Place Order
- ✅ Payment Simulation
- ✅ Order Confirmation
- ✅ Admin Menu CRUD
- ✅ Admin Dashboard
- ✅ Role-based Access
- ✅ Responsive Design
- ✅ Form Validation

---

## 🎯 Next Steps

1. **Test All Features**
   - Register account
   - Add items to cart
   - Place order
   - Simulate payment

2. **Create Admin Account**
   - Login as admin
   - Add/edit/delete menu items

3. **Customize**
   - Change colors in CSS files
   - Update restaurant info
   - Add your menu items
   - Customize images

4. **Deploy** (Future)
   - Deploy backend to Heroku/Railway
   - Deploy frontend to Vercel/Netlify
   - Use MongoDB Atlas for database

---

## 📞 Support

- Check README.md for detailed documentation
- Review API endpoints in README.md
- Check browser console for JavaScript errors
- Check server terminal for backend errors

---

## 🎉 You're All Set!

Enjoy building with Foodie Restaurant! 

**Happy Coding! 🚀**

---

**Questions?** Open the README.md for detailed information!
