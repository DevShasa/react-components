
import Dropdown from "@/components/dropdown"
export default function Home() {

  const options = [
    "item 1",
    "item 2",
    "item 3"
  ]

  const handleCLick = (option:string)=>{
    console.log("THE SELECTED OPTION IS", option)
  }

  return(
     <div className="p-12 ">
      <Dropdown options={options} selectOption={handleCLick}/>
     </div>
  )
}
