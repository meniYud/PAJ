import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { companiesReducer } from './api/companyApi/reducers';
import { positionListReducer } from './api/positionApi/reducers';
import { userLoginReducer, userRegisterReducer, agentRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer } from './api/userApi/reducers';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    positionList: positionListReducer,
    newAgent: agentRegisterReducer,
    deleteUser: userDeleteReducer,
    company: companiesReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk, logger];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store; 