import Link from "next/link";


export default function Layout({ children }) {
  return (
    <>
      <header className="flex items-center font-mono">

        <h1 className="text-3xl font-black">
          Admin Panel
        </h1>


        <div className=" ml-auto flex justify-center p-5 gap-3 flex-col place-items-center sm:flex-row">
          <Link href='/admin/'>
            <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
              Home
            </button>
          </Link>
          <Link href='/admin/products'>
            <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
              All Products
            </button>
          </Link>
          <Link href='/admin/addProduct'>
            <button className='w-44 border-2 border-black px-4 py-3 rounded block hover:bg-black transition  duration-300 ease-in-out hover:text-white' >
              Add Product
            </button>
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}