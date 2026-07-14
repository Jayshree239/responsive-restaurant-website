# 📡 API Reference - Restaurant MERN Application

**Complete API Documentation**  
**Date:** May 1, 2026  
**Base URL:** `http://localhost:5000/api`

---

## 🔑 Authentication

All protected endpoints require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📚 API Endpoints

### 1️⃣ Authentication Endpoints (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user"  // Optional, defaults to "user"
}

Response (201):
{
  "message": "✅ User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Errors:
- 400: User already exists
- 400: All fields required
- 500: Server error
```

---

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "SecurePass123"
}

Response (200):
{
  "message": "✅ Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}

Errors:
- 400: Email and password required
- 400: Invalid credentials
- 500: Server error
```

---

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "createdAt": "2026-05-01T10:00:00Z"
}

Errors:
- 401: No token provided
- 401: Invalid token
- 500: Server error
```

---

### 2️⃣ Menu Endpoints (`/api/menu`)

#### Get All Menu Items
```http
GET /api/menu

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Paneer Tikka",
    "description": "Grilled paneer cubes marinated with spices",
    "category": "Starter",
    "price": 220,
    "image": "images/starter/Paneer-Tikka.jpg"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Butter Chicken",
    "description": "Tender chicken in butter sauce",
    "category": "Lunch",
    "price": 350,
    "image": "images/lunch/butter-chicken.jpg"
  }
]

Errors:
- 500: Server error
```

---

#### Get Menu Item by ID
```http
GET /api/menu/:id

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Paneer Tikka",
  "description": "Grilled paneer cubes marinated with spices",
  "category": "Starter",
  "price": 220,
  "image": "images/starter/Paneer-Tikka.jpg"
}

Errors:
- 404: Menu item not found
- 500: Server error
```

---

#### Add Menu Item (Admin Only)
```http
POST /api/menu
Authorization: Bearer <admin_token>
Content-Type: application/json

Request:
{
  "name": "Garlic Bread",
  "description": "Crispy garlic bread with butter",
  "category": "Starter",
  "price": 149,
  "image": "images/starter/garlic-bread.jpg"
}

Response (201):
{
  "message": "✅ Menu item added successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Garlic Bread",
    "description": "Crispy garlic bread with butter",
    "category": "Starter",
    "price": 149,
    "image": "images/starter/garlic-bread.jpg"
  }
}

Errors:
- 400: All fields required
- 401: No token provided
- 403: Admin access required
- 500: Server error
```

---

#### Update Menu Item (Admin Only)
```http
PUT /api/menu/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

Request:
{
  "name": "Garlic Bread Deluxe",
  "description": "Premium garlic bread with herbs",
  "category": "Starter",
  "price": 199,
  "image": "images/starter/garlic-bread-deluxe.jpg"
}

Response (200):
{
  "message": "✅ Menu item updated successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Garlic Bread Deluxe",
    "description": "Premium garlic bread with herbs",
    "category": "Starter",
    "price": 199,
    "image": "images/starter/garlic-bread-deluxe.jpg"
  }
}

Errors:
- 404: Menu item not found
- 401: No token provided
- 403: Admin access required
- 500: Server error
```

---

#### Delete Menu Item (Admin Only)
```http
DELETE /api/menu/:id
Authorization: Bearer <admin_token>

Response (200):
{
  "message": "✅ Menu item deleted successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Garlic Bread",
    "description": "Crispy garlic bread with butter",
    "category": "Starter",
    "price": 149,
    "image": "images/starter/garlic-bread.jpg"
  }
}

Errors:
- 404: Menu item not found
- 401: No token provided
- 403: Admin access required
- 500: Server error
```

---

### 3️⃣ Cart Endpoints (`/api/cart`)

#### Get Cart Info
```http
GET /api/cart
Authorization: Bearer <token>

Response (200):
{
  "message": "📋 Cart is managed on the frontend using localStorage",
  "note": "Call /api/order/place to create an order from cart items"
}

Errors:
- 401: No token provided
```

---

#### Validate Cart Items
```http
POST /api/cart/validate
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "items": [
    {
      "menuId": "507f1f77bcf86cd799439012",
      "name": "Paneer Tikka",
      "price": 220,
      "quantity": 2
    },
    {
      "menuId": "507f1f77bcf86cd799439013",
      "name": "Butter Chicken",
      "price": 350,
      "quantity": 1
    }
  ]
}

Response (200):
{
  "message": "✅ Cart validated successfully",
  "items": [
    {
      "menuId": "507f1f77bcf86cd799439012",
      "name": "Paneer Tikka",
      "price": 220,
      "quantity": 2
    },
    {
      "menuId": "507f1f77bcf86cd799439013",
      "name": "Butter Chicken",
      "price": 350,
      "quantity": 1
    }
  ],
  "totalAmount": 790
}

Errors:
- 400: Invalid cart items
- 404: Menu item not found
- 401: No token provided
- 500: Server error
```

---

### 4️⃣ Order Endpoints (`/api/order`)

#### Place Order
```http
POST /api/order/place
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "items": [
    {
      "menuId": "507f1f77bcf86cd799439012",
      "name": "Paneer Tikka",
      "price": 220,
      "quantity": 2
    }
  ],
  "deliveryAddress": "123 Main Street, Mumbai, Maharashtra",
  "phoneNumber": "9876543210"
}

Response (201):
{
  "message": "✅ Order placed successfully",
  "order": {
    "id": "507f1f77bcf86cd799439015",
    "totalAmount": 462,
    "status": "Placed",
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439012",
        "name": "Paneer Tikka",
        "price": 220,
        "quantity": 2
      }
    ]
  }
}

Errors:
- 400: No items in order
- 400: Delivery address and phone number required
- 404: Menu item not found
- 401: No token provided
- 500: Server error
```

---

#### Get User Orders
```http
GET /api/order/my-orders
Authorization: Bearer <token>

Response (200):
{
  "message": "✅ Orders retrieved successfully",
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "userId": "507f1f77bcf86cd799439011",
      "items": [
        {
          "menuId": "507f1f77bcf86cd799439012",
          "name": "Paneer Tikka",
          "price": 220,
          "quantity": 2
        }
      ],
      "totalAmount": 462,
      "status": "Paid",
      "deliveryAddress": "123 Main Street, Mumbai",
      "phoneNumber": "9876543210",
      "createdAt": "2026-05-01T10:00:00Z"
    }
  ]
}

Errors:
- 401: No token provided
- 500: Server error
```

---

#### Get Order by ID
```http
GET /api/order/:id
Authorization: Bearer <token>

Response (200):
{
  "message": "✅ Order retrieved successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439015",
    "userId": "507f1f77bcf86cd799439011",
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439012",
        "name": "Paneer Tikka",
        "price": 220,
        "quantity": 2
      }
    ],
    "totalAmount": 462,
    "status": "Placed",
    "deliveryAddress": "123 Main Street, Mumbai",
    "phoneNumber": "9876543210",
    "createdAt": "2026-05-01T10:00:00Z"
  }
}

Errors:
- 404: Order not found
- 403: Unauthorized access
- 401: No token provided
- 500: Server error
```

---

#### Update Order Payment Status
```http
PUT /api/order/:id/pay
Authorization: Bearer <token>

Response (200):
{
  "message": "✅ Payment successful",
  "order": {
    "id": "507f1f77bcf86cd799439015",
    "status": "Paid",
    "totalAmount": 462
  }
}

Errors:
- 404: Order not found
- 403: Unauthorized access
- 401: No token provided
- 500: Server error
```

---

## 🔐 Authentication Headers

### Bearer Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYyMzAxNDU2MCwiZXhwIjoxNjIzNjE5MzYwfQ.1234567890
```

### Token Expiration
- Expires: 7 days from issue
- Return to login if expired

---

## 🎯 Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input or missing fields |
| 401 | Unauthorized | No token or invalid token |
| 403 | Forbidden | Admin access required |
| 404 | Not Found | Resource not found |
| 500 | Server Error | Internal server error |

---

## 📊 Data Types

### User Object
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (email format)",
  "role": "string (user/admin)",
  "createdAt": "ISO 8601 datetime"
}
```

### Menu Item Object
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "category": "string (Starter/Lunch/Dinner)",
  "price": "number (currency)",
  "image": "string (image path)"
}
```

### Order Item Object
```json
{
  "menuId": "ObjectId",
  "name": "string",
  "price": "number",
  "quantity": "number (positive integer)"
}
```

### Order Object
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": ["array of Order Item Objects"],
  "totalAmount": "number (currency)",
  "status": "string (Placed/Paid/Preparing/Ready/Delivered)",
  "deliveryAddress": "string",
  "phoneNumber": "string",
  "createdAt": "ISO 8601 datetime"
}
```

---

## 🧪 Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "user"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get All Menu Items
```bash
curl -X GET http://localhost:5000/api/menu
```

### Place Order (with token)
```bash
curl -X POST http://localhost:5000/api/order/place \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "menuId": "507f1f77bcf86cd799439012",
        "name": "Paneer Tikka",
        "price": 220,
        "quantity": 2
      }
    ],
    "deliveryAddress": "123 Main Street, Mumbai",
    "phoneNumber": "9876543210"
  }'
```

---

## 🧪 Testing with Postman

1. **Create Collection** → Restaurant API
2. **Add Request** → Register User
   - Method: POST
   - URL: http://localhost:5000/api/auth/register
   - Body: JSON with user details
3. **Add Request** → Login User
   - Method: POST
   - URL: http://localhost:5000/api/auth/login
   - Body: JSON with email/password
4. **Add Authorization** → Use token from login response
   - Type: Bearer Token
   - Token: [Paste token here]
5. **Add Request** → Get Orders
   - Method: GET
   - URL: http://localhost:5000/api/order/my-orders
   - Authorization: Bearer Token (automatically added)

---

## 📋 Validation Rules

### Email
- Must be valid email format
- Must be unique
- Case-insensitive
- Trimmed of whitespace

### Password
- Minimum 6 characters
- Cannot be empty
- Hashed with bcrypt
- Never exposed in responses

### Category
- Must be one of: "Starter", "Lunch", "Dinner"
- Case-sensitive
- Cannot be empty

### Price
- Must be positive number
- Required
- Currency (₹)

### Phone Number
- Must be provided
- 10 digits recommended
- Stored as string

### Delivery Address
- Must be provided
- Minimum 10 characters recommended
- Stored as string

---

## 🔒 Security Notes

1. **Never expose JWT secret** - Keep JWT_SECRET in .env
2. **Token storage** - Store token in localStorage or sessionStorage
3. **HTTPS in production** - Always use HTTPS for security
4. **CORS** - Only allow trusted domains
5. **Rate limiting** - Implement in production
6. **Input validation** - Always validate on server side
7. **Error messages** - Don't expose sensitive information

---

## 🚀 Rate Limiting (Future Enhancement)

Recommended limits:
- `/auth/register` - 5 requests per hour per IP
- `/auth/login` - 5 failed attempts per 15 minutes
- `/api/menu` - 1000 requests per hour
- `/api/order/place` - 100 requests per hour per user

---

## 📞 API Support

For issues:
1. Check error message
2. Verify token is valid
3. Check request format
4. Review data types
5. Check database connection
6. Review logs for details

---

**API Version:** 1.0  
**Last Updated:** May 1, 2026  
**Status:** ✅ Production Ready
