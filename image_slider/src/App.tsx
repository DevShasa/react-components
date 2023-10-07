import car1 from "./imgs/car-1.jpg"
import car2 from "./imgs/car-2.jpg"
import car3 from "./imgs/car-3.jpg"
import car4 from "./imgs/car-4.jpg"
import car5 from "./imgs/car-5.jpg"
import ImageSliderOne from "./sliders/ImageSliderOne"

const IMAGES = [car1, car2, car3, car4, car5]

function App() {

  return (<div style={{
    maxWidth:"1200px",
    width:"100%",
    // height:"500px",
    aspectRatio:"10/6",
    margin :"0 auto"
  }}>
    <ImageSliderOne imageUrls={IMAGES}/>
  </div>)
}

export default App
