import axios from 'axios';
import { Error } from 'mongoose';
import { userActions, userRoles } from './consts';

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
    USER_UPDATE_PROFILE_DONE,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DETAILS_RESET,
    AGENT_REGISTRATION_REQUEST,
    AGENT_REGISTRATION_SUCCESS,
    AGENT_REGISTRATION_FAIL,
    AGENT_REGISTRATION_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL
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

export const registerAgent = ({userName: name, email, password}) => async (dispatch, getState) => {// method for registering new company agent by company admin
    try {
        const { userLogin: { userInfo } } = getState();

        const {isUsersAdmin = false, role = userRoles.GUEST} = userInfo;

        if(!isUsersAdmin || !role === userRoles.COMPANYADMIN){
            throw new Error('logged-in user does not allowed to create agents')
        } else {
            const creationRole = userRoles.COMPANYAGENT;

            dispatch({
                type: AGENT_REGISTRATION_REQUEST
            })
    
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
    
            const { data } = await axios.post(
                '/api/users/',
                { name, email, password, creationRole },
                config
            );
    
            dispatch({
                type: AGENT_REGISTRATION_SUCCESS,
                payload: data
            })
        }


    } catch (error) {
        dispatch({
            type: AGENT_REGISTRATION_FAIL,
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
        dispatch({
            type: USER_UPDATE_PROFILE_DONE,
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

export const listUsers = (shouldResetNewAgent) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })
        if(shouldResetNewAgent){
            dispatch({
                type: AGENT_REGISTRATION_RESET
            })
        }

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

export const deleteUser = (userId, resetUserList = false) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })
        if(resetUserList){
            dispatch({
                type: USER_LIST_RESET
            })
        }

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/users/${userId}`,
            config
        );

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
}