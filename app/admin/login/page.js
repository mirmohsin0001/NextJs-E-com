import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">
                            Admin Login
                        </h1>
                        <p className="leading-relaxed mt-4">
                            You need to login to access the admin panel
                        </p>
                        <p className="leading-relaxed mt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta animi itaque voluptatibus. Sint, iusto obcaecati?
                        </p>
                    </div>
                    <form method='post' action={console.log("execute data posting logic for log in")} className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Log In</h2>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                            <input type="email" id="email" name="email" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" name="password" required className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />

                        </div>
                        <div className="relative mb-4">
                        </div>
                        <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                        <p className="text-xs text-gray-500 mt-3">Not a user? <Link href={'/signUp'} className='text-indigo-500 cursor-pointer' >Sign Up</Link> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default page