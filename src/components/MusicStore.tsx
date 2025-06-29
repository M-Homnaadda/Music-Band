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
  SortAsc,
  Zap,
  TrendingUp,
  Award,
  Shield,
  Truck,
  HeadphonesIcon,
  Music,
  Volume2,
  Play,
  Eye,
  Share2
} from 'lucide-react';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import CartPage from './CartPage';
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

interface CartItem {
  id: number;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎵', count: 156 },
    { id: 'electric-guitar', name: 'Electric Guitar', icon: '🎸', count: 45 },
    { id: 'acoustic-guitar', name: 'Acoustic Guitar', icon: '🎸', count: 32 },
    { id: 'bass', name: 'Bass', icon: '🎸', count: 18 },
    { id: 'keyboard', name: 'Keyboard & Piano', icon: '🎹', count: 28 },
    { id: 'drums', name: 'Drum & Percussion', icon: '🥁', count: 22 },
    { id: 'microphone', name: 'Microphone', icon: '🎤', count: 15 },
    { id: 'studio', name: 'Studio & Recording', icon: '🎚️', count: 35 },
    { id: 'pedal', name: 'Pedal & Effects', icon: '🎛️', count: 42 },
    { id: 'amplifier', name: 'Amplifier', icon: '🔊', count: 19 }
  ];

  const topBrands = [
    { name: 'Fender', logo: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 45 },
    { name: 'Gibson', logo: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 32 },
    { name: 'PRS', logo: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 28 },
    { name: 'Roland', logo: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 38 },
    { name: 'Marshall', logo: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 25 },
    { name: 'Yamaha', logo: 'https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=100&h=50&dpr=2', products: 52 }
  ];

  // Updated Electric Guitar Products with actual uploaded images
  const electricGuitarProducts: Product[] = [
    {
      id: 1,
      name: 'Les Paul Studio - Ebony',
      brand: 'Gibson',
      price: 181599,
      originalPrice: 219999,
      rating: 4.9,
      reviews: 124,
      image: '/src/assets/products/electric-guitar/guitar-background-upz2txx3cz5k6irg.jpg',
      category: 'electric-guitar',
      isNew: true,
      discount: 17
    },
    {
      id: 2,
      name: 'Stratocaster Player Series',
      brand: 'Fender',
      price: 68579,
      rating: 4.7,
      reviews: 189,
      image: '/src/assets/products/electric-guitar/photo-1516924962500-2b4b3b99ea02.jpg',
      category: 'electric-guitar',
      isHot: true
    },
    {
      id: 3,
      name: 'American Professional II Stratocaster',
      brand: 'Fender',
      price: 231099,
      originalPrice: 279999,
      rating: 4.8,
      reviews: 156,
      image: '/src/assets/products/electric-guitar/pexels-oskelaq-2016810.jpg',
      category: 'electric-guitar',
      discount: 17,
      isNew: true
    },
    {
      id: 4,
      name: 'Custom Electric Guitar - Neon Series',
      brand: 'Tom Anderson',
      price: 375869,
      rating: 4.9,
      reviews: 73,
      image: '/src/assets/products/electric-guitar/881331.jpg',
      category: 'electric-guitar',
      isHot: true
    },
    {
      id: 5,
      name: 'SE Custom 24 - Vintage Sunburst',
      brand: 'PRS',
      price: 94519,
      originalPrice: 115999,
      rating: 4.6,
      reviews: 92,
      image: '/src/assets/products/electric-guitar/guitar-background-upz2txx3cz5k6irg.jpg',
      category: 'electric-guitar',
      discount: 19
    },
    {
      id: 6,
      name: 'RG550 Genesis Collection',
      brand: 'Ibanez',
      price: 74259,
      rating: 4.5,
      reviews: 67,
      image: '/src/assets/products/electric-guitar/photo-1516924962500-2b4b3b99ea02.jpg',
      category: 'electric-guitar'
    }
  ];

  // Updated Keyboard & Piano Products with actual uploaded images
  const keyboardProducts: Product[] = [
    {
      id: 12,
      name: 'RP107 Digital Piano',
      brand: 'Roland',
      price: 53609,
      originalPrice: 65999,
      rating: 4.8,
      reviews: 156,
      image: '/src/assets/products/keyboard-piano/rp107_angle_left_gal.jpg',
      category: 'keyboard',
      isNew: true,
      discount: 19
    },
    {
      id: 13,
      name: 'P-225B Digital Piano',
      brand: 'Yamaha',
      price: 41299,
      rating: 4.7,
      reviews: 203,
      image: '/src/assets/products/keyboard-piano/Yamaha-P-225B-Digital-Piano-Black-Front_large.webp',
      category: 'keyboard',
      isHot: true
    },
    {
      id: 14,
      name: 'U3 Upright Piano',
      brand: 'Yamaha',
      price: 524799,
      originalPrice: 599999,
      rating: 4.9,
      reviews: 89,
      image: '/src/assets/products/keyboard-piano/up_product_u3_po-ebo_163832c6df3b2719f401bc7985f36ead.jpg',
      category: 'keyboard',
      discount: 13,
      isNew: true
    },
    {
      id: 15,
      name: 'CVP-909GP Grand Piano',
      brand: 'Yamaha',
      price: 1249999,
      rating: 4.9,
      reviews: 67,
      image: '/src/assets/products/keyboard-piano/CVP-909GP_a_0001_a0388f6bdfd18943c6b62f8e1ad13801.jpg',
      category: 'keyboard',
      isNew: true
    },
    {
      id: 16,
      name: 'PS500 Digital Piano',
      brand: 'Kawai',
      price: 82499,
      originalPrice: 99999,
      rating: 4.6,
      reviews: 134,
      image: '/src/assets/products/keyboard-piano/ps500-18761795201896_l.jpg',
      category: 'keyboard',
      discount: 18,
      isHot: true
    }
  ];

  const hotDeals: Product[] = [
    {
      id: 7,
      name: 'DTX432K Electronic Drum Set',
      brand: 'Yamaha',
      price: 49479,
      originalPrice: 65999,
      discount: 25,
      rating: 4.4,
      reviews: 45,
      image: 'https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'drums',
      isHot: true
    },
    {
      id: 8,
      name: 'DSL40CR Tube Combo Amp',
      brand: 'Marshall',
      price: 53609,
      originalPrice: 65999,
      discount: 19,
      rating: 4.7,
      reviews: 128,
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'amplifier',
      isHot: true
    },
    {
      id: 9,
      name: 'SM58 Vocal Microphone',
      brand: 'Shure',
      price: 8179,
      originalPrice: 10659,
      discount: 23,
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'microphone',
      isHot: true
    },
    {
      id: 10,
      name: 'ATH-M50x Studio Headphones',
      brand: 'Audio-Technica',
      price: 12309,
      originalPrice: 16439,
      discount: 25,
      rating: 4.6,
      reviews: 189,
      image: 'https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      category: 'studio',
      isHot: true
    }
  ];

  const allProducts = [...electricGuitarProducts, ...keyboardProducts, ...hotDeals];

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
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      const existingItem = cartItems.find(item => item.id === productId);
      
      if (existingItem) {
        setCartItems(prev => 
          prev.map(item => 
            item.id === productId 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        const newCartItem: CartItem = {
          id: product.id,
          name: product.name,
          brand: product.brand,
          model: `#${Math.random().toString().slice(2, 15)}`,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          color: ['Black', 'White', 'Sunburst', 'Natural', 'Blue'][Math.floor(Math.random() * 5)],
          extras: product.isHot ? ['Premium Case', 'Extended Warranty'] : ['Standard Case'],
          quantity: 1
        };
        setCartItems(prev => [...prev, newCartItem]);
      }
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }
    setShowCart(true);
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
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
              NEW
            </span>
          )}
          {product.isHot && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg animate-pulse">
              🔥 HOT
            </span>
          )}
          {product.discount && (
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
          >
            <Heart 
              className={`h-4 w-4 transition-colors ${
                wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
              }`} 
            />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Product Image */}
        <div className="aspect-square p-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <button 
            onClick={() => handleAddToCart(product.id)}
            className="bg-white text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-100 hover:scale-105"
          >
            Quick Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
        </div>
        
        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          {product.discount && (
            <span className="text-sm text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">
              Save ₹{((product.originalPrice || 0) - product.price).toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button 
            onClick={() => handleAddToCart(product.id)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Add to Cart
          </button>
          <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50">
            <Music className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Show Cart Page
  if (showCart) {
    return (
      <CartPage 
        onBackToStore={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-6">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-all duration-300 group"
              >
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
                  <ArrowLeft className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline font-medium">Back to Home</span>
              </button>
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    MusicStore
                  </h1>
                  <p className="text-xs text-gray-500">Premium Instruments</p>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for instruments, brands, or accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm text-lg placeholder-gray-400"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">⌘K</kbd>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <UserMenu onSignInClick={handleUserIconClick} />
              <button 
                onClick={handleCartClick}
                className="relative p-3 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-xl group"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Brands</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>Hot Deals</span>
                </a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">New Arrivals</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Accessories</a>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Truck className="h-4 w-4 text-blue-500" />
                <span>Free Shipping ₹2000+</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section - Featuring Gibson Les Paul Studio */}
      <section className="relative py-16 bg-gradient-to-r from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Professional Grade</span>
                </div>
                <h2 className="text-5xl font-bold leading-tight">
                  Gibson Les Paul
                  <span className="block text-3xl text-gray-300">Studio - Ebony</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Experience the legendary Gibson tone with the Les Paul Studio. Featuring premium mahogany body and maple cap for that classic rock sound that defined generations.
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9</div>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    {renderStars(4.9)}
                  </div>
                  <div className="text-sm text-gray-400">124 Reviews</div>
                </div>
                <div className="w-px h-16 bg-gray-600"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold">₹1,81,599</div>
                  <div className="text-sm line-through text-gray-500">₹2,19,999</div>
                  <div className="text-sm text-orange-400 font-semibold">17% OFF</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => handleAddToCart(1)}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Listen Demo</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl blur-xl"></div>
              <img 
                src="/src/assets/products/electric-guitar/guitar-background-upz2txx3cz5k6irg.jpg"
                alt="Gibson Les Paul Studio - Ebony"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-gray-900">Gibson</span>
              </div>
              <div className="absolute bottom-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full">
                <span className="text-sm font-bold">NEW ARRIVAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Top Brands */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted by Musicians Worldwide</h3>
            <p className="text-gray-600">Premium brands, exceptional quality</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {topBrands.map((brand, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                      <span className="text-lg font-bold text-gray-700 group-hover:text-blue-600">{brand.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{brand.name}</h4>
                    <p className="text-sm text-gray-500">{brand.products} products</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Shop by Categories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Shop by Categories</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our extensive collection of musical instruments and accessories, carefully curated for musicians of all levels.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.slice(1).map((category, index) => (
              <div 
                key={category.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
                  <div className="aspect-square bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center text-white text-4xl group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10">{category.icon}</span>
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1">
                      {category.name}
                    </h4>
                    <p className="text-xs text-gray-500">{category.count} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Electric Guitars */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Featured Electric Guitars</h3>
              <p className="text-gray-600">Professional instruments for every guitarist</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Guitars
              </button>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {electricGuitarProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Keyboards & Pianos */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Featured Keyboards & Pianos</h3>
              <p className="text-gray-600">Professional instruments for every musician</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                View All Keyboards
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyboardProducts.slice(0, 3).map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 150}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Hot Deals */}
      <section className="py-16 bg-gradient-to-r from-red-50 via-pink-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Zap className="h-8 w-8 text-red-500" />
              <h3 className="text-3xl font-bold text-gray-900">Hot Deals</h3>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-4 py-2 rounded-full font-bold animate-pulse">
                🔥 Limited Time Only
              </div>
            </div>
            <p className="text-lg text-gray-600">Incredible savings on premium instruments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotDeals.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} isHotDeal={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <HeadphonesIcon className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-4xl font-bold mb-4">Stay in Tune with Our Latest Offers</h3>
            <p className="text-xl text-gray-300 leading-relaxed">
              Get exclusive deals, new product announcements, and music tips delivered to your inbox. Join over 50,000 musicians worldwide.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 focus:ring-4 focus:ring-blue-500/50 border-0 text-lg placeholder-gray-500"
            />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Subscribe Now
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Weekly deals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Exclusive access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Music className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold">MusicStore</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your premier destination for professional musical instruments and accessories. Trusted by musicians worldwide since 2010.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Categories</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Electric Guitars</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Keyboards & Pianos</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Drums & Percussion</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Audio Equipment</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Support</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Connect</h5>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">YouTube</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 MusicStore. All rights reserved. | Designed with ♪ for music lovers worldwide
            </p>
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