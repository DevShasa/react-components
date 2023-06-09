import React, { useCallback, useState, useRef } from 'react'
import { CaretDown, CaretRight } from "phosphor-react"
import { useDetectClickOutside } from 'react-detect-click-outside'

type Props = {
    options: string[]
    selectOption: (option:string)=>void
}


const Dropdown = (props: Props) => {

    const {options, selectOption} = props
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState("")
    const dropdownref = useRef<HTMLDivElement | null>(null)

    const handleClose = (event:any) =>{
        // only trigger when dropdown is in the dom 
        if(dropdownref.current && !dropdownref.current.contains(event?.target)){
            setOpen(false)
        }
    }

    const outsideclickref = useDetectClickOutside({onTriggered: handleClose})


    const handleClick = useCallback((option:string)=>{
        setOpen(false)
        selectOption(option)
        setSelected(option)
    },[selectOption])

    return (
        <div  ref={outsideclickref} >
            <button 
                className="rounded text-white px-2 py-1 hover:bg-gray-400 bg-gray-300 flex gap-1 items-center"
                onClick={()=>setOpen(prev =>!prev)}
            >
                {selected ? `${selected}` :"Dropdown"}
                {open ? <CaretDown size={16}/> : <CaretRight size={16}/>}
            </button>
            <div className='relative'>
                {open && (
                    <div className='bg-white py-1 rounded border absolute w-[200px] mt-5' ref={dropdownref}>
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