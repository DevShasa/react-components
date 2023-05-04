import React, { useCallback, useState } from 'react'
import { CaretDown, CaretRight } from "phosphor-react"
import { useDetectClickOutside } from 'react-detect-click-outside'

type Props = {
    options: string[]
    selectOption: (option:string)=>void
}




const Dropdown = (props: Props) => {

    const {options, selectOption} = props
    const [open, setOpen] = useState(false)


    const handleClose = () =>{
        console.log("triggered")
        setOpen(false)
    }

    const outsideclickref = useDetectClickOutside({onTriggered: handleClose})


    const handleClick = useCallback((option:string)=>{
        setOpen(false)
        selectOption(option)
    },[selectOption])

    return (
        <div  ref={outsideclickref} >
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
                        <div className='options_container'>
                            {options.map((option , index )=>{
                                return(
                                    <li 
                                        key={index}
                                        className='
                                            hover:bg-blue-400 
                                            hover:text-white 
                                            p-default 
                                            list-none 
                                            cursor-pointer 
                                            listItem'
                                        onClick={()=>handleClick(option)}
                                    >
                                        {option}
                                    </li>
                                )
                            })}
                        </div>
                </div>)}
            </div>

        </div>
    )
}

export default Dropdown