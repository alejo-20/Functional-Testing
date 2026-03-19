import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} data-testid={`product-card-${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            data-testid={`product-image-${product.id}`}
          />
          <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <div className="p-4">
          <h3
            className="text-lg font-semibold text-gray-800 mb-2 truncate"
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span
              className="text-2xl font-bold text-blue-600"
              data-testid={`product-price-${product.id}`}
            >
              ${product.price.toFixed(2)}
            </span>

            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2 shadow-md hover:shadow-lg"
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
