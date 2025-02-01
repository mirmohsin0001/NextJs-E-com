import dbConnect from '@/app/lib/dbConnect';
import Product from '@/app/models/Product';
import AddProductForm from '@/app/components/AddProductForm';
import ProductsList from '@/app/components/ProductsList';


export default async function page() {
  await dbConnect();

  // Fetch products from MongoDB and convert them to plain objects
  const products = await Product.find({}).lean();
  console.log(products)

  return (
    <>
      <h2 className="text-5xl font-semibold text-center mb-4 mt-8">Product List</h2>
      <div className="">
        <ProductsList
          products={products}
        />
      </div>
    </>
  );
}