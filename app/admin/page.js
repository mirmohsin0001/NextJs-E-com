'use server'

import React from 'react'
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "@/app/actions";


export default async function Admin() {


  const client = await clerkClient();

  const users = (await client.users.getUserList()).data;
  return (
    <>
      <div className="wrapper flex-col place-items-center font-mono">
        <h1 className="text-5xl font-semibold mt-8 mb-4" >Admin Page</h1>
        <h1 className='my-2'>This is admin page.js</h1>

        <h1 className='text-3xl font-semibold mt-8 mb-3' >Users</h1>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className={`flex items-center justify-between gap-4 p-4 ${users.indexOf(user) % 2 === 0
                ? "bg-neutral-50 dark:bg-neutral-800"
                : "bg-white dark:bg-neutral-900"
                }`}
            >
              <div className="flex gap-8">
                <div className="dark:text-neutral-200">
                  {user.firstName} {user.lastName}
                </div>

                <div className="dark:text-neutral-200">
                  {
                    user.emailAddresses.find(
                      (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                </div>

                <div className="dark:text-neutral-200">
                  {user.publicMetadata.role}
                </div>
              </div>

              <div className="flex gap-2">
                <form action={setRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Make Admin
                  </button>
                </form>

                <form action={setRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Make Moderator
                  </button>
                </form>

                <form action={removeRole} className="inline">
                  <input type="hidden" value={user.id} name="id" />
                  <button
                    type="submit"
                    className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-700"
                  >
                    Remove Role
                  </button>
                </form>
              </div>
            </div>
          );
        })}


      </div >
    </>
  )
}
