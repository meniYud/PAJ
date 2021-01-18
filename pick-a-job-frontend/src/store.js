import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productListReducer } from './api/productApi/reducers';

const reducer = combineReducers({
    productList: productListReducer
});
const initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store; 