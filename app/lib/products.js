import dbConnect from './dbConnect';
import Product from '../models/Product';

export async function getProducts() {
    await dbConnect();

    const products = await Product.find({}).lean();
    return products.map(product => ({
        ...product,
        _id: product._id.toString()
    }));
}

export async function getProduct(slug) {
    const product = await Product.find({ _id: slug }).lean();
    return {
        ...product,
        _id: product._id.toString()
    };
}