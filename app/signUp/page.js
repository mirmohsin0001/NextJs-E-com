"use client"

import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'



const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log({ email: data.email, password: data.password })


  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">Sign Up next level shoindcgoitch ethical authentic, poko scenester</h1>
            <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input {...register("email", { required: true })} type='email' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              <label className="leading-7 text-sm text-gray-600">Password</label>
              <input  {...register("password", { required: true, minLength: { value: 8, message: 'Minimum password length is 8' } })} type='password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
              <input type='password' {...register("cpassword", {
                required: true, validate: (val) => {
                  if (watch('password') != val) {
                    return "Your passwords do no match";
                  }
                }
              })} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

              {errors.password && <p className="text-xs text-gray-500 mt-3">{(errors.password.message)}</p>}
              {errors.cpassword && <p className="text-xs text-gray-500 mt-3">{(errors.cpassword.message)}</p>}

            </div>
            <div className="relative mb-4">
            </div>
            <input type='submit' className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" />
            <p className="text-xs text-gray-500 mt-3">Already a user? <Link href={'/logIn'} className='text-indigo-500 cursor-pointer' >Log In</Link> </p>
          </form>

        </div>
      </section>
    </>
  )
}

export default page