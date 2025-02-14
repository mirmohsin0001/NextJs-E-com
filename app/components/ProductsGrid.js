import React from 'react'
import ProductItem from './ProductItem'


const ProductsGrid = ({ products }) => {
    return (
        <>


            <ul className="flex flex-wrap">
                {products.map(product =>
                    <li className="lg:w-1/4 md:w-1/2 p-4 w-full" key={product._id} >


                        <ProductItem {...product} />


                    </li>
                )}
            </ul>

        </>

    )
}

export default ProductsGrid