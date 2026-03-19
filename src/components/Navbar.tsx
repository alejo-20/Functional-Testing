import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
              data-testid="logo-link"
            >
              <Store size={32} />
              <span>TechShop</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                  data-testid="home-link"
                >
                  Shop
                </Link>

                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-blue-600 transition"
                  data-testid="cart-link"
                >
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                      data-testid="cart-count"
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition"
                  data-testid="dashboard-link"
                >
                  <User size={24} />
                  <span className="hidden sm:inline font-medium">{user?.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition"
                  data-testid="logout-button"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
