import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import AddProductForm from '@/app/components/AddProductForm';
import ProductsList from '@/app/components/ProductsList';
import Link from 'next/link';


export default async function page() {
  await dbConnect();

  // Fetch products from MongoDB and convert them to plain objects
  const products = await Product.find({}).lean();
  console.log(products);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Admin Products</h1>

      <button className='border-2 border-black px-4 py-3 my-5 rounded block' >
        <Link href={'/admin/'}> Home</Link>
      </button>
      <ProductsList products={products} />

    </div>
  );
}