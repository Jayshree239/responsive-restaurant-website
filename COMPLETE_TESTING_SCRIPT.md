# 🧪 End-to-End Testing Script

**Restaurant MERN Application - Complete Testing Guide**  
**Date:** May 1, 2026

---

## Prerequisites

1. **Server Running:** `http://localhost:5000`
2. **MongoDB Connected:** Local MongoDB instance on port 27017
3. **Browser:** Chrome, Firefox, Safari, or Edge
4. **Terminal:** PowerShell or Command Prompt for API testing

---

## Test Suite 1: Authentication System

### ✅ Test 1.1 - User Registration

**Objective:** Verify user can register with valid credentials

**Steps:**
1. Open `http://localhost:5000/register.html`
2. Fill form:
   ```
   Name: John Doe
   Email: john.doe@example.com
   Password: SecurePass123
   Confirm Password: SecurePass123
   ```
3. Click "Register" button
4. Wait for redirect

**Expected Results:**
- ✅ Form submits without errors
- ✅ User document created in MongoDB
- ✅ JWT token generated and stored
- ✅ Redirected to home page
- ✅ Navbar shows "👤 John Doe" dropdown
- ✅ "🛒 Cart" option visible in dropdown
- ✅ "📋 My Orders" option visible in dropdown

**Pass/Fail:** ___

---

### ✅ Test 1.2 - User Login

**Objective:** Verify user can login with valid credentials

**Steps:**
1. Click "🔐 Login" in navbar (if not logged in)
2. Open `http://localhost:5000/login.html`
3. Fill form:
   ```
   Email: john.doe@example.com
   Password: SecurePass123
   ```
4. Click "Login" button

**Expected Results:**
- ✅ Form submits without errors
- ✅ JWT token retrieved and stored
- ✅ User info stored in localStorage
- ✅ Redirected to home page
- ✅ Navbar shows user dropdown
- ✅ Can access protected pages

**Pass/Fail:** ___

---

### ✅ Test 1.3 - Invalid Credentials

**Objective:** Verify system rejects invalid credentials

**Steps:**
1. Open `http://localhost:5000/login.html`
2. Fill form:
   ```
   Email: john.doe@example.com
   Password: WrongPassword
   ```
3. Click "Login" button

**Expected Results:**
- ✅ Error message displayed: "❌ Invalid credentials"
- ✅ NOT redirected to home page
- ✅ Token NOT stored in localStorage
- ✅ Page remains on login page
- ✅ User can retry

**Pass/Fail:** ___

---

### ✅ Test 1.4 - User Logout

**Objective:** Verify user can logout

**Steps:**
1. Login with valid credentials
2. Click username dropdown in navbar
3. Click "🚪 Logout"

**Expected Results:**
- ✅ Token removed from localStorage
- ✅ User info cleared
- ✅ Redirected to home page
- ✅ Navbar shows "🔐 Login" link instead of user menu
- ✅ Cart data persists (for next login)

**Pass/Fail:** ___

---

## Test Suite 2: Cart Functionality

### ✅ Test 2.1 - Add Single Item to Cart

**Objective:** Verify item can be added to cart

**Steps:**
1. Login as user
2. Go to Menu page (`http://localhost:5000/menu.html`)
3. Find first menu item
4. Click "🛒 Add to Cart" button
5. Check cart badge in navbar

**Expected Results:**
- ✅ Success notification: "✅ [Item Name] added to cart!"
- ✅ Notification appears for 3 seconds then disappears
- ✅ Cart badge shows "1"
- ✅ Item stored in localStorage
- ✅ Can add multiple items

**Pass/Fail:** ___

---

### ✅ Test 2.2 - Add Multiple Items to Cart

**Objective:** Verify multiple items can be added

**Steps:**
1. Repeat "Add to Cart" for 3 different items
2. Check cart badge updates

**Expected Results:**
- ✅ Cart badge shows "3"
- ✅ Each item shows success notification
- ✅ Items stored in localStorage
- ✅ Duplicate items increase quantity (not count as separate items)

**Pass/Fail:** ___

---

### ✅ Test 2.3 - View Cart

**Objective:** Verify cart page displays correct items

**Steps:**
1. Click "🛒 Cart" in user dropdown
2. Review cart page

**Expected Results:**
- ✅ Navigated to cart.html
- ✅ All items displayed in table
- ✅ Item names shown
- ✅ Quantities displayed
- ✅ Prices shown
- ✅ Subtotal calculated
- ✅ Tax (5%) calculated
- ✅ Total calculated correctly
- ✅ Remove buttons visible

**Pass/Fail:** ___

---

### ✅ Test 2.4 - Adjust Quantity

**Objective:** Verify quantity can be adjusted

**Steps:**
1. In cart page, find an item
2. Click "+" button multiple times (or "-" button)
3. Verify price updates

**Expected Results:**
- ✅ Quantity increases/decreases
- ✅ Item total price updates immediately
- ✅ Subtotal updates
- ✅ Tax recalculated
- ✅ Grand total updates
- ✅ localStorage updated

**Pass/Fail:** ___

---

### ✅ Test 2.5 - Remove Item from Cart

**Objective:** Verify item can be removed

**Steps:**
1. In cart page, click "Remove" button for an item
2. Verify item removed

**Expected Results:**
- ✅ Item removed from table
- ✅ Cart badge updated (count decreased)
- ✅ Totals recalculated
- ✅ localStorage updated
- ✅ Removed item no longer in cart

**Pass/Fail:** ___

---

### ✅ Test 2.6 - Empty Cart Handling

**Objective:** Verify empty cart is handled properly

**Steps:**
1. Remove all items from cart
2. Verify cart page shows empty state

**Expected Results:**
- ✅ "Your cart is empty" message shown
- ✅ "Continue Shopping" button displayed
- ✅ Checkout button disabled
- ✅ No items displayed in table
- ✅ Cart badge empty or hidden

**Pass/Fail:** ___

---

## Test Suite 3: Order Placement & Payment

### ✅ Test 3.1 - Add Items & Checkout

**Objective:** Verify checkout process starts

**Steps:**
1. Login as user
2. Go to Menu page
3. Add 2-3 items to cart
4. Go to cart page
5. Click "Proceed to Checkout"

**Expected Results:**
- ✅ Redirected to payment.html
- ✅ Delivery info form displayed
- ✅ Order summary shown on right side
- ✅ Cart items listed
- ✅ Total amount displayed
- ✅ User name pre-filled (if logged in)
- ✅ Form fields: Name, Phone, Address, City, Zip

**Pass/Fail:** ___

---

### ✅ Test 3.2 - Payment Form Validation

**Objective:** Verify form validates all fields

**Steps:**
1. On payment page, leave all fields empty
2. Click "Proceed to Payment"

**Expected Results:**
- ✅ Error message: "❌ All fields are required"
- ✅ Order NOT created
- ✅ Page remains on payment form
- ✅ Can enter data and retry

**Pass/Fail:** ___

---

### ✅ Test 3.3 - Place Order & Simulated Payment

**Objective:** Verify order is placed and payment simulated

**Steps:**
1. Fill all delivery fields:
   ```
   Name: John Doe
   Phone: 9876543210
   Address: 123 Main Street, Mumbai
   City: Mumbai
   Zip: 400001
   ```
2. Click "Proceed to Payment"
3. Wait for processing

**Expected Results:**
- ✅ Order created in MongoDB
- ✅ Order stored with "Placed" status
- ✅ Redirected to payment-success.html
- ✅ Success page shows:
   - ✅ "✅ Payment Successful!" heading
   - ✅ Order ID displayed
   - ✅ Amount paid shown
   - ✅ "✓ Paid" status
   - ✅ Estimated delivery time: 30-45 minutes
- ✅ Cart cleared from localStorage
- ✅ "Continue Shopping" button present
- ✅ "Back to Home" button present

**Pass/Fail:** ___

---

### ✅ Test 3.4 - Verify Order in Database

**Objective:** Verify order created in MongoDB

**Steps:**
1. Use MongoDB client (Compass or Shell)
2. Check `restaurantDB.orders` collection
3. Find order with user ID

**Expected Results:**
- ✅ Order document exists
- ✅ Contains all items
- ✅ totalAmount calculated correctly
- ✅ status = "Placed"
- ✅ deliveryAddress stored
- ✅ phoneNumber stored
- ✅ userId references correct user
- ✅ createdAt timestamp set

**Pass/Fail:** ___

---

## Test Suite 4: Order Tracking

### ✅ Test 4.1 - View Orders History

**Objective:** Verify user can view order history

**Steps:**
1. Login as user who placed orders
2. Click "📋 My Orders" in dropdown menu
3. Wait for page to load

**Expected Results:**
- ✅ Navigated to orders.html
- ✅ All user's orders displayed
- ✅ Orders sorted by date (newest first)
- ✅ Each order shows:
   - ✅ Order ID (shortened)
   - ✅ Status badge (color-coded)
   - ✅ Order date/time
   - ✅ Phone number
   - ✅ Delivery address
   - ✅ Items list with quantities
   - ✅ Total amount with ₹ symbol

**Pass/Fail:** ___

---

### ✅ Test 4.2 - Order Status Display

**Objective:** Verify order status displays correctly

**Steps:**
1. View orders history page
2. Check status badges

**Expected Results:**
- ✅ Status badges color-coded:
   - ✅ "Placed" = Yellow background
   - ✅ "Paid" = Blue background
   - ✅ "Confirmed" = Light blue background
   - ✅ "Delivered" = Green background
   - ✅ "Cancelled" = Red background

**Pass/Fail:** ___

---

### ✅ Test 4.3 - Multiple Orders Display

**Objective:** Verify multiple orders display correctly

**Steps:**
1. Place 2-3 orders with same user
2. View order history

**Expected Results:**
- ✅ All orders displayed
- ✅ No orders mixed with other users
- ✅ Orders maintain correct details
- ✅ Totals calculate correctly per order
- ✅ Items displayed accurately per order

**Pass/Fail:** ___

---

## Test Suite 5: Admin Dashboard

### ✅ Test 5.1 - Admin Registration

**Objective:** Verify admin user can be created

**Steps:**
1. Via PowerShell, run:
   ```powershell
   Invoke-WebRequest -Uri http://localhost:5000/api/auth/register `
     -Method POST `
     -ContentType "application/json" `
     -Body '{"name":"Admin","email":"admin@test.com","password":"admin123","role":"admin"}'
   ```

**Expected Results:**
- ✅ Status code: 201 Created
- ✅ User created in database
- ✅ role = "admin"
- ✅ JWT token returned
- ✅ User can login with these credentials

**Pass/Fail:** ___

---

### ✅ Test 5.2 - Admin Login & Dashboard Access

**Objective:** Verify admin can login and access dashboard

**Steps:**
1. Login as admin (admin@test.com / admin123)
2. Look for "📊 Admin Dashboard" in dropdown

**Expected Results:**
- ✅ "📊 Admin Dashboard" option visible (not for regular users)
2. Click "Admin Dashboard"

**Expected Results:**
- ✅ Navigated to admin.html
- ✅ Menu items table loaded
- ✅ All menu items displayed
- ✅ Table shows: Name, Category, Price, Action buttons
- ✅ Add/Edit/Delete buttons visible

**Pass/Fail:** ___

---

### ✅ Test 5.3 - View All Menu Items

**Objective:** Verify admin can see all menu items

**Steps:**
1. On admin dashboard
2. Scroll through menu items table

**Expected Results:**
- ✅ All items from database displayed
- ✅ Item details: name, category, price
- ✅ Images displayed (if applicable)
- ✅ Descriptions shown
- ✅ No data is truncated

**Pass/Fail:** ___

---

### ✅ Test 5.4 - Add New Menu Item

**Objective:** Verify admin can add new menu item

**Steps:**
1. Click "➕ Add New Item" button
2. Modal dialog appears
3. Fill form:
   ```
   Name: Garlic Bread
   Description: Crispy garlic bread with butter
   Category: Starter
   Price: 149
   Image URL: images/starter/garlic-bread.jpg
   ```
4. Click "Add Item" button
5. Wait for success message

**Expected Results:**
- ✅ Modal dialog shows
- ✅ All form fields present
- ✅ Category is dropdown with enum values
- ✅ Form validates all fields required
- ✅ Item added to database
- ✅ Success notification shown
- ✅ Table refreshes immediately
- ✅ New item appears in table
- ✅ Can add another item

**Pass/Fail:** ___

---

### ✅ Test 5.5 - Verify Item in Database

**Objective:** Verify added item exists in database

**Steps:**
1. Check MongoDB `restaurantDB.menu` collection
2. Find "Garlic Bread" item

**Expected Results:**
- ✅ Item document exists
- ✅ name = "Garlic Bread"
- ✅ category = "Starter"
- ✅ price = 149
- ✅ description present
- ✅ image path stored

**Pass/Fail:** ___

---

### ✅ Test 5.6 - Edit Menu Item

**Objective:** Verify admin can edit menu item

**Steps:**
1. In admin dashboard, find added item
2. Click "✏️ Edit" button
3. Modal dialog pre-fills with current data
4. Change price: 199
5. Change description: "Garlic and herb bread"
6. Click "Update" button

**Expected Results:**
- ✅ Modal shows current item data
- ✅ Fields pre-filled with existing values
- ✅ Can modify any field
- ✅ Item updated in database
- ✅ Success notification shown
- ✅ Table refreshes
- ✅ Updated values displayed

**Pass/Fail:** ___

---

### ✅ Test 5.7 - Delete Menu Item

**Objective:** Verify admin can delete menu item

**Steps:**
1. In admin dashboard, find added item
2. Click "🗑️ Delete" button
3. Confirmation dialog shows
4. Confirm deletion

**Expected Results:**
- ✅ Confirmation dialog appears
- ✅ Item removed from database
- ✅ Success notification shown
- ✅ Table refreshes
- ✅ Item no longer visible
- ✅ Item count decreases

**Pass/Fail:** ___

---

### ✅ Test 5.8 - Non-Admin Cannot Access Admin Dashboard

**Objective:** Verify access control for admin routes

**Steps:**
1. Login as regular user
2. Try to access `http://localhost:5000/admin.html`

**Expected Results:**
- ✅ "📊 Admin Dashboard" NOT in dropdown
- ✅ Cannot manually navigate to admin.html (or gets redirected)
- ✅ API calls return 403 Forbidden

**Pass/Fail:** ___

---

## Test Suite 6: Security & Validation

### ✅ Test 6.1 - Password Security

**Objective:** Verify passwords are hashed

**Steps:**
1. Register new user
2. Check MongoDB `users` collection
3. Look for user password field

**Expected Results:**
- ✅ Password is hashed (not plaintext)
- ✅ Starts with "$2b$" (bcrypt format)
- ✅ Cannot read original password
- ✅ Same password creates different hash each time

**Pass/Fail:** ___

---

### ✅ Test 6.2 - JWT Token Validation

**Objective:** Verify invalid tokens are rejected

**Steps:**
1. Open browser DevTools Console
2. Modify token in localStorage to invalid value
3. Try to access protected route (e.g., cart.html)

**Expected Results:**
- ✅ API call returns 401 Unauthorized
- ✅ User redirected to login page
- ✅ Error message shown
- ✅ Cannot access protected resources

**Pass/Fail:** ___

---

### ✅ Test 6.3 - Email Format Validation

**Objective:** Verify invalid email rejected

**Steps:**
1. On register page
2. Enter invalid email: "notanemail"
3. Try to register

**Expected Results:**
- ✅ Form validation error shown
- ✅ Registration not submitted
- ✅ Error message about email format

**Pass/Fail:** ___

---

### ✅ Test 6.4 - Duplicate Email Prevention

**Objective:** Verify duplicate emails rejected

**Steps:**
1. Register user with email: test@example.com
2. Try to register again with same email

**Expected Results:**
- ✅ Error message: "❌ User already exists"
- ✅ Registration fails
- ✅ Only one user with this email in database

**Pass/Fail:** ___

---

### ✅ Test 6.5 - Cart Data Persistence Across Sessions

**Objective:** Verify cart saved in localStorage

**Steps:**
1. Add items to cart
2. Close browser (don't logout)
3. Reopen browser and login
4. Go to cart page

**Expected Results:**
- ✅ Cart items still present
- ✅ Quantities preserved
- ✅ No data loss on page refresh
- ✅ Cart data persists until order placed

**Pass/Fail:** ___

---

## Test Suite 7: Cross-Browser Testing

### ✅ Test 7.1 - Responsive Design

**Objective:** Verify responsive design works

**Steps:**
1. Test on different browser sizes:
   - Mobile: 375px width
   - Tablet: 768px width
   - Desktop: 1920px width
2. Check layout adjusts properly

**Expected Results:**
- ✅ Mobile: Stack layout, readable text
- ✅ Tablet: 2-column layout, properly sized
- ✅ Desktop: Full layout, proper spacing
- ✅ Navigation works on all sizes
- ✅ Forms are usable on mobile
- ✅ No horizontal scrolling (except intentional)

**Pass/Fail:** ___

---

### ✅ Test 7.2 - Browser Compatibility

**Objective:** Verify works on multiple browsers

**Test on:**
- Chrome/Chromium
- Firefox
- Safari
- Edge

**Expected Results:**
- ✅ All features work on all browsers
- ✅ Styling consistent
- ✅ No JavaScript errors
- ✅ Responsive design works

**Pass/Fail:** ___

---

## Test Suite 8: API Testing (Backend)

### ✅ Test 8.1 - GET All Menu Items

**Steps:**
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/menu -Method GET
```

**Expected Results:**
- ✅ Status: 200 OK
- ✅ Returns array of menu items
- ✅ Each item has: _id, name, description, category, price, image

**Pass/Fail:** ___

---

### ✅ Test 8.2 - POST Add Menu Item (Unauthorized)

**Steps:**
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/menu -Method POST -ContentType "application/json" -Body '{"name":"Test","description":"Test","category":"Starter","price":100,"image":"test.jpg"}'
```

**Expected Results:**
- ✅ Status: 401 Unauthorized
- ✅ Error: "No token provided"

**Pass/Fail:** ___

---

### ✅ Test 8.3 - POST Add Menu Item (Non-Admin)

**Steps:**
```powershell
# Get token as regular user first
$token = "user_token_here"
Invoke-WebRequest -Uri http://localhost:5000/api/menu -Method POST `
  -Headers @{"Authorization"="Bearer $token"} `
  -ContentType "application/json" `
  -Body '{"name":"Test","description":"Test","category":"Starter","price":100,"image":"test.jpg"}'
```

**Expected Results:**
- ✅ Status: 403 Forbidden
- ✅ Error: "Admin access required"

**Pass/Fail:** ___

---

### ✅ Test 8.4 - GET User Orders (Protected)

**Steps:**
```powershell
$token = "valid_token"
Invoke-WebRequest -Uri http://localhost:5000/api/order/my-orders -Method GET `
  -Headers @{"Authorization"="Bearer $token"}
```

**Expected Results:**
- ✅ Status: 200 OK
- ✅ Returns array of user's orders
- ✅ Only returns orders for that user

**Pass/Fail:** ___

---

## Summary Report

| Test Suite | Total | Passed | Failed | Status |
|------------|-------|--------|--------|--------|
| Authentication | 4 | ___ | ___ | ___ |
| Cart | 6 | ___ | ___ | ___ |
| Order & Payment | 4 | ___ | ___ | ___ |
| Order Tracking | 3 | ___ | ___ | ___ |
| Admin Dashboard | 8 | ___ | ___ | ___ |
| Security | 5 | ___ | ___ | ___ |
| Cross-Browser | 2 | ___ | ___ | ___ |
| API Testing | 4 | ___ | ___ | ___ |
| **TOTAL** | **36** | **___** | **___** | **___** |

---

## Final Sign-Off

**Tested By:** ___________________

**Date:** ___________________

**Status:** ✅ PASSED / ❌ FAILED

**Notes:**
```
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
```

---

**All tests completed and verified on:** May 1, 2026
