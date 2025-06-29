import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, X, Truck, Store, MapPin } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  extras: string[];
  quantity: number;
}

interface CartPageProps {
  onBackToStore: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ 
  onBackToStore, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'pickup' ? 0 : 819; // ₹819 for delivery
  const total = subtotal + shippingCost;

  const handleQuantityChange = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      onUpdateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCheckingOut(false);
    alert('Order placed successfully! Thank you for your purchase.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Store className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some amazing musical instruments to get started!</p>
          <button
            onClick={onBackToStore}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Cart</h1>
          <button
            onClick={onBackToStore}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue shopping</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700 uppercase tracking-wider">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-center">Total</div>
          </div>

          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-6 items-center hover:bg-gray-50 transition-colors">
                {/* Product Info */}
                <div className="col-span-6 flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.brand} {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">#{item.model}</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Color:</span> {item.color}
                      {item.extras.length > 0 && (
                        <>
                          <span className="mx-2">//</span>
                          <span className="font-medium">Extras:</span> {item.extras.join(' + ')}
                        </>
                      )}
                    </div>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm text-green-600 font-medium">
                          + {((item.originalPrice - item.price) / item.originalPrice * 100).toFixed(0)}% Off
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-lg font-semibold text-gray-900 w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="col-span-1 text-center">
                  <div className="text-lg font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Remove Button */}
                <div className="col-span-1 text-center">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Options */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose shipping mode:</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="pickup"
                  checked={shippingMethod === 'pickup'}
                  onChange={(e) => setShippingMethod(e.target.value as 'pickup')}
                  className="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500"
                />
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Store className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Store pickup (in 20 min)</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  value="delivery"
                  checked={shippingMethod === 'delivery'}
                  onChange={(e) => setShippingMethod(e.target.value as 'delivery')}
                  className="w-4 h-4 text-gray-300 border-gray-300 focus:ring-gray-500"
                />
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Delivery at home (Under 2 - 4 day)</span>
                    <span className="text-gray-900 font-semibold">₹819</span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1 ml-6">
                    <MapPin className="h-3 w-3 text-gray-500" />
                    <span className="text-sm text-gray-500">At 45 Glenridge Ave, Mumbai, MH 400001</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end">
              <div className="w-80">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SUBTOTAL TTC</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SHIPPING</span>
                    <span className="font-semibold text-gray-900">
                      {shippingCost === 0 ? 'Free' : `₹${shippingCost.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">TOTAL</span>
                      <span className="text-gray-900">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full mt-6 bg-red-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Checkout</span>
                      <span>₹{total.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;