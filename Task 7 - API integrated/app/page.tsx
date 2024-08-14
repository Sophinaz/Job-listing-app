"use client"
import Card from "@/components/Card";
import Link from "next/link";
import Type2 from "./type";
import { useGetAllJobsQuery } from "./service/getApi";


export default function Home() {

  let { data, isError, isLoading } = useGetAllJobsQuery(undefined);
  const job: Type2[] = data?.data
  console.log(job)

    if (isError){
    return <h1>There seems to be an error while fetching your job</h1>
}
  if (isLoading){
      return <h1 className='text-center text-lg mt-96'>Loading ....</h1>
  }

  return (
    <main className="bg-white h-fit flex mb-4 ">
      
      <div style={{width: '850px'}} className="  ml-32 mt-16 bg-white">
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
                < Card title={item.title} opType={item.opType} description={item.description} location={item.location} company={item.orgName} image={item.logoUrl} categories={item.categories}/>

            </Link>
          ))}
        </ul>
      </div>    
    </main>
  );
}
