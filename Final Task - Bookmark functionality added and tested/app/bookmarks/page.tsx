"use client"
import Cardbookmark from "@/components/Cardbookmark";
import Type2 from "../type";
import { useGetBookmarksQuery } from "../service/getApi";
import Header from "@/components/Header";
import { useDispatch } from "react-redux";
import { authorize } from "../service/loginSlice";


const page = () => {
  const dispatch = useDispatch()
  const access = localStorage.getItem("accessToken")
  
  if ((access !== 'undefined') || (access)){
      dispatch(authorize())
  }

  let { data, isError, isLoading } = useGetBookmarksQuery(access);
  const job: Type2[] = data?.data

    if (isError){
    return <h1 className='text-center text-lg mt-72'>There seems to be an error while fetching your data</h1>
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
              <div key={index}>
                  {/* rendering the corresponding cards */}
                  < Cardbookmark id={item.eventID} title={item.title} opType={item.opType} company={item.orgName} image={item.logoUrl}/>
              </div>
            ))}
          </ul>
        </div>   
      </main>
  );
}

export default page
