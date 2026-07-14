# 🧪 Feature Testing Guide

Complete testing checklist for all Foodie Restaurant features.

---

## 🔧 Pre-Test Setup

### ✅ Step 1: Start Backend
```bash
cd backend
npm install  # First time only
npm start
```
Expected output:
```
✅ MongoDB Connected Successfully
🚀 Server running on http://localhost:5000
```

### ✅ Step 2: Verify MongoDB
- Local: `mongod` running in separate terminal
- Cloud: MongoDB Atlas connection active

### ✅ Step 3: Open Application
- Browser: `http://localhost:5000`

---

## 🧪 Test Scenarios

### 1️⃣ USER REGISTRATION

#### Test Case: Valid Registration
```
✓ Test Input:
  - Name: John Doe
  - Email: john@example.com
  - Password: password123
  - Confirm: password123

✓ Expected Result:
  - User account created
  - Logged in automatically
  - Redirected to home page
  - Navbar shows user name

✓ Verification:
  - Check MongoDB: db.users.find()
  - Should see new user document
```

#### Test Case: Duplicate Email
```
✓ Test Input:
  - Register with same email twice

✓ Expected Result:
  - Error message: "User already exists"
  - Account not created
  - Stay on register page
```

#### Test Case: Password Mismatch
```
✓ Test Input:
  - Password: password123
  - Confirm: password456

✓ Expected Result:
  - Error message: "Passwords do not match"
  - Form not submitted
```

#### Test Case: Invalid Email
```
✓ Test Input:
  - Email: invalid-email-format

✓ Expected Result:
  - Email validation error
  - Cannot proceed
```

---

### 2️⃣ USER LOGIN

#### Test Case: Valid Login
```
✓ Test Input:
  - Email: john@example.com
  - Password: password123

✓ Expected Result:
  - Login successful
  - Redirected to home
  - JWT token stored in localStorage
  - Navbar updated with user info

✓ Verification:
  - Open DevTools > Application > localStorage
  - Should see "token" and "user"
```

#### Test Case: Wrong Password
```
✓ Test Input:
  - Email: john@example.com
  - Password: wrongpassword

✓ Expected Result:
  - Error: "Invalid credentials"
  - Not logged in
```

#### Test Case: User Not Found
```
✓ Test Input:
  - Email: nonexistent@example.com
  - Password: anypassword

✓ Expected Result:
  - Error: "Invalid credentials"
  - Not logged in
```

---

### 3️⃣ AUTHENTICATION STATE

#### Test Case: Navbar Updates
```
✓ When Not Logged In:
  - See "🔐 Login" button in navbar
  
✓ When Logged In:
  - See user name with dropdown
  - Dropdown shows:
    - 🛒 Cart
    - 🚪 Logout
    - 📊 Admin Dashboard (if admin)

✓ Test Logout:
  - Click "🚪 Logout"
  - Redirected to home
  - Navbar shows "🔐 Login" again
  - localStorage cleared
```

---

### 4️⃣ MENU BROWSING

#### Test Case: View Menu Items
```
✓ Precondition:
  - Menu items exist in database

✓ Test Steps:
  1. Navigate to Menu page
  2. Scroll through categories (Starter, Lunch, Dinner)
  3. See items with images, names, descriptions, prices

✓ Expected Result:
  - Items displayed correctly
  - Images load properly
  - Prices show in ₹
  - "More" button for each category

✓ Test Category Filter:
  - Click "More Starter"
  - See all starter items
  - Show "Add to Cart" button
```

---

### 5️⃣ ADD TO CART

#### Test Case: Add Item Without Login
```
✓ Test Input:
  - Click "Add to Cart" while not logged in

✓ Expected Result:
  - Confirmation dialog
  - Option to login
  - Click "Yes" → Redirect to login
```

#### Test Case: Add Item When Logged In
```
✓ Test Input:
  - Login first
  - Navigate to Menu
  - Click "🛒 Add to Cart"

✓ Expected Result:
  - Item added confirmation
  - Cart badge shows count
  - Item in localStorage
  - Notification: "✅ Item added to cart"

✓ Verification:
  - Check DevTools > localStorage
  - See "restaurant_cart" with item data
```

#### Test Case: Add Multiple Items
```
✓ Test Input:
  - Add different items multiple times

✓ Expected Result:
  - Each item added separately
  - Cart badge shows total quantity
  - Notification for each item
```

---

### 6️⃣ VIEW CART

#### Test Case: Access Cart
```
✓ Test Steps:
  1. Login
  2. Click "🛒 Cart" in navbar

✓ Expected Result:
  - Cart page loads
  - Show all added items
  - Display item details:
    - Item name
    - Price per item
    - Quantity
    - Total for item
  - Show cart summary:
    - Subtotal
    - Tax (5%)
    - Total Amount
```

#### Test Case: Update Quantity
```
✓ Test Input:
  - Click "+" or "−" buttons

✓ Expected Result:
  - Quantity updates
  - Total recalculates
  - Tax updates
  - Changes persist in localStorage
```

#### Test Case: Remove Item
```
✓ Test Input:
  - Click "Remove" button

✓ Expected Result:
  - Item removed from cart
  - Totals recalculate
  - Cart badge updates
```

#### Test Case: Empty Cart
```
✓ Test Input:
  - Remove all items

✓ Expected Result:
  - "Your cart is empty" message
  - "Continue Shopping" button
  - Checkout button disabled
```

---

### 7️⃣ ORDER PLACEMENT

#### Test Case: Proceed to Checkout
```
✓ Precondition:
  - Cart has items
  - User logged in

✓ Test Input:
  - Click "Proceed to Checkout"

✓ Expected Result:
  - Redirected to payment.html
  - See order summary
  - Form for delivery details
```

#### Test Case: Enter Delivery Details
```
✓ Test Input:
  - Name: John Doe (auto-filled from profile)
  - Address: 123 Main Street
  - City: Pune
  - Zip Code: 411001
  - Phone: 9876543210

✓ Expected Result:
  - Form accepts input
  - No validation errors
  - Order summary shows total
```

#### Test Case: Validate Required Fields
```
✓ Test Input:
  - Try submitting without required fields

✓ Expected Result:
  - Error messages appear
  - Cannot proceed without all fields
  - Form stays on same page
```

#### Test Case: Place Order
```
✓ Test Input:
  - Fill all details
  - Click "💳 Proceed to Payment"

✓ Expected Result:
  - Loading indicator
  - Order created in database
  - Cart cleared
  - Redirected to confirmation page

✓ Verification:
  - Check MongoDB: db.orders.find()
  - Should see new order with status: "Placed"
  - Cart cleared from localStorage
```

---

### 8️⃣ PAYMENT SIMULATION

#### Test Case: Successful Payment
```
✓ Test Input:
  - See confirmation page after order placed

✓ Expected Result:
  - ✅ Success icon
  - "Payment Successful!" message
  - Order ID displayed
  - Amount paid shown
  - Status: "✓ Paid" (green)
  - Estimated delivery time: "30-45 minutes"
```

#### Test Case: Continue Shopping
```
✓ Test Input:
  - Click "📋 Continue Shopping"

✓ Expected Result:
  - Redirected to menu.html
  - Cart is empty
  - Can add new items
```

#### Test Case: Back to Home
```
✓ Test Input:
  - Click "🏠 Back to Home"

✓ Expected Result:
  - Redirected to index.html
  - Can browse and add items again
```

---

### 9️⃣ ADMIN LOGIN

#### Test Case: Admin Registration (Optional)
```
✓ Test Steps:
  1. Register normal user
  2. Manually update in MongoDB:
     db.users.updateOne(
       { email: "admin@example.com" },
       { $set: { role: "admin" } }
     )

✓ Expected Result:
  - Account converted to admin
```

#### Test Case: Admin Login
```
✓ Test Input:
  - Email: admin@example.com
  - Password: <admin_password>

✓ Expected Result:
  - Login successful
  - Auto-redirect to admin.html
  - See admin dashboard
  - Menu items table
```

---

### 🔟 ADMIN DASHBOARD

#### Test Case: View Menu Items
```
✓ Expected Result:
  - Table with columns:
    - Image
    - Name
    - Description
    - Category
    - Price
    - Actions (Edit, Delete)
  - All existing items displayed
  - Images show correctly
```

#### Test Case: Add New Item
```
✓ Test Input:
  - Click "+ Add New Item"
  - Modal opens
  - Fill form:
    - Name: Butter Chicken
    - Description: Creamy butter sauce chicken
    - Category: Lunch
    - Price: 350
    - Image: <valid_image_url>
  - Click "Save Item"

✓ Expected Result:
  - ✅ "Item added successfully"
  - Modal closes
  - New item appears in table
  - Verify in MongoDB

✓ Verification:
  - db.menus.find()
  - Should see new item
```

#### Test Case: Edit Item
```
✓ Test Input:
  - Click "Edit" on any item
  - Modal opens with current values
  - Change price: 400
  - Click "Save Item"

✓ Expected Result:
  - ✅ "Item updated successfully"
  - Price updated in table
  - Verify in database
```

#### Test Case: Delete Item
```
✓ Test Input:
  - Click "Delete"
  - Confirm dialog appears
  - Click "OK"

✓ Expected Result:
  - ✅ "Item deleted successfully"
  - Item removed from table
  - Verify in database
```

---

### 1️⃣1️⃣ ROLE-BASED ACCESS

#### Test Case: Non-Admin Access to Admin
```
✓ Test Steps:
  1. Login as regular user
  2. Try to visit `/admin.html`

✓ Expected Result:
  - Access denied (optional: redirect to home)
  - Cannot perform admin operations
```

#### Test Case: Admin Menu CRUD
```
✓ Test Steps:
  1. Login as user
  2. Try POST /api/menu

✓ Expected Result:
  - 403 Forbidden error
  - Cannot add/edit/delete items
```

---

### 1️⃣2️⃣ CART PERSISTENCE

#### Test Case: Cart Survives Page Reload
```
✓ Test Steps:
  1. Add items to cart
  2. Refresh page
  3. Check cart

✓ Expected Result:
  - Cart items still there
  - Quantities unchanged
  - Total correct
```

#### Test Case: Cart Survives Logout/Login
```
✓ Test Steps:
  1. Add items, logout
  2. Login again

✓ Expected Result:
  - Cart still has items
  - (Optional: preserve between sessions)
```

---

### 1️⃣3️⃣ FORM VALIDATION

#### Test Case: Email Validation
```
✓ Test Invalid Emails:
  - no@domain
  - invalid.email
  - @example.com

✓ Expected Result:
  - Validation error
  - Cannot submit
```

#### Test Case: Price Validation (Admin)
```
✓ Test Input:
  - Negative price: -100
  - Invalid price: abc

✓ Expected Result:
  - Validation error
  - Cannot save
```

---

### 1️⃣4️⃣ ERROR HANDLING

#### Test Case: Network Error
```
✓ Test Steps:
  1. Stop backend server
  2. Try to login

✓ Expected Result:
  - Error message displayed
  - Friendly message to user
```

#### Test Case: Invalid MongoDB Data
```
✓ Expected Result:
  - Graceful error handling
  - No crashes
  - User-friendly messages
```

---

### 1️⃣5️⃣ RESPONSIVE DESIGN

#### Test Case: Desktop View
```
✓ Expected Result:
  - Layout looks good
  - All elements visible
  - No overflow
```

#### Test Case: Tablet View (768px)
```
✓ Test:
  - Resize browser to 768px
  - Check menu pages
  - Check cart
  - Check forms

✓ Expected Result:
  - Responsive layout
  - Mobile-friendly
  - Touch-friendly buttons
```

#### Test Case: Mobile View (375px)
```
✓ Test:
  - Resize to 375px
  - Navigate pages
  - Try adding to cart

✓ Expected Result:
  - Single column layout
  - Readable text
  - Functional buttons
```

---

## 📊 Test Summary Template

```
Feature: [Feature Name]
Date: [Date]
Tester: [Name]

├─ Test Case 1: [Name] ......... ✅ PASS / ❌ FAIL
├─ Test Case 2: [Name] ......... ✅ PASS / ❌ FAIL
├─ Test Case 3: [Name] ......... ✅ PASS / ❌ FAIL

Issues Found:
- [Issue 1]
- [Issue 2]

Overall Status: ✅ PASS / ❌ FAIL
```

---

## ✅ Final Verification Checklist

- ✅ User registration works
- ✅ User login works
- ✅ JWT token stored correctly
- ✅ Add to cart works
- ✅ Cart displays correctly
- ✅ Order placement works
- ✅ Order stored in database
- ✅ Payment simulation works
- ✅ Confirmation page shows
- ✅ Admin login works
- ✅ Admin dashboard loads
- ✅ Add menu item works
- ✅ Edit menu item works
- ✅ Delete menu item works
- ✅ Role-based access works
- ✅ Responsive on all devices
- ✅ Forms validate correctly
- ✅ Error handling works
- ✅ Notifications display
- ✅ Navbar updates dynamically

---

## 🎯 Expected Results Summary

| Feature | Status | Notes |
|---------|--------|-------|
| Registration | ✅ | User created with hashed password |
| Login | ✅ | JWT token generated |
| Cart | ✅ | Items persisted in localStorage |
| Order | ✅ | Stored in MongoDB |
| Payment | ✅ | Status updated to "Paid" |
| Admin Add | ✅ | Item created in database |
| Admin Edit | ✅ | Item updated in database |
| Admin Delete | ✅ | Item removed from database |
| Access Control | ✅ | Only admins can manage menu |
| Responsive | ✅ | Works on all screen sizes |

---

## 🚀 Testing Conclusion

Once all test cases pass ✅, the application is ready for:
- ✅ Production deployment
- ✅ User acceptance testing
- ✅ Performance testing
- ✅ Security audits

---

**Happy Testing! 🧪**
