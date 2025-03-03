import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/app/lib/dbConnect";
import Order from "@/app/models/Order";
import { useCart } from "@/app/context/CartContext";




export async function POST(request) {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = await request.json();

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(orderCreationId + "|" + razorpayPaymentId)
        .digest("hex");

    await dbConnect();

    if (generatedSignature === razorpaySignature) {
        await Order.updateOne({ orderId: orderCreationId }, { status: "completed" });
        return NextResponse.json({ message: "Payment verified", isOk: true }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 });
    }
}