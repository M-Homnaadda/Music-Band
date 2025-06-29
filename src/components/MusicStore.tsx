import React, { useState, useMemo, useEffect } from 'react';
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
  X,
  Shield,
  Truck,
  Award,
  ChevronUp
} from 'lucide-react';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';
import ProductModal from './ProductModal';
import CartPage from './CartPage';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

// Import local images
import electricGuitarHero from '../assets/electric-guitar-still-life (1).jpg';
import electricGuitar1 from '../assets/products/electric-guitar/guitar-background-upz2txx3cz5k6irg.jpg';
import electricGuitar2 from '../assets/products/electric-guitar/photo-1516924962500-2b4b3b99ea02.jpg';
import electricGuitar3 from '../assets/products/electric-guitar/pexels-oskelaq-2016810.jpg';
import electricGuitar4 from '../assets/products/electric-guitar/881331.jpg';
import keyboardPiano1 from '../assets/products/keyboard-piano/Yamaha-P-225B-Digital-Piano-Black-Front_large.webp';
import keyboardPiano2 from '../assets/products/keyboard-piano/CVP-909GP_a_0001_a0388f6bdfd18943c6b62f8e1ad13801.jpg';
import keyboardPiano3 from '../assets/products/keyboard-piano/rp107_angle_left_gal.jpg';
import keyboardPiano4 from '../assets/products/keyboard-piano/up_product_u3_po-ebo_163832c6df3b2719f401bc7985f36ead.jpg';
import keyboardPiano5 from '../assets/products/keyboard-piano/ps500-18761795201896_l.jpg';

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
  model?: string;
}

interface MusicStoreProps {
  onBackToHome: () => void;
}

const MusicStore: React.FC<MusicStoreProps> = ({ onBackToHome }) => {
  const { isAuthenticated } = useAuth();
  const { cartItems, addToCart, removeFromCart, updateQuantity, getCartItemsCount, syncCartOnSignIn } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync cart when user signs in
  useEffect(() => {
    if (isAuthenticated) {
      syncCartOnSignIn();
    }
  }, [isAuthenticated]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎵', count: 156 },
    { id: 'electric-guitar', name: 'Electric Guitar', icon: '🎸', count: 45 },
    { id: 'acoustic-guitar', name: 'Acoustic Guitar', icon: '🎸', count: 32 },
    { id: 'bass', name: 'Bass', icon: '🎸', count: 18 },
    { id: 'keyboard', name: 'Keyboard & Piano', icon: '🎹', count: 28 },
    { id: 'drums', name: 'Drum & Percussion', icon: '🥁', count: 22 },
    { id: 'microphone', name: 'Microphone', icon: '🎤', count: 15 },
    { id: 'studio', name: 'Studio & Recording', icon: '🎚️', count: 12 },
    { id: 'pedal', name: 'Pedal & Pedal Board', icon: '🎛️', count: 8 },
    { id: 'amplifier', name: 'Amplifier', icon: '🔊', count: 19 }
  ];

  const brands = [
    { name: 'Fender', count: 34 },
    { name: 'Gibson', count: 28 },
    { name: 'PRS', count: 15 },
    { name: 'Roland', count: 22 },
    { name: 'Marshall', count: 18 },
    { name: 'Yamaha', count: 31 },
    { name: 'Ibanez', count: 19 },
    { name: 'Taylor', count: 12 }
  ];

  const allProducts: Product[] = [
    // Electric Guitars
    {
      id: 1,
      name: 'American Ultra II Stratocaster',
      brand: 'Fender',
      price: 181499,
      rating: 4.8,
      reviews: 124,
      image: electricGuitar1,
      category: 'electric-guitar',
      isNew: true,
      model: 'AMULTRA2-STRAT'
    },
    {
      id: 2,
      name: 'Player II Stratocaster HSS',
      brand: 'Fender',
      price: 68499,
      rating: 4.6,
      reviews: 89,
      image: electricGuitar2,
      category: 'electric-guitar',
      model: 'PLAYER2-STRAT-HSS'
    },
    {
      id: 3,
      name: 'Les Paul Standard 60s Heritage Cherry Sunburst',
      brand: 'Gibson',
      price: 230999,
      rating: 4.9,
      reviews: 156,
      image: electricGuitar3,
      category: 'electric-guitar',
      model: 'LP-STD-60S-HCS'
    },
    {
      id: 4,
      name: 'SE Custom 24 - Jade',
      brand: 'PRS',
      price: 75899,
      rating: 4.7,
      reviews: 73,
      image: electricGuitar4,
      category: 'electric-guitar',
      model: 'SE-CUSTOM24-JADE'
    },
    // Keyboards & Pianos
    {
      id: 5,
      name: 'P-225B Digital Piano',
      brand: 'Yamaha',
      price: 44499,
      rating: 4.5,
      reviews: 92,
      image: keyboardPiano1,
      category: 'keyboard',
      model: 'P-225B'
    },
    {
      id: 6,
      name: 'CVP-909GP Clavinova',
      brand: 'Yamaha',
      price: 899999,
      rating: 4.9,
      reviews: 45,
      image: keyboardPiano2,
      category: 'keyboard',
      isHot: true,
      model: 'CVP-909GP'
    },
    {
      id: 7,
      name: 'RP107 Digital Piano',
      brand: 'Roland',
      price: 49499,
      originalPrice: 59999,
      discount: 18,
      rating: 4.4,
      reviews: 67,
      image: keyboardPiano3,
      category: 'keyboard',
      model: 'RP107'
    },
    {
      id: 8,
      name: 'U3 Upright Piano',
      brand: 'Yamaha',
      price: 449999,
      rating: 4.8,
      reviews: 23,
      image: keyboardPiano4,
      category: 'keyboard',
      model: 'U3-EBO'
    },
    {
      id: 9,
      name: 'PSR-500 Portable Keyboard',
      brand: 'Yamaha',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      rating: 4.2,
      reviews: 134,
      image: keyboardPiano5,
      category: 'keyboard',
      isNew: true,
      model: 'PSR-500'
    }
  ];

  // Filter products based on all criteria
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter(product => {
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // On sale filter
    if (onSale) {
      filtered = filtered.filter(product => product.originalPrice && product.originalPrice > product.price);
    }

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered = filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'deals':
        filtered = filtered.sort((a, b) => {
          const aDiscount = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const bDiscount = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return bDiscount - aDiscount;
        });
        break;
      default:
        // Featured - keep original order but prioritize hot/new items
        filtered = filtered.sort((a, b) => {
          if (a.isHot && !b.isHot) return -1;
          if (!a.isHot && b.isHot) return 1;
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return filtered;
  }, [selectedCategory, searchQuery, selectedBrands, priceRange, selectedRating, onSale, sortBy]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product, options: { color: string; extras: string[] }) => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }
    
    addToCart(product, options);
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange({ min: '', max: '' });
    setSelectedRating(0);
    setOnSale(false);
    setInStock(false);
    setSearchQuery('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedBrands.length > 0) count += selectedBrands.length;
    if (priceRange.min || priceRange.max) count++;
    if (selectedRating > 0) count++;
    if (onSale) count++;
    if (inStock) count++;
    return count;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 md:h-4 md:w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-1">
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
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
      >
        <Heart 
          className={`h-4 w-4 transition-colors ${
            wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
          }`} 
        />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4">
        <div className="text-xs md:text-sm text-gray-500 mb-1">{product.brand}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer text-sm md:text-base"
            onClick={() => setSelectedProduct(product)}>
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex space-x-1">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs md:text-sm text-gray-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedProduct(product)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
          >
            Quick View
          </button>
          <button 
            onClick={() => toggleWishlist(product.id)}
            className="px-2 md:px-3 py-2 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'text-red-500 fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );

  // Show cart page if requested
  if (showCart) {
    return (
      <CartPage 
        onBackToStore={() => setShowCart(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline text-sm md:text-base">Back</span>
              </button>
              <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
              <h1 className="text-lg md:text-xl font-bold text-blue-600">MusicStore</h1>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search instruments, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <UserMenu onSignInClick={handleUserIconClick} />
              <button 
                onClick={() => setShowCart(true)}
                className="relative text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Right Actions */}
            <div className="flex md:hidden items-center space-x-3">
              <button 
                onClick={() => setShowCart(true)}
                className="relative text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search instruments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-3 space-y-3">
              <UserMenu onSignInClick={handleUserIconClick} />
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure Shopping</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free Shipping ₹2000+</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section with Local Image */}
      <section className="relative bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
                <Award className="h-3 w-3 md:h-4 md:w-4" />
                <span>Premium Collection</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Gibson Les Paul
                <span className="block text-amber-600">Standard 60s</span>
              </h2>
              <p className="text-sm md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                Experience the legendary tone and craftsmanship of the iconic Les Paul Standard 60s. 
                Featuring premium tonewoods and that unmistakable Gibson sound.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-6 md:mb-8">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  ₹2,30,999
                </div>
                <div className="flex items-center space-x-1">
                  {renderStars(4.9)}
                  <span className="text-xs md:text-sm text-gray-600 ml-2">(156 reviews)</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => {
                    const gibsonProduct = allProducts.find(p => p.id === 3);
                    if (gibsonProduct) setSelectedProduct(gibsonProduct);
                  }}
                  className="bg-amber-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-sm md:text-lg"
                >
                  View Details
                </button>
                <button className="border-2 border-amber-600 text-amber-600 px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold hover:bg-amber-50 transition-colors text-sm md:text-lg">
                  Add to Wishlist
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl blur-2xl"></div>
              <img 
                src={electricGuitarHero}
                alt="Electric Guitar Still Life"
                className="relative w-full h-48 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 rounded-full">
                <span className="text-xs md:text-sm font-semibold text-gray-900">Gibson</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile-First Filter Bar */}
      <div className="bg-white border-b sticky top-14 md:top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 md:py-4">
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Filter className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-sm md:text-base">Filters</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                    {getActiveFiltersCount()}
                  </span>
                )}
              </button>

              {/* Quick Category Buttons - Hidden on mobile */}
              <div className="hidden lg:flex items-center space-x-2">
                {categories.slice(0, 4).map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>

              {/* Trust Indicators - Hidden on mobile */}
              <div className="hidden xl:flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secure Shopping</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-4 w-4 text-blue-500" />
                  <span>Free Shipping ₹2000+</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Results Count */}
              <span className="text-xs md:text-sm text-gray-600">
                {filteredProducts.length} found
              </span>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-2 py-1 md:px-4 md:py-2 pr-6 md:pr-8 text-xs md:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="featured">✨ Featured</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="deals">🔥 Best Deals</option>
                </select>
                <ChevronDown className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode Toggle - Hidden on mobile */}
              <div className="hidden md:flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
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

          {/* Active Filters */}
          {getActiveFiltersCount() > 0 && (
            <div className="pb-3 md:pb-4">
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <span className="text-xs md:text-sm text-gray-600">Active:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs">
                    <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {selectedBrands.map(brand => (
                  <span key={brand} className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs">
                    <span>{brand}</span>
                    <button onClick={() => handleBrandToggle(brand)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-red-500 underline"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        <div className="flex gap-4 md:gap-8">
          {/* Enhanced Mobile-Responsive Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0 ${showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:relative lg:bg-transparent' : ''}`}>
            <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden ${showFilters ? 'absolute right-0 top-0 h-full w-80 lg:relative lg:w-full lg:h-auto' : 'sticky top-32'}`}>
              {/* Mobile Filter Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex items-center justify-between lg:block">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Filters</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-xs md:text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="max-h-96 lg:max-h-none overflow-y-auto">
                {/* Categories */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Categories</h4>
                  <div className="space-y-2 md:space-y-3">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-xs md:text-sm text-gray-700 group-hover:text-blue-600 transition-colors flex-1">
                          {category.icon} {category.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1 md:px-2 py-1 rounded-full">
                          {category.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Brands</h4>
                  <div className="space-y-2 md:space-y-3">
                    {brands.slice(0, 6).map((brand) => (
                      <label key={brand.name} className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand.name)}
                          onChange={() => handleBrandToggle(brand.name)}
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-xs md:text-sm text-gray-700 group-hover:text-blue-600 transition-colors flex-1">
                          {brand.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-1 md:px-2 py-1 rounded-full">
                          {brand.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Price Range</h4>
                  <div className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Min</label>
                        <input
                          type="number"
                          placeholder="₹0"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                          className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Max</label>
                        <input
                          type="number"
                          placeholder="₹∞"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                          className="w-full px-2 py-1 md:px-3 md:py-2 border border-gray-300 rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                      <button
                        onClick={() => setPriceRange({ min: '0', max: '50000' })}
                        className="px-2 py-1 md:px-3 md:py-2 text-xs border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Under ₹50K
                      </button>
                      <button
                        onClick={() => setPriceRange({ min: '50000', max: '100000' })}
                        className="px-2 py-1 md:px-3 md:py-2 text-xs border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        ₹50K-₹1L
                      </button>
                      <button
                        onClick={() => setPriceRange({ min: '100000', max: '200000' })}
                        className="px-2 py-1 md:px-3 md:py-2 text-xs border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        ₹1L-₹2L
                      </button>
                      <button
                        onClick={() => setPriceRange({ min: '200000', max: '' })}
                        className="px-2 py-1 md:px-3 md:py-2 text-xs border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
                      >
                        Above ₹2L
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Rating</h4>
                  <div className="space-y-2 md:space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2 md:space-x-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                          className="w-3 h-3 md:w-4 md:h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <div className="flex items-center space-x-1">
                          {renderStars(rating)}
                          <span className="text-xs md:text-sm text-gray-700 ml-2">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div className="p-4 md:p-6">
                  <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-sm md:text-base">Special Offers</h4>
                  <div className="space-y-2 md:space-y-3">
                    <label className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onSale}
                        onChange={(e) => setOnSale(e.target.checked)}
                        className="w-3 h-3 md:w-4 md:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs md:text-sm text-gray-700">On Sale</span>
                    </label>
                    <label className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStock}
                        onChange={(e) => setInStock(e.target.checked)}
                        className="w-3 h-3 md:w-4 md:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-xs md:text-sm text-gray-700">In Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-sm md:text-base text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-4 md:gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct!}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isAuthenticated={isAuthenticated}
        onSignInClick={handleUserIconClick}
      />

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