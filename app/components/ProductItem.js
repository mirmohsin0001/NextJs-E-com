import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'





const ProductItem = ({ name, price, category, image, _id }) => {
    return (
        <>
            <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={image} />
                {/* <Image src={image} width={400} height={200} alt='image'/> */}
                
            </a>
            <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{category}</h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
                <p className="mt-1">{`$ ${price}`}</p>
                <Link href={`/shop/${_id}`}>View Details</Link>
            </div>
        </>
    )
}

export default ProductItem