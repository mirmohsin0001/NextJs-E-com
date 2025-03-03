import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import Order from "@/app/models/Order.js";
import dbConnect from "@/app/lib/dbConnect";
import { currentUser } from "@clerk/nextjs/server";


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const { amount, currency = "INR" } = body;

    if (!amount || isNaN(amount)) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Generate a short, unique receipt (max 40 chars)
    const shortUserId = user.id.slice(0, 10); // e.g., "user_2aBcD"
    const shortTimestamp = Date.now().toString().slice(-6); // Last 6 digits
    const receipt = `rcpt_${shortUserId}_${shortTimestamp}`;
    // Example: "rcpt_user_2aBcD_824000" (22 chars)

    const options = {
      amount: amount * 100,
      currency,
      receipt,
      notes: {
        userId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName} ${user.lastName || ""}`,
      },
    };

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId: user.id,
      orderId: order.id,
      amount: options.amount,
    });
    await newOrder.save();

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}