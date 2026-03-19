import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingInfo } from '../types';

export function Checkout() {
  const { cartItems, getCartTotal, createOrder } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ShippingInfo>({
    name: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code must be 5 digits';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createOrder(formData);
    setShowSuccess(true);

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const handleChange = (field: keyof ShippingInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-2xl max-w-md" data-testid="success-message">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>
          <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8" data-testid="checkout-title">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>

              <form onSubmit={handleSubmit} data-testid="checkout-form">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="checkout-name"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1" data-testid="name-error">
                        <AlertCircle size={14} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Address *
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="checkout-address"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1" data-testid="address-error">
                        <AlertCircle size={14} />
                        <span>{errors.address}</span>
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleChange('city', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="checkout-city"
                      />
                      {errors.city && (
                        <p className="text-red-600 text-sm mt-1 flex items-center space-x-1" data-testid="city-error">
                          <AlertCircle size={14} />
                          <span>{errors.city}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 font-medium mb-2">
                        ZIP Code *
                      </label>
                      <input
                        id="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleChange('zipCode', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                          errors.zipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        data-testid="checkout-zipcode"
                      />
                      {errors.zipCode && (
                        <p className="text-red-600 text-sm mt-1 flex items-center space-x-1" data-testid="zipcode-error">
                          <AlertCircle size={14} />
                          <span>{errors.zipCode}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      data-testid="checkout-phone"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1 flex items-center space-x-1" data-testid="phone-error">
                        <AlertCircle size={14} />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                  data-testid="place-order-button"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-gray-600">
                    <span className="truncate mr-2">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t pt-3 flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span data-testid="checkout-total">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
