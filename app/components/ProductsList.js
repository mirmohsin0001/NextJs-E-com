'use client'; // Mark as a Client Component

import axios from "axios";

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
        <div>
            <h2 className="text-xl font-semibold mb-4">Product List</h2>
            <div>


                <div>
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 gap-2">

                                {products.map((product) => (
                                    <div key={product.id} className="card lg:w-1/4 md:w-1/2 p-4 border border-gray-500 rounded">
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img alt="ecommerce" className="object-cover object-center block" src={product.image} />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.category}</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                                            <p className="mt-1">{product.price}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded -mx-1 mt-4">
                                            Delete
                                        </button>
                                    </div>

                                ))}


                            </div>
                        </div>
                    </section>


                </div>
            </div>
        </div>
    );
}