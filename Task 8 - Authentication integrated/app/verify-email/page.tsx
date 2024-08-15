"use client"
import React, { useState } from 'react'
import { useVerifyEmailMutation } from '../service/getApi'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter, useSearchParams } from 'next/navigation'
import Otp from '@/components/otp'
import { set } from 'react-hook-form'

const page = () => {
  const router = useRouter()
  const params = useSearchParams()
  const email = params.get('email')
  let count = 0

  const [verifyEmail, { data, isError, isLoading}] = useVerifyEmailMutation()
  const [val, setVal] = useState("")
  

  const handleSubmit = async () =>{
    const temp = val
    setVal("")
    try{

      console.log('val: ' , temp)
      const res  = await verifyEmail({"email": email, "otp": temp})
      const { data } = res

      console.log('data:', data)
      console.log('data: ', data.data);
      console.log('token: ', data.data.accessToken)
      localStorage.setItem("accessToken", data.data.accessToken)

      router.push(`/`)

      }catch (err){
        
      console.log(err)
      alert('sign up again')
      router.push(`/signup`)

    }
  }
  if (val.length > 0) {
    handleSubmit()
  }



  return (
    <div className='flex justify-center align-middle mt-36'>
        <div className='w-4/12 flex items-center flex-col space-y-10'>
            <h1 className='font-black text-4xl font-poppins text-[#25324B]'>Verify Email</h1>

            <p className='text-base text-[#7C8493]'>We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.</p>

            <Otp getOtp={setVal}/>


        </div>
    </div>
  )
}

export default page