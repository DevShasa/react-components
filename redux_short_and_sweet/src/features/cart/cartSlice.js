import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { openModal } from "../modal/modalSlice";


const url = 'https://course-api.com/react-useReducer-cart-project';


const initialState = {
    cartItems:[],
    ammount:2,
    total: 0,
    isLoading: true
}

// name of action
// callback function that returns a promise
export const getCartItems = createAsyncThunk('cart/getCartItem', async(name, thunkApi)=>{
    //console.log(name)
    console.log("THONK",thunkApi)
    //console.log("THONKSTATE", thunkApi.getState()) // we can access the entire redux store
    //thunkApi.dispatch(openModal()) we can dispatch actions from other slices
    try {
        const resp = await axios(url)
        return resp.data
    } catch (error) {
        // MAYBE WE CAN MAKE ALERT HERE, ERROR ,TOAST OR SOMETHING
        return thunkApi.rejectWithValue("error from server in here")
    }
})

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart: (state)=>{
            state.cartItems = [] // immer js lets us mutate state directly
            // return {} whatever returned in here will become the new state
        },
        removeItem: (state, action)=>{
          const itemId = action.payload;
          state.cartItems = state.cartItems.filter((item)=> item.id !== itemId)  
        },
        increase: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=> item.id === payload.id)
            cartItem.amount = cartItem.amount + 1
        },
        decrease: (state, {payload})=>{
            const cartItem = state.cartItems.find((item)=>item.id === payload.id)
            cartItem.amount = cartItem.amount -1
        },
        calculateTotals: (state)=>{
            let ammount = 0
            let total = 0
            state.cartItems.forEach((item)=>{
                ammount += item.amount;
                total  += item.amount * item.price // item.price is a string hmm
            })
            state.ammount = ammount
            state.total = total
        }
    }, 
    extraReducers: (builder)=>{
        builder
            .addCase(getCartItems.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getCartItems.fulfilled, (state, action)=>{
                state.isLoading = false
                state.cartItems = action.payload
            })
            .addCase(getCartItems.rejected, (state, action)=>{
                console.log("ASYNCTHUNK API ERROR===>",action.payload)
                state.isLoading = false
            })
        // [getCartItems.pending]:(state) =>{
        //     state.isLoading= true
        // },
        // [getCartItems.fulfilled]:(state, action) =>{
        //     state.isLoading= false
        //     state.cartItems = action
        // },
        // [getCartItems.rejected]:(state) =>{
        //     state.isLoading= false
        // },
    }
})

export default  cartSlice.reducer// mutates the state
export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
console.log(cartSlice)