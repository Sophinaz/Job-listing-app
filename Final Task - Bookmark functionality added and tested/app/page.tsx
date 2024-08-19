"use client"
import Card from "@/components/Card";
import Link from "next/link";
import Type2 from "./type";
import { useGetAllJobsQuery } from "./service/getApi";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { authorize, unauthorize } from "./service/loginSlice";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function Home() {
  // const token = localStorage.getItem("accessToken")

    const { data: session} = useSession({
      required: false,
    })

  const dispatch = useDispatch()
  const token = localStorage.getItem("accessToken")
  
  useEffect(() => {
    if ((token !== 'undefined' && token) || session) {
      dispatch(authorize());
    }
  }, [session, token, dispatch]);


  let { data, isError, isLoading } = useGetAllJobsQuery(undefined);
  const job: Type2[] = data?.data
  console.log(job)

    if (isError){
    return <h1>There seems to be an error while fetching your data</h1>
  }
    if (isLoading){
        return <h1 className='text-center text-lg mt-72'>Loading ....</h1>
  }


  return (
      <main className="bg-white h-fit mb-4 ">
        <div>
          <Header />
        </div>
        <div style={{width: '850px'}} className="  ml-32 mt-6 bg-white">
          <div className="flex items-center justify-between">
            <div className=" space-y-1">
              <h1 className=" size5">Opportunities</h1>
              <h5  className="size2  ml-1 "> showing {job.length} results</h5>
            </div>
            <div className="mr-8 size2">
              <h5 className=" ">Sort by: <span className="font-bold text-gray-600"> 

                <select name="method" id="method">
                  <option value="Most Relevant">Most Relevant</option>
                  <option value="Alphabetically">Alphabetically</option>
                </select>
                
                </span></h5>
            </div>
          </div>

          <ul className=" space-y-6 mt-9 ">

            {job.map((item: Type2, index: number) => (
              // Linking to the description page
              <Link key={index} href={`/Description/${item.id}`}>

                  {/* rendering the corresponding cards */}
                  { item ?
                  < Card title={item.title} id={item.id} opType={item.opType} description={item.description} location={item.location} company={item.orgName} image={item.logoUrl} categories={item.categories}/> : null
                  }
                  
              </Link>
            ))}
          </ul>
        </div>   
      </main>
  );
}
