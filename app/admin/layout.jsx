import Link from "next/link";


export default function Layout({ children }) {
  return (
    <>
      <div className="flex justify-center gap-3 flex-col place-items-center sm:flex-row">
        <Link href='/admin/'>
          <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
            Home
          </button>
        </Link>
        <Link href='/admin/products'>
          <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
            Show All Products
          </button>
        </Link>
        <Link href='/admin/addProduct'>
          <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition  duration-300 ease-in-out hover:text-white' >
            Add Product
          </button>
        </Link>
      </div>
      <main>{children}</main>
    </>
  )
}