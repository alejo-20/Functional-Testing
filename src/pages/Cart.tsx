import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2" data-testid="empty-cart-message">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            data-testid="continue-shopping-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="cart-title">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div
                key={item.product.id}
                className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
                data-testid={`cart-item-${item.product.id}`}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{item.product.category}</p>
                  <p className="text-xl font-bold text-blue-600">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                    data-testid={`decrease-quantity-${item.product.id}`}
                  >
                    <Minus size={16} />
                  </button>

                  <span
                    className="font-semibold text-lg w-8 text-center"
                    data-testid={`quantity-${item.product.id}`}
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
                    data-testid={`increase-quantity-${item.product.id}`}
                  >
                    <Plus size={16} />
                  </button>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition ml-4"
                    data-testid={`remove-item-${item.product.id}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Subtotal</p>
                  <p
                    className="text-xl font-bold text-gray-800"
                    data-testid={`item-subtotal-${item.product.id}`}
                  >
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span data-testid="cart-total">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                data-testid="checkout-button"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                data-testid="continue-shopping-link"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
