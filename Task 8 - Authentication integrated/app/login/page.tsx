"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { useSignInMutation } from '../service/getApi'
import { useRouter } from 'next/navigation'

interface formtype {
    email: string,
    password: string
}

const page = () => {
    const router = useRouter()
    const form = useForm<formtype>()
    const {control, register, formState, handleSubmit} = form
    const { errors } = formState

    const [signIn, { data, isError, isLoading}] = useSignInMutation()



    if (isError){
        return <h1 className='text-center text-lg mt-72 text-red-700'>There seems to be an error while fetching your job</h1>
    }
    if (isLoading){
          return  <h1 className='text-center text-lg mt-72'>Loading ....</h1>
    }




    const onSubmit = async (user: formtype) => {
        try{
            const res = await signIn(user)
            const { data } = res;
            console.log(data);
            localStorage.setItem("accessToken", data.accessToken)

            router.push(`/`)
    
        } catch (err) {
            console.log("error")
            router.push(`/signup`)
        }}
        
    



  return (
    <div className='flex justify-end'>
        <form onSubmit={handleSubmit(onSubmit)} className=' px-6 space-y-5 w-4/12 mr-44 mt-36' action="">

            <div className='flex justify-center w-full'><h1 className=' text-[#202430] font-poppins text-4xl font-black'>Welcome Back,</h1></div>
            <hr />
            <div className='space-y-4'>
                <div className='flex space-y-2 flex-col'>
                    <label className='text-[#515B6F] ml-1 text-sm font-semibold' htmlFor="email">Email Address</label>
                    <input className='bg-white rounded-lg border p-3' type="text" placeholder='Enter email address' {...register("email", {required: "Email is required"})} />
                </div>
                {errors.email ? <p className='text-red-500 text-sm'>{errors.email.message}</p> : null}


                <div className='flex space-y-2 flex-col'>
                    <label className='text-[#515B6F] ml-1 text-sm font-semibold' htmlFor="email">Password</label>
                    <input className='bg-white rounded-lg border p-3' type="text" placeholder='Enter password' {...register("password", {required: "Password is required"})} />
                </div>
                { errors.password ? <p className='text-red-500 text-sm'>{errors.password.message}</p> : null}

            </div>
            <button onClick={handleSubmit(onSubmit)} className='w-full py-4 text-white font-epilogue rounded-full bg-indigo-900'>Login</button>
            <h2 className='text-sm'>Don't have an account? <span className='font-semibold ml-1 text-base text-blue-900'>Sign Up</span></h2>
        </form>
    </div>
  )
}

export default page