
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,

});

export async function POST(request) {
    try {
        const { amount, currency = "INR" } = await request.json();

        const options = {
            amount: amount * 100, // Convert to paise (e.g., 500 INR = 50000 paise)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error("Order creation failed:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}