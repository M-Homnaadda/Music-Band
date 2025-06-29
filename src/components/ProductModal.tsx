import React, { useState } from 'react';
import { X, Plus, Minus, Star, Heart, ShoppingCart, Check } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isHot?: boolean;
  isNew?: boolean;
  discount?: number;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, options: { color: string; extras: string[] }) => void;
  isAuthenticated: boolean;
  onSignInClick: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isAuthenticated,
  onSignInClick
}) => {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const colors = ['Black', 'White', 'Sunburst', 'Natural', 'Red', 'Blue'];
  const extras = [
    { name: 'Hard Case', price: 2499 },
    { name: 'Guitar Strap', price: 499 },
    { name: 'Extra Strings', price: 299 },
    { name: 'Guitar Pick Set', price: 199 },
    { name: 'Tuner', price: 899 }
  ];

  const handleExtraToggle = (extraName: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      onSignInClick();
      return;
    }

    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onAddToCart(product, {
      color: selectedColor,
      extras: selectedExtras
    });
    
    setIsAddingToCart(false);
    onClose();
  };

  const getTotalPrice = () => {
    const extrasPrice = selectedExtras.reduce((total, extraName) => {
      const extra = extras.find(e => e.name === extraName);
      return total + (extra?.price || 0);
    }, 0);
    return (product.price + extrasPrice) * quantity;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative bg-gray-50 p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
              {product.isNew && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">NEW</span>
              )}
              {product.isHot && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">HOT</span>
              )}
              {product.discount && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.brand}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      selectedColor === color
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Add Extras</h3>
              <div className="space-y-2">
                {extras.map((extra) => (
                  <label key={extra.name} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedExtras.includes(extra.name)}
                      onChange={() => handleExtraToggle(extra.name)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="flex-1 text-sm text-gray-700">{extra.name}</span>
                    <span className="text-sm font-semibold text-gray-900">
                      +₹{extra.price.toLocaleString('en-IN')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <span className="text-lg font-semibold text-gray-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{getTotalPrice().toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Product Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Free shipping on orders over ₹2000</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>1-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;