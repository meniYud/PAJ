import axios from 'axios';
import { companyActions } from './consts';

const {
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    
    LIST_COMPANIES_REQUEST,
    LIST_COMPANIES_SUCCESS,
    LIST_COMPANIES_FAIL
} = companyActions;

export const addNewCompany = ({companyData, companyAdmin}) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();

        dispatch({
            type: ADD_COMPANY_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            '/api/companies/',
            {companyData, companyAdmin},
            config
        );

        dispatch({
            type: ADD_COMPANY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ADD_COMPANY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listAllCompanies = () => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState();

        dispatch({
            type: LIST_COMPANIES_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/companies/',
            config
        );

        dispatch({
            type: LIST_COMPANIES_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: LIST_COMPANIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}