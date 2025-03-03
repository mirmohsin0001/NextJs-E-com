import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request) {
    const { orderCreationId, razorpayPaymentId, razorpaySignature } = await request.json();

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(orderCreationId + "|" + razorpayPaymentId)
        .digest("hex");

    if (generatedSignature === razorpaySignature) {
        return NextResponse.json({ message: "Payment verified", isOk: true }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Payment verification failed", isOk: false }, { status: 400 });
    }
}