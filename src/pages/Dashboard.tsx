import { User, Package, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export function Dashboard() {
  const { user } = useAuth();
  const { orders } = useCart();

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="dashboard-title">
          My Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6" data-testid="profile-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Profile</h2>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6" data-testid="orders-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Orders</h2>
            </div>
            <p className="text-4xl font-bold text-gray-800" data-testid="order-count">
              {orders.length}
            </p>
            <p className="text-gray-600 text-sm">Total orders placed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6" data-testid="spent-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <ShoppingBag className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Total Spent</h2>
            </div>
            <p className="text-4xl font-bold text-gray-800" data-testid="total-spent">
              ${totalSpent.toFixed(2)}
            </p>
            <p className="text-gray-600 text-sm">Lifetime spending</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

          {orders.length === 0 ? (
            <div className="text-center py-8" data-testid="no-orders">
              <Package size={48} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition"
                  data-testid={`order-${order.id}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">Order #{order.id}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div
                        key={item.product.id}
                        className="flex items-center space-x-3 text-sm"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="text-gray-800">{item.product.name}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Shipped to:</span> {order.shippingInfo.name}, {order.shippingInfo.address}, {order.shippingInfo.city} {order.shippingInfo.zipCode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
