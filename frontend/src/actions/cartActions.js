import axios from 'axios'
import * as actions from '../types'

export const addToCart = (id) => async (dispatch, getState) => {
 const {data} = await axios.get(`/api/products/${id}`)

 dispatch({
     type: actions.CART_ADD_ITEM,
     payload: {
         product: data._id,
         name: data.name,
         image: data.image,
         price: data.price,
         countInStock: data.countInStock,
     }
 })

 localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
 dispatch({
     type: actions.CART_REMOVE_ITEM,
     payload: id
 })

 localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}