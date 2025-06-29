import React, { useState, useEffect } from 'react';
import { Play, Users, Calendar, Star, ChevronLeft, ChevronRight, Menu, X, ArrowDown, Facebook, Instagram, Twitter, Music, Volume2, Heart, MapPin, Clock, Phone, Mail, ShoppingCart, ArrowRight, Search } from 'lucide-react';
import MusicStore from './components/MusicStore';
import AuthModal from './components/AuthModal';
import UserMenu from './components/UserMenu';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';

function App() {
  const { isAuthenticated } = useAuth();
  const { getCartItemsCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [showMusicStore, setShowMusicStore] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDetails: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'products', 'music', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Sarah M.",
      date: "November 15",
      rating: 5,
      text: "I actually called in for live music instead of responding to an email. The band gave a concise explanation of my event needs and provided a complete breakdown of everything. Very knowledgeable and patient, totally recommend!",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    {
      name: "David R.",
      date: "July 22",
      rating: 5,
      text: "Amazing performance from the start! I was highly confident that he's the competent musician person you want representing you, and I got that in full force from the band. Professional, talented, and incredibly being flexibility and with integrity, he appeals to the live music lovers.",
      avatar: "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    {
      name: "Maria L.",
      date: "September 8",
      rating: 5,
      text: "The energy and professionalism of this band is unmatched. They made our wedding absolutely perfect with their incredible performances. Every guest was dancing!",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    }
  ];

  const musicGenres = [
    {
      id: 1,
      title: "Rock & Alternative",
      description: "High-energy performances featuring classic rock hits and modern alternative tracks that get crowds moving and singing along.",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      icon: <Volume2 className="h-6 w-6" />
    },
    {
      id: 2,
      title: "Jazz & Blues",
      description: "Smooth, sophisticated sounds perfect for intimate venues, featuring improvisation and soulful melodies that touch the heart.",
      image: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      icon: <Music className="h-6 w-6" />
    },
    {
      id: 3,
      title: "Acoustic & Folk",
      description: "Intimate acoustic sets featuring storytelling through music, perfect for creating warm, personal connections with audiences.",
      image: "https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      icon: <Heart className="h-6 w-6" />
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      title: "Echoes of Tomorrow",
      subtitle: "Latest Album • New Release",
      price: "₹1,649",
      originalPrice: "₹2,059",
      discount: "20% OFF",
      image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      bgColor: "bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200",
      badge: "NEW RELEASE",
      badgeColor: "bg-green-500",
      rating: 4.9,
      reviews: 127,
      category: "Albums"
    },
    {
      id: 2,
      title: "Svara Band Official Tee",
      subtitle: "Premium Cotton • Limited Edition",
      price: "₹2,479",
      originalPrice: "₹3,299",
      discount: "25% OFF",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      bgColor: "bg-gradient-to-br from-pink-100 via-rose-100 to-orange-100",
      badge: "BEST SELLER",
      badgeColor: "bg-orange-500",
      rating: 4.7,
      reviews: 89,
      category: "Apparel"
    },
    {
      id: 3,
      title: "Signed Concert Poster",
      subtitle: "Collectible • Hand-signed by Band",
      price: "₹4,129",
      originalPrice: "₹5,779",
      discount: "29% OFF",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      bgColor: "bg-gradient-to-br from-amber-100 via-yellow-100 to-orange-100",
      badge: "LIMITED",
      badgeColor: "bg-red-500",
      rating: 4.8,
      reviews: 156,
      category: "Collectibles"
    },
    {
      id: 4,
      title: "Acoustic Sessions EP",
      subtitle: "Exclusive Digital Release",
      price: "₹1,072",
      originalPrice: "₹1,402",
      discount: "24% OFF",
      image: "https://images.pexels.com/photos/1047930/pexels-photo-1047930.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2",
      bgColor: "bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100",
      badge: "EXCLUSIVE",
      badgeColor: "bg-purple-500",
      rating: 4.6,
      reviews: 73,
      category: "Digital"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const toggleLike = (cardId: number) => {
    setLikedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventDetails: ''
    });
    
    // Show success message (you could add a toast notification here)
    alert('Message sent successfully! We\'ll get back to you soon.');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleExploreStore = () => {
    setShowMusicStore(true);
    // Scroll to top when entering store
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setShowMusicStore(false);
    // Scroll to top when returning home
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
      return;
    }
    // Handle add to cart logic here
    console.log('Added to cart:', productId);
  };

  const handleUserIconClick = () => {
    if (!isAuthenticated) {
      setAuthMode('signin');
      setShowAuthModal(true);
    }
  };

  // Show Music Store if requested
  if (showMusicStore) {
    return <MusicStore onBackToHome={handleBackToHome} />;
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
            <Music className="h-8 w-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-white text-xl font-bold animate-pulse">SVARA BAND</h2>
          <p className="text-gray-400 text-sm mt-2">Loading the experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
              <Music className="h-6 w-6 text-white mr-2" />
              <span className="text-xl font-bold text-white">SVARA BAND</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About us' },
                { id: 'products', label: 'Store' },
                { id: 'music', label: 'Music' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-all duration-300 relative ${
                    activeSection === item.id 
                      ? 'text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <UserMenu onSignInClick={handleUserIconClick} />
              {/* Cart Icon with Count */}
              <button 
                onClick={handleExploreStore}
                className="relative text-white hover:text-gray-300 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
              <button className="border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium transform hover:scale-105">
                <span>Book Now</span>
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-700 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About us' },
                { id: 'products', label: 'Store' },
                { id: 'music', label: 'Music' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <button className="w-full text-left px-3 py-2 border border-white/30 text-white rounded-lg mt-4 font-medium hover:bg-white/10 transition-all duration-200">
                Book Now
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative h-screen bg-black overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=2"
            alt="Passionate musician performing"
            className="w-full h-full object-cover object-center transform scale-105"
            style={{ transform: `translateY(${isScrolled ? '10px' : '0px'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-amber-600/20 to-orange-800/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-gradient-to-br from-amber-500/15 to-orange-700/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-600/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        {/* Enhanced Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full pt-20 md:pt-16">
            <div className="w-full lg:w-1/2 text-white space-y-6 md:space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              {/* Enhanced Brand Text */}
              <div className="space-y-2 md:space-y-4 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    svara
                  </span>
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl block text-white/80 animate-pulse">BAND</span>
                </h1>
              </div>

              {/* Enhanced Main Heading */}
              <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-500">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  FEEL THE MUSICAL ENERGY
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    LIKE NOWHERE ELSE
                  </span>
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
                  Experience the raw power of live music with Svara Band. Our passionate performances and electrifying stage presence create unforgettable moments that resonate deep within your soul.
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8 animate-in fade-in slide-in-from-left duration-1000 delay-700">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-base md:text-lg transform hover:scale-105 hover:shadow-lg"
                >
                  Join us
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white font-semibold hover:text-gray-300 transition-colors underline text-base md:text-lg group"
                >
                  Read more
                  <ArrowDown className="h-4 w-4 inline ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Enhanced Social Icons */}
              <div className="flex space-x-6 md:space-x-8 pt-4 md:pt-6 animate-in fade-in slide-in-from-left duration-1000 delay-900">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Twitter, href: '#' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <social.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <button 
            onClick={() => scrollToSection('music')}
            className="flex flex-col items-center space-y-2 text-gray-300 hover:text-white transition-colors group"
          >
            <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
            <span className="text-sm">Scroll down</span>
          </button>
        </div>
      </section>

      {/* Enhanced Musical Offerings Section */}
      <section id="music" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Decorative Element */}
          <div className="flex justify-center mb-6 md:mb-8 animate-in fade-in slide-in-from-top duration-1000">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Music className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
          </div>

          {/* Enhanced Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 animate-in fade-in slide-in-from-top duration-1000 delay-200" style={{ fontFamily: 'cursive' }}>
            Our Musical Repertoire
          </h2>
          
          <p className="text-base md:text-lg text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top duration-1000 delay-400">
            Discover our diverse collection of musical styles and performances. 
            From soulful ballads to energetic rock anthems, we create the perfect atmosphere for every occasion.
          </p>

          {/* Enhanced Music Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">
            {musicGenres.map((genre, index) => (
              <div 
                key={genre.id}
                className="group animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="relative mb-4 md:mb-6 overflow-hidden rounded-full w-48 h-48 md:w-64 md:h-64 mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  <img 
                    src={genre.image}
                    alt={genre.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(genre.id)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 transform hover:scale-110"
                  >
                    <Heart 
                      className={`h-4 w-4 md:h-5 md:w-5 transition-colors duration-200 ${
                        likedCards.includes(genre.id) ? 'text-red-500 fill-current' : 'text-white'
                      }`} 
                    />
                  </button>

                  {/* Genre Icon Overlay */}
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {genre.icon}
                  </div>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {genre.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 px-2 md:px-0">
                  {genre.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Show More Button */}
          <button className="bg-gray-900 text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 text-base md:text-lg tracking-wider transform hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-1000 delay-1200">
            SHOW MORE
          </button>
        </div>
      </section>

      {/* Enhanced Quote Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-gray-800 italic leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 relative">
            <span className="text-4xl md:text-6xl text-emerald-500/20 absolute -top-2 md:-top-4 -left-2 md:-left-4">"</span>
            Music is a universal language – one that, with the right artists, can reveal a clear path forward.
            <span className="text-4xl md:text-6xl text-emerald-500/20 absolute -bottom-4 md:-bottom-8 -right-2 md:-right-4">"</span>
          </blockquote>
        </div>
      </section>

      {/* Enhanced Discover Our Music Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 animate-in fade-in slide-in-from-left duration-1000">
            Discover Our Music
          </h2>
          
          <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl group animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <img 
              src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2"
              alt="Band performing live"
              className="w-full h-64 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 md:p-6 transition-all duration-300 transform hover:scale-110 group-hover:scale-125 shadow-lg hover:shadow-xl">
                <Play className="h-8 w-8 md:h-12 md:w-12 text-emerald-600 ml-1" />
              </button>
            </div>
            
            {/* Play Button Pulse Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 md:w-24 md:h-24 border-2 border-white/50 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-8 md:mb-12 lg:mb-0 animate-in fade-in slide-in-from-left duration-1000">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">About Svara Band</h2>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">
                Founded in 2018 and present in 15+ cities across the region, Svara Band has been delivering exceptional musical experiences. We are formerly worked at the United Studios in New York and is the Director of the Academy of Musical Arts. Our diverse repertoire and personalized approach set us apart as skilled musicians, accomplished performers.
              </p>
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center group">
                Learn more 
                <ArrowDown className="h-4 w-4 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl md:rounded-3xl blur-lg"></div>
              <img 
                src="https://images.pexels.com/photos/7715653/pexels-photo-7715653.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                alt="Svara Band performing live on stage"
                className="relative w-full h-64 md:h-96 object-cover rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Products Section */}
      <section id="products" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-1000">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
                Featured Products
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Browse our latest music offerings
              </p>
            </div>
            <button 
              onClick={handleExploreStore}
              className="mt-4 md:mt-0 bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 group"
            >
              <span>Explore all</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 group animate-in fade-in slide-in-from-bottom duration-1000 ${product.bgColor}`}
                style={{ animationDelay: `${300 + index * 200}ms` }}
              >
                {/* Product Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`${product.badgeColor} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      likedCards.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'
                    }`} 
                  />
                </button>

                {/* Product Image Container */}
                <div className="relative h-48 md:h-56 p-4 md:p-6 flex items-center justify-center">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-4 md:inset-6 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-white/90 backdrop-blur-sm text-black px-3 md:px-4 py-2 rounded-full font-semibold hover:bg-white transition-all duration-300 transform hover:scale-110 flex items-center space-x-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span className="text-sm">Quick Buy</span>
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="bg-white p-4 md:p-5 rounded-t-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-sm md:text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-1">
                    {product.subtitle}
                  </p>

                  {/* Price and Discount */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-base md:text-lg font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    {product.discount && (
                      <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="flex-1 bg-gray-900 text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm"
                    >
                      Add to Cart
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors">
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* VIP Club Section */}
          <div className="mt-12 md:mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white text-center animate-in fade-in slide-in-from-bottom duration-1000 delay-800">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Join Our VIP Club</h3>
            <p className="text-sm md:text-base text-purple-100 mb-4 max-w-2xl mx-auto">
              Get exclusive access to limited edition merchandise, early concert tickets, and special discounts on all our products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Join VIP Club
              </button>
              <button className="text-white hover:text-purple-200 font-semibold transition-colors flex items-center space-x-2">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-1000">
            What Our Clients Say
          </h2>
          
          <div className="relative">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`bg-gray-50 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl ${
                    index === currentTestimonial ? 'lg:scale-105 lg:shadow-xl ring-2 ring-emerald-500/20' : 'lg:opacity-75 hover:opacity-100'
                  } ${index !== currentTestimonial ? 'hidden lg:block' : ''}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover mr-3 md:mr-4 ring-2 ring-emerald-500/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{testimonial.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center mt-6 md:mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-2 md:p-3 rounded-full border border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-emerald-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 md:p-3 rounded-full border border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact/Booking Section */}
      <section id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 animate-in fade-in slide-in-from-top duration-1000">
            Schedule a Performance
          </h2>
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="animate-in fade-in slide-in-from-left duration-1000 mb-8 lg:mb-0">
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <MapPin className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      Main Office of Svara Band<br />
                      1st Floor, B<br />
                      123 Music St<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <Mail className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:booking@svaraband.com" className="text-sm md:text-base text-gray-600 hover:text-emerald-600 transition-colors">
                      booking@svaraband.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors duration-300">
                  <Phone className="h-5 w-5 md:h-6 md:w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href="tel:+14155677700" className="text-sm md:text-base text-gray-600 hover:text-emerald-600 transition-colors">
                      (415) 567-7700
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 text-sm md:text-base"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Event Details</label>
                  <textarea 
                    rows={4}
                    name="eventDetails"
                    value={formData.eventDetails}
                    onChange={handleInputChange}
                    placeholder="Tell us about your event, date, and musical preferences..."
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 resize-none text-sm md:text-base"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-3 md:py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send message</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-6 md:mb-8">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <Music className="h-5 w-5 md:h-6 md:w-6 text-emerald-500" />
              <span className="text-lg md:text-xl font-bold">SVARA BAND</span>
            </div>
            <p className="text-gray-400 text-center text-sm md:text-base">Creating unforgettable musical experiences</p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-4 md:space-x-8 mb-6 md:mb-8">
            {[
              { id: 'about', label: 'About' },
              { id: 'products', label: 'Store' },
              { id: 'music', label: 'Music' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline text-sm md:text-base"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4 md:space-x-6 mb-6 md:mb-8">
            {[
              { icon: Facebook, href: '#' },
              { icon: Instagram, href: '#' },
              { icon: Twitter, href: '#' }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
              >
                <social.icon className="h-5 w-5 md:h-6 md:w-6" />
              </a>
            ))}
          </div>
          
          <div className="text-center text-gray-400 text-xs md:text-sm border-t border-gray-800 pt-6 md:pt-8">
            <p>&copy; 2024 Svara Band. All rights reserved. | Designed with ♪ for music lovers</p>
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
}

export default App;