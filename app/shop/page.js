import React, { Suspense } from 'react'

import { getProducts } from '@/app/lib/products';
import ProductsGrid from '../components/ProductsGrid';
import Navbar from '../components/Navbar';


async function Products() {
    const products = await getProducts();

    return (
        <ProductsGrid products={products} />
    )
}


export default function page() {


    return (
        <>
            <main>
                <Navbar/>
                <Suspense fallback={<p>
                    Fetching Products..
                </p>} >
                    <Products />
                </Suspense>
            </main>
        </>
    )
}