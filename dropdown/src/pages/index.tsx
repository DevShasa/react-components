
import Dropdown from "@/components/dropdown"
export default function Home() {

  const options = [
    "item 1",
    "item 2",
    "item 3"
  ]

  return(
     <div className="p-12 ">
      <Dropdown options={options}/>
     </div>
  )
}
