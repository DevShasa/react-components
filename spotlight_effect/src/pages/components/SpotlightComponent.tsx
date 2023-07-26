import React, { useRef, useState } from 'react'

type Props = {}

const SpotlightComponent = (props: Props) => {

    const divRef = useRef<HTMLDivElement>(null)
    const [isfocussed, setIsfocussed] = useState(false)
    const [position, setPosition] = useState({
        x:0,
        y:0
    })
    const [opacity, setOpacity] = useState(0)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>)=>{
        if(!divRef.current || isfocussed){
            // there is nothing in the ref and isfocussed is on
            return
        }

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    const handleFocus = ()=>{
        setIsfocussed(true);
        setOpacity(1)
    }

    const handleBlur = ()=>{
        setIsfocussed(false)
        setOpacity(0)
    }

    const handleMouseEnter = ()=>{
        setOpacity(1)
    }

    const handleMouseLeave = ()=>{
        setOpacity(0)
    }

    return (
        <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="to-slate-950 bg-gradient-to-l from-slate-900 relative max-w-md max-h-56 overflow-hidden rounded-xl border border-slate-500  px-8 py-16 shadow-2xl"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity: opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
          }}
        />
        <h3 className="mb-2 font-medium tracking-tight text-white">Hello!</h3>
        <p className="text-sm text-slate-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ex
          obcaecati natus eligendi delectus, cum deleniti sunt in labore nihil
          quod quibusdam expedita nemo.
        </p>
      </div>
    )
}

export default SpotlightComponent