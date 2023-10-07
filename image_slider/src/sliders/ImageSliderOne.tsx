import React, { useState } from 'react'
import {ArrowBigLeft, ArrowBigRight} from "lucide-react"

type Props = {
    imageUrls: string[]
}

const ImageSliderOne = (props: Props) => {

    const {imageUrls} = props
    const [imageIndex, setImageIndex] = useState(0)

    const showNextImage = () =>{
        setImageIndex(index => {
            if (index === imageUrls.length -1) return 0

            return index  +1
        })
    }

    const showPreviousImage = () =>{
        setImageIndex(index => {
            if (index === 0) return imageUrls.length -1

            return index -1
        })
    }

  return (
    <div style={{
        width:"100%",
        height:"100%",
        position:"relative"
    }}>

        <div
            style={{
                width: "100%",
                height: "100%",
                display:"flex",
                overflow:"hidden"
            }}
        >
            {imageUrls.map(url=>(
                <img 
                    src={url} 
                    key={url}
                    className="image_slider_css"
                    style={{
                        translate: `${-100 * imageIndex}%`
                    }}
                />
            ))}
        </div>

        <button className='image_slider_button' style={{left: 0}} onClick={showNextImage}><ArrowBigLeft /></button>
        <button className='image_slider_button' style={{right: 0}} onClick={showPreviousImage}><ArrowBigRight /></button>

        <div>
            {imageUrls.map((_, index)=>{
                return (
                <button onClick={()=>setImageIndex(index)}>
                    {index}
                </button>)
            })}
        </div>
    </div>
  )
}

export default ImageSliderOne