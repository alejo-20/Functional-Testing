import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition"
          data-testid="back-button"
        >
          <ArrowLeft size={20} />
          <span>Back to Shop</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                data-testid="product-detail-image"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                  {product.category}
                </span>

                <h1
                  className="text-4xl font-bold text-gray-800 mb-4"
                  data-testid="product-detail-name"
                >
                  {product.name}
                </h1>

                <p
                  className="text-gray-600 text-lg mb-6 leading-relaxed"
                  data-testid="product-detail-description"
                >
                  {product.description}
                </p>

                <div className="mb-8">
                  <span
                    className="text-5xl font-bold text-blue-600"
                    data-testid="product-detail-price"
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Product Features:</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>• High-quality materials</li>
                    <li>• Fast shipping available</li>
                    <li>• 30-day return policy</li>
                    <li>• 1-year warranty included</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
                data-testid="add-to-cart-detail"
              >
                <ShoppingCart size={24} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
