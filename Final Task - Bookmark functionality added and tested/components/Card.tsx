import React, { useState } from 'react'
import bookmark from '../Images/bookmark.png'
import yellow from '../Images/yellow.png'
import Image from 'next/image'
import { useCreateBookmarkMutation } from '@/app/service/getApi'

interface Props{
    title: string
    company: string
    location: string[]
    description: string
    categories: string[]
    opType: string
    image: string
    id: string
}

const Card = ({title, company, location, description, categories, opType, id, image}: Props) => {
    const token = localStorage.getItem("accessToken")
    const [ createBookmark, { isError, isLoading, isSuccess}] = useCreateBookmarkMutation()
    
    
    // To truncate the description on a certain number of texts to make them all equal
    const maxLen = 304
    const truncate = (text: string): string => {
        if (text.length > maxLen){
            return text.substring(0, maxLen) 
        }
        else{
            return text
        }
    }


    // colors to alternate for the texts
    const colors = ["#FFB836", "#5a55e6"]
    const [bookmarked, setbookmark] = useState(false)

    const handleMakeBookmark = async (e: React.MouseEvent<HTMLImageElement>) => {
        setbookmark(true)
        e.stopPropagation()
        e.preventDefault()
        const res = await createBookmark({ids: id, token }).unwrap()
        if (res.status === 409){
            throw new Error("couldn't")
        }
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
                <h6>{location?.map((item, ind) => (item))}</h6>             
            </div>

            <p className='size3 pr-16'>{truncate(description)}</p>
            
            <ul className=' flex space-x-2 '>

                <li style={{color: "#56CDAD"}} className='px-2 py-1 bg-green-100 font-semibold text-xs border-2 rounded-3xl'>{opType}</li>

                <span className=' font-light'>|</span>

                {categories.map((item, ind) => (
                    <li style={{color: colors[ind%2], borderColor: colors[ind%2]}} key={ind} className='px-2 py-1 text-xs border-2 rounded-full'>{item}</li>
                ))}

            </ul>

        </div>
        {bookmarked ? 
        (<Image onClick={(e) => {
            setbookmark(false)
            e.stopPropagation()
            e.preventDefault()
        }} className='w-8 mr-10 absolute top-0 mt-4  hover:scale-125 right-0 h-8' src={yellow} alt='k'/>) : (
        <Image onClick={(e) => {handleMakeBookmark(e)}} className='w-8 mr-10 absolute top-0 mt-4  hover:scale-125 right-0 h-8' src={bookmark} alt='k'/>)}
    </div>
  )
}

export default Card