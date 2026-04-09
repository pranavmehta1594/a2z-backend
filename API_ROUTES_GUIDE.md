# API Routes Guide - Private vs Public

## Overview
Your API now has two distinct route prefixes:
- **`/api/admin`** - Private routes (require authentication & admin role)
- **`/api/website`** - Public routes (frontend can access freely)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Express App (app.ts)                     │
└─────────────────────────────────────────────────────────────┘
        ↓                                    ↓
    ┌───────────────────┐         ┌─────────────────────┐
    │  /api/admin       │         │  /api/website       │
    │ (admin.routes.ts) │         │(website.routes.ts)  │
    └───────────────────┘         └─────────────────────┘
    ↓ ALL require:                 ↓ PUBLIC ACCESS
    - Auth Middleware              (No auth needed)
    - Admin Role Check
        ↓                              ↓
    ├─ /auth                       ├─ /products
    ├─ /users                      ├─ /categories
    ├─ /products                   ├─ /auth
    ├─ /categories                 └─ /orders
    └─ /orders
```

---

## API Endpoints Details

### 1. ADMIN API - `GET /api/admin/...` (Private - Requires Auth)

All admin routes require:
1. **Authentication Token** - Valid JWT in `Authorization: Bearer <token>` header
2. **Admin Role** - User must have `role: "admin"`

#### Admin Auth
```bash
POST /api/admin/auth/login
POST /api/admin/auth/register
POST /api/admin/auth/refresh
```

#### Admin Product Management
```bash
GET    /api/admin/products           # List all products (admin-only)
POST   /api/admin/products           # Create product (admin-only)
GET    /api/admin/products/:id       # Get product details (admin-only)
PUT    /api/admin/products/:id       # Update product (admin-only)
DELETE /api/admin/products/:id       # Delete product (admin-only)
```

#### Admin Category Management
```bash
GET    /api/admin/categories         # List all categories (admin-only)
POST   /api/admin/categories         # Create category (admin-only)
GET    /api/admin/categories/:id     # Get category (admin-only)
PUT    /api/admin/categories/:id     # Update category (admin-only)
DELETE /api/admin/categories/:id     # Delete category (admin-only)
```

#### Admin User Management
```bash
GET    /api/admin/users              # List all users (admin-only)
GET    /api/admin/users/:id          # Get user details (admin-only)
PUT    /api/admin/users/:id          # Update user (admin-only)
DELETE /api/admin/users/:id          # Delete user (admin-only)
```

#### Admin Order Management
```bash
GET    /api/admin/orders             # List all orders (admin-only)
GET    /api/admin/orders/:id         # Get order details (admin-only)
PUT    /api/admin/orders/:id         # Update order status (admin-only)
DELETE /api/admin/orders/:id         # Delete order (admin-only)
```

---

### 2. WEBSITE API - `/api/website/...` (Public - No Auth Required)

These routes are accessible from your frontend without any authentication.

#### Public Authentication
```bash
POST /api/website/auth/login         # Customer login
POST /api/website/auth/register      # Customer registration
POST /api/website/auth/refresh       # Refresh token
```

#### Public Product Browsing (READ ONLY)
```bash
GET  /api/website/products           # List all products (no auth needed)
GET  /api/website/products/:id       # Get product details (no auth needed)
GET  /api/website/products/top-products  # Get top products (no auth needed)
```

**❌ NOT AVAILABLE FOR CUSTOMERS:**
```
POST   /api/website/products         # ❌ Create (admin only)
PUT    /api/website/products/:id     # ❌ Update (admin only)
DELETE /api/website/products/:id     # ❌ Delete (admin only)
```

#### Public Category Browsing (READ ONLY)
```bash
GET  /api/website/categories         # List all categories (no auth needed)
GET  /api/website/categories/:id     # Get specific category (no auth needed)
```

**❌ NOT AVAILABLE:**
```
POST   /api/website/categories       # ❌ Create (admin only)
PUT    /api/website/categories/:id   # ❌ Update (admin only)
DELETE /api/website/categories/:id   # ❌ Delete (admin only)
```

#### Customer Orders
```bash
POST   /api/website/orders           # Create order (customer authenticated)
GET    /api/website/orders/:id       # Get own order details (customer authenticated)
```

---

## How to Use from Frontend

### 1. Fetch Products (Public - No Login Needed)
```typescript
// No token required
fetch('http://backend-url/api/website/products')
  .then(res => res.json())
  .then(data => console.log(data))
```

### 2. Fetch Categories (Public - No Login Needed)
```typescript
// No token required
fetch('http://backend-url/api/website/categories')
  .then(res => res.json())
  .then(data => console.log(data))
```

### 3. Login and Get Admin Access
```typescript
// 1. Login to get token
const loginRes = await fetch('http://backend-url/api/website/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@example.com', password: 'pass' })
});
const { data } = await loginRes.json();
const token = data.accessToken;

// 2. Use token for admin operations
const productsRes = await fetch('http://backend-url/api/admin/products', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## Security Rules

| Operation | Route | Authentication | Role Required | Access |
|-----------|-------|----------------|----|---------|
| **View Products** | `/website/products` | ❌ No | - | ✅ Public |
| **View Categories** | `/website/categories` | ❌ No | - | ✅ Public |
| **Create Product** | `/admin/products` | ✅ Yes | admin | 🔒 Admin Only |
| **Update Product** | `/admin/products/:id` | ✅ Yes | admin | 🔒 Admin Only |
| **Delete Product** | `/admin/products/:id` | ✅ Yes | admin | 🔒 Admin Only |
| **View All Users** | `/admin/users` | ✅ Yes | admin | 🔒 Admin Only |

---

## Middleware Flow

### Admin Routes Flow
```
Request → /api/admin/* 
    ↓
authMiddleware (verify JWT token)
    ↓
roleMiddleware (check if user is admin)
    ↓
Controller (if both pass)
    ↓
Response
```

### Website Routes Flow
```
Request → /api/website/* 
    ↓
No middleware (public endpoint)
    ↓
Controller
    ↓
Response
```

---

## Environment Configuration

Ensure CORS is configured to allow your frontend:

```javascript
// app.ts
const corsOrigins = (config.CORS_ORIGIN || 'http://localhost:8080')
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-REFRESH-TOKEN', 'Accept'],
}));
```

Set in `.env`:
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:8080
```

---

## File Structure

```
backend/src/
├── routes/
│   ├── admin.routes.ts       # Admin API entry point (protected)
│   └── website.routes.ts     # Frontend API entry point (public)
├── modules/
│   ├── auth/
│   │   └── auth.routes.ts    # Login/Register (used by both admin & website)
│   ├── product/
│   │   └── product.routes.ts # Read: public | Write: admin-only
│   ├── category/
│   │   └── category.routes.ts# Read: public | Write: admin-only
│   └── ...
└── middlewares/
    ├── auth.middleware.ts    # Verifies JWT token
    └── role.middleware.ts    # Checks user role
```

---

## Best Practices

1. ✅ **Frontend calls `/api/website`** for public data (products, categories)
2. ✅ **Admin panel calls `/api/admin`** with token for management
3. ✅ **Always include token** in admin requests: `Authorization: Bearer <token>`
4. ✅ **Check role.middleware** before admin operations
5. ❌ **Never bypass authentication** for admin routes
6. ❌ **Don't expose `/api/admin` endpoints** to frontend without verification

---

## Common Errors & Solutions

### Error: "401 No token provided"
**Problem:** Trying to access `/api/admin/*` without token
**Solution:** Include token in header: `Authorization: Bearer <your_token>`

### Error: "403 Access denied. Insufficient role"
**Problem:** User is authenticated but not admin
**Solution:** Only admin users can access `/api/admin/*`

### Error: "CORS Error"
**Problem:** Frontend and backend have different origins
**Solution:** Add frontend URL to `CORS_ORIGIN` in `.env`

---

## Summary

```
ADMIN API    (/api/admin/*)
├─ Requires: Valid JWT Token + Admin Role
├─ Used by: Admin Dashboard
└─ Operations: Full CRUD for products, categories, users, orders

WEBSITE API  (/api/website/*)
├─ Requires: None (public)
├─ Used by: Customer Frontend
└─ Operations: Read products/categories, Auth, Orders
```

This ensures your admin functionality is protected while keeping product/category data public for customers!
