import { useState, useEffect } from 'react';

export interface CartItem {
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
  category: string;
  addedAt: string;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('musicstore_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('musicstore_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (product: any, options: { color?: string; extras?: string[] } = {}) => {
    const cartItem: CartItem = {
      id: Date.now(), // Unique ID for cart item
      name: product.name,
      brand: product.brand,
      model: product.model || `Model-${product.id}`,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color: options.color || 'Default',
      extras: options.extras || [],
      quantity: 1,
      category: product.category,
      addedAt: new Date().toISOString()
    };

    // Check if item with same configuration already exists
    const existingItemIndex = cartItems.findIndex(item => 
      item.name === cartItem.name && 
      item.brand === cartItem.brand && 
      item.color === cartItem.color &&
      JSON.stringify(item.extras.sort()) === JSON.stringify(cartItem.extras.sort())
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      updateQuantity(cartItems[existingItemIndex].id, cartItems[existingItemIndex].quantity + 1);
    } else {
      // Add new item
      setCartItems(prev => [...prev, cartItem]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.name.includes(productId.toString()));
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    isInCart,
    isLoading
  };
};