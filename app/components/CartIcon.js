// components/CartIcon.js
'use client';

import { useCart } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <div className="relative">
      <FaShoppingCart className="text-2xl" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
          {cart.length}
        </span>
      )}
    </div>
  );
};

export default CartIcon;