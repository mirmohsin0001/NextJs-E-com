import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProduct } from '@/app/lib/products'
import Navbar from '@/app/components/Navbar'

export default async function page({ params }) {

    const product = await getProduct(params.slug)
    console.log(product);

    if (!product) {
        notFound();
    }


    return (
        <>
            <Navbar />
            <header  >
                {/* <div >
                    <Image src={product.image} alt='product image' fill />
                </div>
                <div>
                    <h1> {product.name} </h1>
                    <p> {product.category} </p>
                    <p> {product.price} </p>
                </div> */}

                <h1>{params.slug}</h1>
            </header>

        </>
    )
}