import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export interface CartItem {
  id: string;
  product_id: number;
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

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  model?: string;
}

export const useCart = () => {
  const { user, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from Supabase when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCartFromSupabase();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  const loadCartFromSupabase = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading cart:', error);
        return;
      }

      const formattedItems: CartItem[] = data.map(item => ({
        id: item.id,
        product_id: item.product_id,
        name: item.product_name,
        brand: item.product_brand,
        model: item.product_model,
        price: item.product_price,
        originalPrice: item.product_original_price,
        image: item.product_image,
        color: item.color,
        extras: item.extras || [],
        quantity: item.quantity,
        category: item.product_category,
        addedAt: item.created_at
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error('Error loading cart from Supabase:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, options: { color?: string; extras?: string[] } = {}) => {
    if (!isAuthenticated || !user) {
      console.error('User must be authenticated to add items to cart');
      return;
    }

    const color = options.color || 'Default';
    const extras = options.extras || [];

    try {
      // Check if item with same configuration already exists
      const existingItem = cartItems.find(item => 
        item.product_id === product.id && 
        item.color === color &&
        JSON.stringify(item.extras.sort()) === JSON.stringify(extras.sort())
      );

      if (existingItem) {
        // Update quantity if item exists
        await updateQuantity(existingItem.id, existingItem.quantity + 1);
      } else {
        // Add new item to Supabase
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            product_name: product.name,
            product_brand: product.brand,
            product_model: product.model || `Model-${product.id}`,
            product_price: product.price,
            product_original_price: product.originalPrice,
            product_image: product.image,
            product_category: product.category,
            color: color,
            extras: extras,
            quantity: 1
          })
          .select()
          .single();

        if (error) {
          console.error('Error adding item to cart:', error);
          return;
        }

        // Add to local state
        const newItem: CartItem = {
          id: data.id,
          product_id: data.product_id,
          name: data.product_name,
          brand: data.product_brand,
          model: data.product_model,
          price: data.product_price,
          originalPrice: data.product_original_price,
          image: data.product_image,
          color: data.color,
          extras: data.extras || [],
          quantity: data.quantity,
          category: data.product_category,
          addedAt: data.created_at
        };

        setCartItems(prev => [newItem, ...prev]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!isAuthenticated || !user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error removing item from cart:', error);
        return;
      }

      // Remove from local state
      setCartItems(prev => prev.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!isAuthenticated || !user) return;

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating quantity:', error);
        return;
      }

      // Update local state
      setCartItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error clearing cart:', error);
        return;
      }

      // Clear local state
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId: number) => {
    return cartItems.some(item => item.product_id === productId);
  };

  // Sync cart when user signs in (merge localStorage cart if exists)
  const syncCartOnSignIn = async () => {
    if (!isAuthenticated || !user) return;

    try {
      // Check if there's a cart in localStorage
      const localCart = localStorage.getItem('musicstore_cart');
      if (localCart) {
        const localItems = JSON.parse(localCart);
        
        // Add local items to Supabase
        for (const item of localItems) {
          await addToCart({
            id: item.product_id || Date.now(),
            name: item.name,
            brand: item.brand,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            category: item.category,
            model: item.model
          }, {
            color: item.color,
            extras: item.extras
          });
        }

        // Clear localStorage cart
        localStorage.removeItem('musicstore_cart');
      }

      // Load cart from Supabase
      await loadCartFromSupabase();
    } catch (error) {
      console.error('Error syncing cart on sign in:', error);
    }
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
    isLoading,
    syncCartOnSignIn
  };
};