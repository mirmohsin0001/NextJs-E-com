'use client'; // Mark as a Client Component

import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

export default function ProductList({ products }) {
    const handleDelete = async (id) => {
        console.log(id);
        const confirmDelete = confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;

        const res = await axios.delete(`/api/admin/products`, {
            data: { id },
        });

        const data = await res.data;

        if (data.success) {
            alert('Product deleted successfully!');
            window.location.reload(); // Refresh the page to reflect the deletion
        } else {
            alert('Failed to delete product: ' + data.error);
        }
    };

    return (
        <>
            {/* <section className="text-gray-600 body-font"> */}

            <ul className="flex flex-wrap">



                {/* PRODUCT MAPPING STARTS */}
                {products.map((product) => (
                    <li key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">


                        <a className="block relative h-48 rounded overflow-hidden">
                            <img alt="ecommerce" className="object-cover object-center w-full h-full block"
                                src={product.image}
                            />
                        </a>

                        <div className="flex justify-between items-end">
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                                    {product.category}
                                </h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">
                                    {product.name}
                                </h2>
                                <p className="mt-1">
                                    {product.price}
                                </p>
                            </div>
                            <MdDeleteForever className="text-gray-600" onClick={() => handleDelete(product._id)} size={42} />
                        </div>




                    </li>
                ))}
                {/* PRODUCT MAPPING ENDS */}


            </ul>

            {/* </section> */}
        </>
    );
}