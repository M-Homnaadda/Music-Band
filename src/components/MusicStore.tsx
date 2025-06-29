import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Star, 
  Filter,
  ArrowLeft,
  Menu,
  ChevronDown,
  Grid,
  List,
  SortAsc
} from 'lucide-react';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import { useAuth } from '../hooks/useAuth';

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

interface MusicStoreProps {
  onBackToHome: () => void;
}

const MusicStore: React.FC<MusicStoreProps> = ({ onBackToHome }) => {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [cartItems, setCartItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎵' },
    { id: 'electric-guitar', name: 'Electric Guitar', icon: '🎸' },
    { id: 'acoustic-guitar', name: 'Acoustic Guitar', icon: '🎸' },
    { id: 'bass', name: 'Bass', icon: '🎸' },
    { id: 'keyboard', name: 'Keyboard & Piano', icon: '🎹' },
    { id: 'drums', name: 'Drum & Percussion', icon: '🥁' },
    { id: 'microphone', name: 'Microphone', icon: '🎤' },
    { id: 'studio', name: 'Studio & Recording', icon: '🎚️' },
    { id: 'pedal', name: 'Pedal & Pedal Board', icon: '🎛️' },
    { id: 'amplifier', name: 'Amplifier', icon: '🔊' }
  ];

  const topBrands = [
    { name: 'Fender', logo: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Gibson', logo: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'PRS', logo: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Roland', logo: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Marshall', logo: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' },
    { name: 'Yamaha', logo: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2' }
  ];

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Fender American Ultra II Stratocaster',
      brand: 'Fender',
      price: 2199.99,
      rating: 4.8,
      reviews: 124,
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar',
      isNew: true
    },
    {
      id: 2,
      name: 'Player II Stratocaster HSS',
      brand: 'Fender',
      price: 829.99,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar'
    },
    {
      id: 3,
      name: 'Les Paul Standard 60s Heritage Cherry Sunburst',
      brand: 'Gibson',
      price: 2799.00,
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar'
    },
    {
      id: 4,
      name: 'PRS SE Custom 24 - Jade',
      brand: 'PRS',
      price: 919.00,
      rating: 4.7,
      reviews: 73,
      image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar'
    },
    {
      id: 5,
      name: 'Yamaha Pacifica PAC 612V II',
      brand: 'Yamaha',
      price: 539.00,
      rating: 4.5,
      reviews: 92,
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar'
    },
    {
      id: 6,
      name: 'Ibanez RG550 Genesis',
      brand: 'Ibanez',
      price: 899.00,
      rating: 4.6,
      reviews: 67,
      image: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      category: 'electric-guitar'
    }
  ];

  const hotDeals: Product[] = [
    {
      id: 7,
      name: 'Yamaha DTX432K Electronic Drum Set',
      brand: 'Yamaha',
      price: 599,
      originalPrice: 799,
      discount: 25,
      rating: 4.4,
      reviews: 45,
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'drums',
      isHot: true
    },
    {
      id: 8,
      name: 'Marshall DSL40CR Tube Combo Amp',
      brand: 'Marshall',
      price: 649,
      originalPrice: 799,
      discount: 19,
      rating: 4.7,
      reviews: 128,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'amplifier',
      isHot: true
    },
    {
      id: 9,
      name: 'Shure SM58 Vocal Microphone',
      brand: 'Shure',
      price: 99,
      originalPrice: 129,
      discount: 23,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'microphone',
      isHot: true
    },
    {
      id: 10,
      name: 'Audio-Technica ATH-M50x Studio Headphones',
      brand: 'Audio-Technica',
      price: 149,
      originalPrice: 199,
      discount: 25,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'studio',
      isHot: true
    },
    {
      id: 11,
      name: 'Roland FP-30X Digital Piano',
      brand: 'Roland',
      price: 649,
      originalPrice: 799,
      discount: 19,
      rating: 4.5,
      reviews: 76,
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'keyboard',
      isHot: true
    }
  ];

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }
    
    setCartItems(prev => [...prev, productId]);
    // Here you would typically make an API call to add the item to the cart
    console.log('Added to cart:', productId);
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const ProductCard: React.FC<{ product: Product; isHotDeal?: boolean }> = ({ product, isHotDeal = false }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1">
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

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <Heart 
          className={`h-4 w-4 transition-colors ${
            wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={() => handleAddToCart(product.id)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Add to Cart
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors">
            <Search className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <h1 className="text-xl font-bold text-blue-600">MusicStore</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search instruments, brands, or accessories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <UserMenu onSignInClick={handleUserIconClick} />
              <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                <Menu className="h-4 w-4" />
                <span>Categories</span>
              </button>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Brands</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Hot Deals</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Shop by Role</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Accessories</a>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Blog</span>
              <span className="text-gray-700">Customer Services</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fender American Ultra II Stratocaster
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Experience the pinnacle of electric guitar craftsmanship with the latest American Ultra II series.
              </p>
              <button 
                onClick={() => handleAddToCart(1)}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Buy Now
              </button>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=2"
                alt="Fender American Ultra II Stratocaster"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-gray-900">Fender</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-lg font-semibold text-gray-900 mb-6">Top Brands</h3>
          <div className="flex items-center justify-center space-x-8 overflow-x-auto">
            {topBrands.map((brand, index) => (
              <div key={index} className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <div className="w-20 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-700">{brand.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Shop by Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <div 
                key={category.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white text-2xl group-hover:scale-105 transition-transform duration-300">
                  {category.icon}
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guitars */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">Featured Guitars</h3>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View All
              </button>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals */}
      <section className="py-12 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-bold text-gray-900">Hot Deals</h3>
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-semibold animate-pulse">
                🔥 Limited Time
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {hotDeals.map((product) => (
              <ProductCard key={product.id} product={product} isHotDeal={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay in Tune with Our Latest Offers</h3>
          <p className="text-gray-300 mb-6">Get exclusive deals, new product announcements, and music tips delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">MusicStore</h4>
              <p className="text-gray-300 text-sm">Your one-stop destination for all musical instruments and accessories.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Categories</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Guitars</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Keyboards</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Drums</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Audio Equipment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Connect</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
            <p>&copy; 2024 MusicStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
};

export default MusicStore;