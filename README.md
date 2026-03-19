# TechShop - E-commerce Testing Application

A complete React e-commerce frontend application designed specifically for UX testing and regression testing. No backend required - all data is simulated using localStorage and React state.

## Features

### 1. Authentication System
- Login page with form validation
- Protected routes (redirects to login if not authenticated)
- Logout functionality
- Mock user credentials stored in code

**Demo Credentials:**
- Email: `test@example.com`
- Password: `password123`

OR

- Email: `demo@example.com`
- Password: `demo123`

### 2. Home / Shop Page
- Product catalog with 12 pre-loaded products
- Search functionality (searches by name and description)
- Category filters (All, Electronics, Accessories, Home, Lifestyle, Office)
- Product count display
- Add to cart from product cards

### 3. Product Detail Page
- Individual product view with full description
- Large product image
- Add to cart functionality
- Back to shop navigation

### 4. Shopping Cart
- View all cart items
- Increase/decrease quantity
- Remove items from cart
- Real-time total calculation
- Empty cart message
- Proceed to checkout button

### 5. Checkout Process
- Complete shipping information form
- Field validations:
  - Name (required)
  - Address (required)
  - City (required)
  - ZIP Code (required, must be 5 digits)
  - Phone (required, must be 10 digits)
- Order summary sidebar
- Success confirmation message
- Automatic redirect to dashboard after purchase

### 6. User Dashboard
- User profile information
- Order statistics (total orders, total spent)
- Complete order history with:
  - Order date
  - Items purchased
  - Shipping information
  - Total amount

### 7. Data Persistence
- Cart items saved to localStorage
- User session saved to localStorage
- Order history saved to localStorage
- Data persists across page refreshes

## Testing Features

### Data Test IDs
All interactive elements include `data-testid` attributes for easy automated testing:

**Authentication:**
- `login-title`
- `login-form`
- `email-input`
- `password-input`
- `login-submit`
- `login-error`
- `logout-button`

**Navigation:**
- `navbar`
- `logo-link`
- `home-link`
- `cart-link`
- `cart-count`
- `dashboard-link`

**Products:**
- `product-card-{id}`
- `product-name-{id}`
- `product-price-{id}`
- `product-image-{id}`
- `add-to-cart-{id}`
- `search-input`
- `category-filter-{category}`
- `product-count`

**Cart:**
- `cart-title`
- `cart-item-{id}`
- `quantity-{id}`
- `increase-quantity-{id}`
- `decrease-quantity-{id}`
- `remove-item-{id}`
- `item-subtotal-{id}`
- `cart-total`
- `checkout-button`
- `empty-cart-message`

**Checkout:**
- `checkout-title`
- `checkout-form`
- `checkout-name`
- `checkout-address`
- `checkout-city`
- `checkout-zipcode`
- `checkout-phone`
- `name-error`, `address-error`, etc.
- `place-order-button`
- `checkout-total`
- `success-message`

**Dashboard:**
- `dashboard-title`
- `profile-card`
- `orders-card`
- `order-count`
- `spent-card`
- `total-spent`
- `order-{id}`

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Navigation bar with cart count
│   ├── ProductCard.tsx         # Reusable product card component
│   └── ProtectedRoute.tsx      # Route protection wrapper
├── context/
│   ├── AuthContext.tsx         # Authentication state management
│   └── CartContext.tsx         # Shopping cart state management
├── data/
│   └── products.ts             # Mock product data (12 products)
├── pages/
│   ├── Login.tsx               # Login page with validation
│   ├── Home.tsx                # Product catalog with search/filter
│   ├── ProductDetail.tsx       # Individual product view
│   ├── Cart.tsx                # Shopping cart page
│   ├── Checkout.tsx            # Checkout form with validation
│   └── Dashboard.tsx           # User dashboard and order history
├── types/
│   └── index.ts                # TypeScript type definitions
├── App.tsx                     # Main app with routing
└── main.tsx                    # App entry point
```

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run type checking:**
   ```bash
   npm run typecheck
   ```

## Test Cases Supported

### Authentication Tests
- ✅ Successful login with valid credentials
- ✅ Failed login with invalid credentials
- ✅ Form validation (empty fields, password length)
- ✅ Protected route access (redirects when not authenticated)
- ✅ Logout functionality
- ✅ Session persistence after page refresh

### Navigation Tests
- ✅ Navigate between all pages
- ✅ Logo click returns to home
- ✅ Cart badge shows correct item count
- ✅ Protected routes redirect to login

### Product Browsing Tests
- ✅ View all products
- ✅ Search products by name/description
- ✅ Filter products by category
- ✅ View product details
- ✅ Add product to cart from catalog
- ✅ Add product to cart from detail page

### Shopping Cart Tests
- ✅ View cart items
- ✅ Increase product quantity
- ✅ Decrease product quantity
- ✅ Remove product from cart
- ✅ Cart total calculation
- ✅ Empty cart state
- ✅ Cart persistence across page refresh

### Checkout Tests
- ✅ View order summary
- ✅ Form field validation (all fields)
- ✅ ZIP code format validation (5 digits)
- ✅ Phone number format validation (10 digits)
- ✅ Successful order placement
- ✅ Cart cleared after order
- ✅ Redirect to dashboard after order

### Dashboard Tests
- ✅ View user profile
- ✅ View order count
- ✅ View total spent
- ✅ View order history
- ✅ Order persistence across sessions

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Data persistence
- **Vite** - Build tool

## Notes for Testing

1. **No backend required** - All data is mocked and stored in localStorage
2. **Consistent data-testid attributes** - Easy to target with Playwright, Selenium, etc.
3. **Clear error messages** - All validation errors are displayed with test IDs
4. **Modular components** - Easy to test individual components in isolation
5. **Type-safe** - TypeScript ensures type consistency across the app

## Automated Testing Recommendations

For **Playwright** or **Selenium**, you can easily:
- Target elements using `data-testid` attributes
- Test complete user flows (login → browse → add to cart → checkout)
- Verify localStorage persistence
- Test form validations
- Test error states

Example Playwright test:
```typescript
await page.getByTestId('email-input').fill('test@example.com');
await page.getByTestId('password-input').fill('password123');
await page.getByTestId('login-submit').click();
await expect(page.getByTestId('navbar')).toBeVisible();
```

## License

This project is created for testing and educational purposes.
