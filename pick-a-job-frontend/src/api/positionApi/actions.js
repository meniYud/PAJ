import axios from 'axios';
import { positionListActions } from './consts';

const {
    POSITION_LIST_FAIL,
    POSITION_LIST_SUCCESS,
    POSITION_LIST_REQUEST,
} = positionListActions;


export const listPositions = (companyID = null) => async (dispatch) => {
    try {
        const url = companyID ? `/api/positions/${companyID}` : '/api/positions';
        dispatch({ type: POSITION_LIST_REQUEST })
        const { data } = await axios.get(url);

        dispatch({
            type: POSITION_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: POSITION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

