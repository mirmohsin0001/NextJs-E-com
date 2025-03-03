import { currentUser } from "@clerk/nextjs/server";
import Order from "../models/Order";
import dbConnect from "../lib/dbConnect";
import Navbar from "../components/Navbar";

export default async function OrdersPage() {
    const user = await currentUser();

    if (!user) {
        return <div>
            <Navbar />
            <p>
                Please sign in to view your orders.
            </p>
        </div>;
    }

    await dbConnect();

    const orders = await Order.find({ userId: user.id })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map((order) => (
                            <li key={order._id} className="border p-4 mb-2 rounded">
                                <p>Order ID: {order.orderId}</p>
                                <p>Amount: ₹{order.amount / 100}</p>
                                <p>Status: {order.status}</p>
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}