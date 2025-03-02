'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/public/logo2.png'
import CartIcon from './CartIcon'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from '@clerk/nextjs'

import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {



  const [menu, setMenu] = useState(false)

  function handleClick() {
    setMenu(!menu)
  }




  return (

    <>
      <header className="text-gray-600 body-font">


        <div className="container mx-auto flex flex-wrap p-5 items-center">

          {/* LOGO */}
          <Link className="flex title-font font-medium items-center text-gray-900 cursor-pointer md:mb-0" href='/'>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg> */}
            <Image src={logo} width={200} alt="logo" />
            {/* <span className="ml-3 text-lg md:text-xl">Tailblocks</span> */}
          </Link>

          {/* NAV LINKS */}
          <nav className="hidden  md:ml-auto md:flex flex-wrap items-center text-base justify-center">  {/* responsive */}
            <Link className="mr-5 hover:text-gray-900" href='/' >Home</Link>
            <Link className="mr-5 hover:text-gray-900" href='/shop' >Shop</Link>
            <Link className="mr-5 hover:text-gray-900" href='/about' >About</Link>
            <Link className="mr-5 hover:text-gray-900" href='/contact' >Contact Us</Link>
            <div className="flex items-center gap-4 mr-8 ml-auto">
              <Link href="/cart">
                <CartIcon />
              </Link>
            </div>
            <SignedOut>
              <SignInButton mode='modal' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </nav>




          {/* HAMBURGER */}
          <div className='flex ml-auto cursor-pointer  md:hidden' >                                                  {/* responsive */}
            <div className="flex items-center gap-4 mr-8 ml-auto">
              <Link href="/cart">
                <CartIcon />
              </Link>
            </div>
            <GiHamburgerMenu size={32} onClick={handleClick} />
          </div>

          {/* MOBILE NAV LINKS */}

          {menu && (
            <nav className="md:hidden absolute top-24 right-0 bg-white w-full shadow-lg z-50">
              <div className="flex flex-col items-center text-base justify-center py-4">
                <Link className="mb-3 hover:text-gray-900" href='/'>Home</Link>
                <Link className="mb-3 hover:text-gray-900" href='/shop'>Shop</Link>
                <Link className="mb-3 hover:text-gray-900" href='/about'>About</Link>
                <Link className="mb-3 hover:text-gray-900" href='/contact'>Contact Us</Link>
                <SignedOut>
                  <SignInButton mode='modal' className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" />
                </SignedOut>
                <div className='py-3  w-full text-center'>
                  <UserButton showName />
                </div>


              </div>
            </nav>
          )}


        </div>
      </header>
    </>

  )


}


export default Navbar