import { UserButton } from "@clerk/nextjs";
import Link from "next/link";


export default function Layout({ children }) {
  return (
    <>
      <header className="flex items-center font-mono">

        <h1 className="text-3xl font-black">
          Admin Panel
        </h1>


        <div className=" ml-auto flex justify-center p-5 gap-2 flex-col items-center sm:flex-row">
          <Link href='/admin/'>
            <button className='w-44  px-4 py-3 rounded-full block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
              Dashboard
            </button>
          </Link>
          <Link href='/admin/products'>
            <button className='w-44 px-4 py-3 rounded-full block hover:bg-black transition duration-300 ease-in-out hover:text-white ' >
              All Products
            </button>
          </Link>
          <Link href='/admin/addProduct'>
            <button className='w-44  px-4 py-3 rounded-full block hover:bg-black transition  duration-300 ease-in-out hover:text-white' >
              Add Product
            </button>
          </Link>

          <div className="flex ml-5" >
            <UserButton />
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}