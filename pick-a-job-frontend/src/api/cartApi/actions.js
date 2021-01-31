import axios from 'axios';
import { cartActions } from './consts';

const {
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL
} = cartActions;


export const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_ADD_ITEM_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM_SUCCESS,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        dispatch({
            type: CART_ADD_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM_REQUEST
        })
        // const { data } = await axios.get(`/api/products/${id}`);
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

        dispatch({
            type: CART_REMOVE_ITEM_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: CART_REMOVE_ITEM_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}