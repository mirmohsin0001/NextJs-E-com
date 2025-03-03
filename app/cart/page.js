// app/cart/page.js
'use client';

import { useState } from "react";
import Script from "next/script";
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import PaymentButton from "../components/CheckoutButton";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


  // HANDLE CHECKOUT
  // async function handleCheckout() {
  //   const [loading, setLoading] = useState(false);

  //   const createOrderId = async () => {
  //     const res = await axios.post('/api/createOrder', {
  //       amount: totalPrice,
  //     });
  //     console.log(await res.data)
  //     const data = await res.data
  //     return data.orderId;
  //   }

  //   const processPayment = async () => {
  //     setLoading(true);
  //     try {
  //       const orderId = await createOrderId();

  //       const options = {
  //         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC_ for client-side env vars
  //         amount: amount * 100,
  //         currency: "INR",
  //         name: "Your Company Name",
  //         description: "Test Transaction",
  //         order_id: orderId,
  //         handler: function (response: any) {
  //           alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
  //           // Optionally, verify payment here (see Step 5)
  //         },
  //         prefill: {
  //           name: "Customer Name",
  //           email: "customer@example.com",
  //           contact: "9999999999",
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //     }
  //   }
  // }
  // HANDLE CHECKOUT ENDS


  // gpt start




  //gpt end

  const handleIncrement = (item) => {
    updateCartQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cart.length === 0 ? (
          <>
            <p className='mb-4' >Your cart is empty.</p>
            <Link className='mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ' href={'/shop'}>Shop Now</Link>
          </>
        ) : (
          <div>
            {cart.map((item) => (
              <div key={item.id} className="grid grid-cols-6 gap-4 items-center border-b py-2">

                <div className="flex items-center col-span-1">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h2 className="text-xl">{item.name}</h2>
                    <p>${item.price}</p>
                  </div>
                </div>

                <div className="col-span-4 text-right flex items-center justify-end">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="text-gray-500 hover:text-gray-700 px-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                  <p className="mx-2">Qty: {item.quantity}</p> {/* Display the quantity */}
                  <button
                    onClick={() => handleIncrement(item)}
                    className="text-gray-500 hover:text-gray-700 px-2 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

                <div className="text-right col-span-1">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </div>

              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
              <div className='flex gap-2'>


                <PaymentButton amount={totalPrice} />



                <button
                  onClick={clearCart}
                  className="mt-2 border-2 border-black px-4 py-2 rounded hover:bg-gray-50"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;