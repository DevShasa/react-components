import React, { useState } from 'react'
import { CaretDown, CaretRight } from "phosphor-react"

type Props = {
    options: string[]
}




const Dropdown = (props: Props) => {

    const {options} = props

    const [open, setOpen] = useState(false)

    return (
        <div>
            <button 
                className="rounded text-white px-2 py-1 hover:bg-gray-400 bg-gray-300 flex gap-1 items-center"
                onClick={()=>setOpen(prev =>!prev)}
            >
                Dropdown
                {open ? <CaretDown size={16}/> : <CaretRight size={16}/>}
            </button>
            <div className='relative'>
                {open && (
                    <div className='bg-white py-1 rounded border absolute w-[200px] mt-5'>
                        <div className='upTriangle'></div>
                        {options.map((option , index )=>{
                            return(
                                <li 
                                    key={index}
                                    className='
                                        hover:bg-blue-400 
                                        hover:text-white 
                                        p-default 
                                        list-none 
                                        cursor-pointer'
                                >
                                    {option}
                                </li>
                            )
                        })}
                </div>)}
            </div>

        </div>
    )
}

export default Dropdown