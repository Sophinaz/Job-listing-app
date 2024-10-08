import React from 'react'

interface Props{
    title: string
    company: string
    location: string[]
    description: string
    categories: string[]
    opType: string
    image: string
}

const Card = ({title, company, location, description, categories, opType, image}: Props) => {

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


  return (
    <div className=' hover:bg-gray-200 w-full border-2 h-fit rounded-3xl flex py-6 mt-8 bg-white'>
        <div className='w-48 flex justify-center'>
            <img className='w-12 h-12' src={image} alt="A2SV" />
        </div>
        <div className='space-y-2  flex flex-col'>
            <h2 className='size1'>{title}</h2>

            <div className=' size2 space-x-3 flex'>
                <h6 className=''>{company}</h6>
                {/* <div className='flex justify-center align-top w-2 h-6'>.</div> */}
                <h6>{location.map((item, ind) => (item))}</h6>
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
    </div>
  )
}

export default Card