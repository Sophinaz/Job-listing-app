import React, { useState } from 'react'
import bookmark from '../Images/bookmark.png'
import yellow from '../Images/yellow.png'
import Image from 'next/image'
import { useDeleteBookmarkMutation } from '@/app/service/getApi'

interface Props{
    title: string
    company: string
    opType: string
    image: string
    id: string
}

const Cardbookmark = ({title, company, opType, id, image}: Props) => {
    const token = localStorage.getItem("accessToken")
    const [ deleteBookmark, { isError, isLoading, isSuccess}] = useDeleteBookmarkMutation()
    const [bookmarked, setbookmark] = useState(true)


    // colors to alternate for the texts
    const colors = ["#FFB836", "#5a55e6"]

    // To handle the delete bookmark functionality
    const handleDeleteBookmark = async (e: React.MouseEvent<HTMLImageElement>) => {
        setbookmark(false)
        const res = await deleteBookmark({ id: id, token }).unwrap()
    }


  return (
    <div className=' hover:bg-gray-200 w-full relative border-2 h-fit rounded-3xl flex py-6 mt-8 bg-white'>
        <div className='w-48 flex justify-center'>
            <img className='w-12 h-12' src={image} alt="A2SV" />
        </div>
        <div className='space-y-2  flex flex-col'>
            <h2 className='size1'>{title}</h2>

            <div className=' size2 space-x-3 flex'>
                <h6 className=''>{company}</h6>
            </div>

            <div className=' flex space-x-2 '>
                <h3 style={{color: "#56CDAD"}} className='px-2 py-1 bg-green-100 font-semibold text-xs border-2 rounded-3xl'>{opType}</h3>
            </div>

        </div>
        {bookmarked ? 
        (<Image onClick={handleDeleteBookmark} className='w-8 mr-10 absolute top-0 mt-4  hover:scale-125 right-0 h-8' src={yellow} alt='k'/>
        ) : (
        <Image className='w-8 mr-10 absolute top-0 mt-4  hover:scale-125 right-0 h-8' src={bookmark} alt='k'/>
        )}
    </div>
  )
}

export default Cardbookmark