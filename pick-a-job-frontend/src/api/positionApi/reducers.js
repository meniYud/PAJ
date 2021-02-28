import { positionListActions } from './consts';

const {
    POSITION_LIST_FAIL,
    POSITION_LIST_SUCCESS,
    POSITION_LIST_REQUEST,
} = positionListActions;


export const positionListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case POSITION_LIST_REQUEST:
            return { ...state, loading: true, positions: [] };
        case POSITION_LIST_SUCCESS:
            return { ...state, loading: false, positions: action.payload };
        case POSITION_LIST_FAIL:
            return { ...state, loading: false, positions: [], error: action.payload };
        default:
            return {...state};
    }
};
