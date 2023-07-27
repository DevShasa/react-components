import Navbar from "./components/Navbar"
import CartContainer from "./components/CartContainer"
import { calculateTotals, getCartItems } from "./features/cart/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import Modal from "./components/Modal"

function App() {

  const dispatch = useDispatch()
  const { cartItems, isLoading } = useSelector((store)=> store.cart)
  const { isOpen }  = useSelector((store)=> store.modal)

  useEffect(()=>{
    dispatch(calculateTotals())
  },[cartItems, dispatch])


  useEffect(()=>{
    dispatch(getCartItems("wolan"))
  },[dispatch])

  if(isLoading) return<div className="loading"><h3>loading...</h3></div>

  return (
    <>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </>
  )
}

export default App
