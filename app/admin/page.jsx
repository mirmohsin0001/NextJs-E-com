'use client'

import Link from 'next/link'
import React from 'react'
import AddProductForm from '../components/AddProductForm'

const page = () => {
  return (
    <>

      <div className="wrapper flex-col place-items-center">

        <h1 className="text-3xl" >Admin Page</h1>
        <h1 className=''>This is admin page.js</h1>
        <button className='border-2 border-black px-4 py-3 mb-28 mt-14 rounded block ' ><Link href='/admin/products'>Show All Products</Link></button>
      <AddProductForm />

    </div >
    </>
  )
}

export default page