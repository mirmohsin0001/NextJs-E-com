import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';

export async function POST(request) {
  await dbConnect();

  try {
    const { category, name, price, image } = await request.json();

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, error: 'A product with this name already exists' },
        { status: 400 }
      );
    }

    // Create a new product (MongoDB will generate the _id automatically)
    const product = new Product({
      category,
      name,
      price,
      image,
    });

    await product.save(); // Save the product to MongoDB

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  await dbConnect();

  try {
    const { id } = await request.json();
    console.log(`id from back end+${id}`);

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(request) {
  await dbConnect();

  try {
    const products = await Product.find({}).lean();

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}