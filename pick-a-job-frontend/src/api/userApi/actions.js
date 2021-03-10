import axios from 'axios';
import { userActions } from './consts';

const {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTRATION_REQUEST,
    USER_REGISTRATION_SUCCESS,
    USER_REGISTRATION_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DETAILS_RESET
} = userActions;

export const login = (props) => async (dispatch) => {
    try {
        const { email, password } = props;
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('userInfo');
        dispatch({type: USER_LOGOUT});
        dispatch({type: USER_LIST_RESET});
        dispatch({type: USER_DETAILS_RESET})

    } catch (error) {
        dispatch({
            type: USER_LOGOUT
        });
    }
}

export const register = (props) => async (dispatch) => {
    try {
        const { name, email, password } = props;
        dispatch({
            type: USER_REGISTRATION_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/',
            { name, email, password },
            config
        );

        dispatch({
            type: USER_REGISTRATION_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTRATION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/users/profile`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users`,
            config
        );

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}