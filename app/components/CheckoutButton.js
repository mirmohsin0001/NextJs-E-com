"use client";

import { useState } from "react";
import Script from "next/script";

export default function PaymentButton({ amount }) {
  const [loading, setLoading] = useState(false);

  const createOrderId = async () => {
    const response = await fetch("/api/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Failed to create order");
    return data.orderId;
  };

  const processPayment = async () => {
    setLoading(true);
    try {
      const orderId = await createOrderId();

      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Use NEXT_PUBLIC_ for client-side env vars
        amount: amount * 100,
        currency: "INR",
        name: "Kashmir Aromatics",
        description: "Test Transaction",
        order_id: orderId,
        handler: async function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_order_id);
          alert("Payment successful! Payment Signature: " + response.razorpay_payment_id);
          alert("Payment successful! Payment Signature: " + response.razorpay_signature);
          // Optionally, verify payment here (see Step 5)
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
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed: " + response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button onClick={processPayment} disabled={loading} className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </>
  );
}