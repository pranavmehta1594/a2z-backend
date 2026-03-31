# A2Z Shop Backend

Backend API for A2Z Shop e-commerce platform using Node.js, Express, and MongoDB.

## Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middlewares
│   ├── services/            # Business logic layer
│   ├── utils/               # Helper utilities
│   ├── validators/          # Request validators
│   ├── jobs/                # Background jobs
│   ├── docs/                # API documentation
│   ├── app.js               # Express setup
│   └── server.js            # Entry point
├── tests/                   # Unit & integration tests
├── .env.example             # Environment variables template
├── package.json
├── nodemon.json             # Nodemon configuration
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update the values accordingly.

4. **Start the server**
   - Development (with auto-reload):
     ```bash
     npm run dev
     ```
   - Production:
     ```bash
     npm start
     ```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `PUT /api/users/change-password` - Change password
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/top-products` - Get top rated products
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ORM
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **joi** - Request validation
- **cors** - CORS middleware
- **morgan** - HTTP request logger

## Development Dependencies

- **nodemon** - Auto-restart server
- **jest** - Testing framework
- **supertest** - HTTP assertion library

## Database Models

### User
- name, email, password, phone, avatar, role, address, isActive

### Product
- name, description, price, discount, category, images, stock, status, ratings, reviews

### Category
- name, description, image, slug, isActive

### Order
- user, items, totalAmount, shippingAddress, status, paymentStatus, paymentMethod

## Middleware

- **Authentication** - JWT-based authentication
- **Authorization** - Role-based access control
- **Validation** - Request body validation
- **Error Handling** - Centralized error handling
- **CORS** - Cross-Origin Resource Sharing

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
