import SpotlightComponent from "./components/SpotlightComponent"


export default function Home() {
  return (
    <div className={"grid place-items-center h-screen"}>
      <div className={'rounded-xl grid place-items-center p-14 bg-slate-950'}>
          <SpotlightComponent />
      </div>
      
    </div>
  )
}
