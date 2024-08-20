"use client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authorize, unauthorize } from '@/app/service/loginSlice'
import { useRouter } from 'next/navigation'


const Header = () => {
  const router = useRouter()
  const isloggedin = useSelector((state:any) => state.authenticator.value)
  const dispatch = useDispatch()

  const handleLogoutclick = () => {
    dispatch(unauthorize())
    localStorage.setItem("accessToken", "")
  }

  const handlebookmark = () => {
    router.push(`/bookmarks`)
  }



  return (
    <div className='flex justify-end  w-full'>
        <input type="text" className='rounded-full mt-10 h-12 w-1/4 px-4 mr-96 border-2 border-black' placeholder='Search for jobs'  />

        {isloggedin ? (
          <div className='flex space-x-10 w-1/3'>
            <button onClick={handlebookmark} className='btnc mt-10 py-1 px-4 rounded-3xl bg-indigo-800 text-lg text-white epi'>Bookmarks</button>
            <button onClick={handleLogoutclick} className='btnb mr-48 mt-10 py-1 px-4 rounded-3xl bg-indigo-900 text-lg text-white epi'>Log out</button>
          </div>
        ) : (
          <div className='w-1/4 flex justify-center'>
            <button onClick={() => router.push(`/login`)} className='btna mr-48 mt-10 py-1 px-4 rounded-3xl bg-indigo-900 text-lg text-white epi'>Log in</button>
          </div>)}
    </div>
  )
}

export default Header