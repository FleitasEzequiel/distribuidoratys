'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface CartItem {
    id: number;
    image: string;
    title: string;
    description: string;
    quantity: number;
    price: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (id: number, delta: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('tonzarCart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Sync cart to localStorage whenever it changes
    useEffect(() => {
        if (!isInitialized) return;

        if (cart.length > 0) {
            localStorage.setItem('tonzarCart', JSON.stringify(cart));
        } else {
            localStorage.removeItem('tonzarCart');
        }
    }, [cart, isInitialized]);

    const addToCart = useCallback((product: Omit<CartItem, 'quantity'>) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    const updateQuantity = useCallback((id: number, delta: number) => {
        setCart((prevCart) =>
            prevCart.map((item) => {
                if (item.id === id) {
                    const newQty = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );
    }, []);

    const removeItem = useCallback((id: number) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
