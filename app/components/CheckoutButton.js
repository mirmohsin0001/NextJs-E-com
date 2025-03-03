"use client";

import { useState } from "react";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import { useCart } from "../context/CartContext";

export default function PaymentButton({ amount }) {
  const { clearCart } = useCart();
  const { isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  const createOrderId = async () => {
    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create order");
    return data.orderId;
  };

  const processPayment = async () => {
    if (!isSignedIn) {
      alert("Please sign in to make a payment.");
      return;
    }

    setLoading(true);
    try {
      const orderId = await createOrderId();

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Kashmir Aromatics",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) {
            alert("Payment verified successfully!");
            clearCart()
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName || ""}`,
          email: user?.emailAddresses[0].emailAddress,
          contact: user?.phoneNumbers[0]?.phoneNumber || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", (response) => {
        alert("Payment failed: " + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Payment error: ", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onClick={processPayment} disabled={loading}>
        {loading ? "Processing..." : `Pay Now`}
      </button>
    </>
  );
}