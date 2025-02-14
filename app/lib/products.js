import dbConnect from './dbConnect';
import Product from '../models/Product';

export async function getProducts() {
    await dbConnect();

    const products = await Product.find({}).lean();
    return products;
}