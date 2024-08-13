import Card from "@/components/Card";
import Link from "next/link";
import Type2 from "./type";

const getData = async () => {
  const res = await fetch('https://akil-backend.onrender.com/opportunities/search', {method: 'GET'})
  return res.json()
}


export default async function Home() {

  // fetching all jobs from API
  const { data } = await getData();

  // Handling Error
  if (!data){
    return (
    <div className=" flex h-screen justify-center items-center">
      <h1 className="text-red-500 text-center">Error while fetching data</h1>
    </div>
  )
  }

  return (
    <main className="bg-white h-fit flex mb-4 ">
      
      <div style={{width: '850px'}} className="  ml-32 mt-16 bg-white">
        <div className="flex items-center justify-between">
          <div className=" space-y-1">
            <h1 className=" size5">Opportunities</h1>
            <h5  className="size2  ml-1 "> showing {data.length} results</h5>
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

          {data.map((item: Type2, index: number) => (
            // Linking to the description page
            <Link key={index} href={{
              pathname: "/Description",
              query: { id: item.id }
            }}>

                {/* rendering the corresponding cards */}
                < Card title={item.title} opType={item.opType} description={item.description} location={item.location} company={item.orgName} image={item.logoUrl} categories={item.categories}/>

            </Link>
          ))}
        </ul>
      </div>    
    </main>
  );
}
