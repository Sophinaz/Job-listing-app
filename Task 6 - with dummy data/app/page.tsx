"use client"
import Card from "@/components/Card";
import data from "./Data" ;
import Link from "next/link";
import p1 from '../Images/p1.svg'
import p2 from '../Images/p2.svg'
import p3 from '../Images/p3.svg'
import p4 from '../Images/image 2.svg'
import { ChangeEvent, useState } from "react";


export default function Home() {
  const images = [p4, p1, p2, p3]

  const Data = data();
  const [selected, setSelected] = useState("")

  const handlechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value)
  }
  
  if (selected === "Alphabetically") {
    Data.sort((a, b) => a.title.localeCompare(b.title))
  }



  return (
    <main className="bg-white h-fit flex mb-4 ">
      
      <div style={{width: '850px'}} className="  ml-32 mt-16 bg-white">
        <div className="flex items-center justify-between">
          <div className=" space-y-1">
            <h1 className=" size5">Opportunities</h1>
            <h5  className="size2  ml-1 "> showing {Data.length} results</h5>
          </div>
          <div className="mr-8 size2">
            <h5 className=" ">Sort by: <span className="font-bold text-gray-600"> 
              <select onChange={handlechange} name="method" id="method">
                <option value="Most Relevant">Most Relevant</option>
                <option value="Alphabetically">Alphabetically</option>
              </select>
              
              </span></h5>
          </div>
        </div>

        <ul className=" space-y-6 mt-9 ">
          {Data.map((data, index) => (
            <Link key={index} href={{
              pathname: "/Description",
              query: {
                description: data.description,
                res: data.responsibilities,
                age: data.ideal_candidate.age,
                gender: data.ideal_candidate.gender,
                traits: data.ideal_candidate.traits,
                whenandwhere: data.when_where,
                postedon: data.about.posted_on,
                deadline: data.about.deadline,
                location: data.about.location,
                start_date: data.about.start_date,
                end_date: data.about.end_date,
                categories: data.about.categories,
                required: data.about.required_skills
              }
            }}>
              < Card title={data.title} description={data.description} location={data.about.location} company={data.company} categories={data.about.categories} img={images[index%4]}  />
            </Link>
          ))}
        </ul>

      </div>
      
    </main>
  );
}
