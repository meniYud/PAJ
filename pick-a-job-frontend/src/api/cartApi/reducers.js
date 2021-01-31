import { cartActions } from './consts';

const {
    CART_REMOVE_ITEM_REQUEST,
    CART_REMOVE_ITEM_SUCCESS,
    CART_REMOVE_ITEM_FAIL,
    CART_ADD_ITEM_REQUEST,
    CART_ADD_ITEM_SUCCESS,
    CART_ADD_ITEM_FAIL
} = cartActions;

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM_REQUEST:
            return { ...state, loading: true };
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;
            const existItem = state.cartItems.find(cartItem => cartItem.product === item.product);

            if(existItem) {
                return {
                    ...state,
                    loading: false,
                    cartItems: state.cartItems.map(cartItem =>
                        cartItem.product === existItem.product ? item : cartItem)
                }
            } else {
                return {
                    ...state,
                    loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_ADD_ITEM_FAIL:
            return { ...state, loading: false, error: action.payload };
        case CART_REMOVE_ITEM_REQUEST:
            return { ...state, loading: true };
        case CART_REMOVE_ITEM_SUCCESS:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.product !== action.payload)
            }
        case CART_REMOVE_ITEM_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return {...state};
    }
};