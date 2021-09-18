import { companyActions } from './consts';

const {
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAIL,
    
    LIST_COMPANIES_REQUEST,
    LIST_COMPANIES_SUCCESS,
    LIST_COMPANIES_FAIL
} = companyActions;

export const companiesReducer = (state = { companies: [] }, action) => {
    switch(action.type) {
        case LIST_COMPANIES_REQUEST:
        case ADD_COMPANY_REQUEST:
            return { ...state, loading: true };
        case LIST_COMPANIES_SUCCESS:
            return { loading: false,  companies: action.payload, recentlyAdded: null} ;
        case ADD_COMPANY_SUCCESS:
            return { ...state, loading: false, recentlyAdded: action.payload} ;
        case LIST_COMPANIES_FAIL:
        case ADD_COMPANY_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return {...state};
    }
};