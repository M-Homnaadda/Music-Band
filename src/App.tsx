import React, { useState, useEffect } from 'react';
import { Play, Users, Calendar, Star, ChevronLeft, ChevronRight, Menu, X, ArrowDown, Facebook, Instagram, Twitter, Music, Volume2, Heart, MapPin, Clock, Phone, Mail } from 'lucide-react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [likedCards, setLikedCards] = useState<number[]>([]);
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
      const sections = ['home', 'about', 'music', 'testimonials', 'contact'];
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

            <button className="hidden md:flex items-center space-x-2 border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all duration-300 font-medium transform hover:scale-105">
              <span>Book Now</span>
            </button>

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
            src="/src/assets/PhotoRoom-20250628_220338.png"
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
          <div className="flex items-center h-full">
            <div className="w-full lg:w-1/2 text-white space-y-8 lg:space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              {/* Enhanced Brand Text */}
              <div className="space-y-4 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    svara
                  </span>
                  <span className="text-4xl lg:text-5xl xl:text-6xl block text-white/80 animate-pulse">BAND</span>
                </h1>
              </div>

              {/* Enhanced Main Heading */}
              <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000 delay-500">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  FEEL THE MUSICAL ENERGY
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    LIKE NOWHERE ELSE
                  </span>
                </h2>
                
                <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
                  Experience the raw power of live music with Svara Band. Our passionate performances and electrifying stage presence create unforgettable moments that resonate deep within your soul.
                </p>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-8 animate-in fade-in slide-in-from-left duration-1000 delay-700">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-lg"
                >
                  Join us
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white font-semibold hover:text-gray-300 transition-colors underline text-lg group"
                >
                  Read more
                  <ArrowDown className="h-4 w-4 inline ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Enhanced Social Icons */}
              <div className="flex space-x-8 pt-6 animate-in fade-in slide-in-from-left duration-1000 delay-900">
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
                    <social.icon className="h-6 w-6" />
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
      <section id="music" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Decorative Element */}
          <div className="flex justify-center mb-8 animate-in fade-in slide-in-from-top duration-1000">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
              <Music className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Enhanced Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-in fade-in slide-in-from-top duration-1000 delay-200" style={{ fontFamily: 'cursive' }}>
            Our Musical Repertoire
          </h2>
          
          <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top duration-1000 delay-400">
            Discover our diverse collection of musical styles and performances. 
            From soulful ballads to energetic rock anthems, we create the perfect atmosphere for every occasion.
          </p>

          {/* Enhanced Music Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {musicGenres.map((genre, index) => (
              <div 
                key={genre.id}
                className="group animate-in fade-in slide-in-from-bottom duration-1000"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-full w-64 h-64 mx-auto shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105">
                  <img 
                    src={genre.image}
                    alt={genre.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(genre.id)}
                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 transform hover:scale-110"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors duration-200 ${
                        likedCards.includes(genre.id) ? 'text-red-500 fill-current' : 'text-white'
                      }`} 
                    />
                  </button>

                  {/* Genre Icon Overlay */}
                  <div className="absolute bottom-4 left-4 p-3 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                    {genre.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">
                  {genre.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {genre.description}
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Show More Button */}
          <button className="bg-gray-900 text-white px-12 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 text-lg tracking-wider transform hover:scale-105 hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-1000 delay-1200">
            SHOW MORE
          </button>
        </div>
      </section>

      {/* Enhanced Quote Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <blockquote className="text-2xl lg:text-3xl font-light text-gray-800 italic leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 relative">
            <span className="text-6xl text-emerald-500/20 absolute -top-4 -left-4">"</span>
            Music is a universal language – one that, with the right artists, can reveal a clear path forward.
            <span className="text-6xl text-emerald-500/20 absolute -bottom-8 -right-4">"</span>
          </blockquote>
        </div>
      </section>

      {/* Enhanced Discover Our Music Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 animate-in fade-in slide-in-from-left duration-1000">
            Discover Our Music
          </h2>
          
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl group animate-in fade-in slide-in-from-right duration-1000 delay-300">
            <img 
              src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=2"
              alt="Band performing live"
              className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
              <button className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-6 transition-all duration-300 transform hover:scale-110 group-hover:scale-125 shadow-lg hover:shadow-xl">
                <Play className="h-12 w-12 text-emerald-600 ml-1" />
              </button>
            </div>
            
            {/* Play Button Pulse Effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 border-2 border-white/50 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="mb-12 lg:mb-0 animate-in fade-in slide-in-from-left duration-1000">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">About Svara Band</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2018 and present in 15+ cities across the region, Svara Band has been delivering exceptional musical experiences. We are formerly worked at the United Studios in New York and is the Director of the Academy of Musical Arts. Our diverse repertoire and personalized approach set us apart as skilled musicians, accomplished performers.
              </p>
              <button className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors flex items-center group">
                Learn more 
                <ArrowDown className="h-4 w-4 ml-2 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="relative animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-3xl blur-lg"></div>
              <img 
                src="/src/assets/pexels-a-darmel-7715653.jpg"
                alt="Svara Band performing live on stage"
                className="relative w-full h-96 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 animate-in fade-in slide-in-from-top duration-1000">
            What Our Clients Say
          </h2>
          
          <div className="relative">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-500 hover:shadow-xl ${
                    index === currentTestimonial ? 'lg:scale-105 lg:shadow-xl ring-2 ring-emerald-500/20' : 'lg:opacity-75 hover:opacity-100'
                  } ${index !== currentTestimonial ? 'hidden lg:block' : ''}`}
                >
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <img 
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{testimonial.text}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button 
                onClick={prevTestimonial}
                className="p-3 rounded-full border border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-emerald-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-3 rounded-full border border-gray-300 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300 transform hover:scale-110"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact/Booking Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 animate-in fade-in slide-in-from-top duration-1000">
            Schedule a Performance
          </h2>
          
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div className="animate-in fade-in slide-in-from-left duration-1000">
              <div className="space-y-8">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <MapPin className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-600">
                      Main Office of Svara Band<br />
                      1st Floor, B<br />
                      123 Music St<br />
                      San Francisco, CA 94102
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <Mail className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:booking@svaraband.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                      booking@svaraband.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                  <Phone className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <a href="tel:+14155677700" className="text-gray-600 hover:text-emerald-600 transition-colors">
                      (415) 567-7700
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg animate-in fade-in slide-in-from-right duration-1000 delay-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 hover:border-gray-400 resize-none"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Music className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold">SVARA BAND</span>
            </div>
            <p className="text-gray-400 text-center">Creating unforgettable musical experiences</p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-8 mb-8">
            {[
              { id: 'about', label: 'About' },
              { id: 'music', label: 'Music' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
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
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          
          <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8">
            <p>&copy; 2024 Svara Band. All rights reserved. | Designed with ♪ for music lovers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;