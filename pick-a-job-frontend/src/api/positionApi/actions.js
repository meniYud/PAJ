import axios from 'axios';
import { positionListActions, positionActions } from './consts';
import {positionsAggregator} from './positionsDataTransformer';

const {
    POSITION_LIST_FAIL,
    POSITION_LIST_SUCCESS,
    POSITION_LIST_REQUEST,
} = positionListActions;

const {
    UPDATE_POSITION_REQUEST,
    UPDATE_POSITION_SUCCESS,
    UPDATE_POSITION_FAIL,
    CREATE_POSITION_REQUEST,
    CREATE_POSITION_SUCCESS,
    CREATE_POSITION_FAIL
} = positionActions;


export const listPositions = (companyID = null) => async (dispatch) => {
    try {
        const url = companyID ? `/api/positions/${companyID}` : '/api/positions';
        dispatch({ type: POSITION_LIST_REQUEST })
        const { data } = await axios.get(url);

        dispatch({
            type: POSITION_LIST_SUCCESS,
            payload: positionsAggregator(data)
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

export const updatePositionByPositionID = (positionID, payload) => async (dispatch, getState) => {
    try {
        const url = `/api/positions/${positionID}`;
        const { userLogin: { userInfo } } = getState();
        dispatch({
            type: UPDATE_POSITION_REQUEST,
            payload: {id: positionID}
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data = {} } = await axios.put(url, payload, config);

        dispatch({
            type: UPDATE_POSITION_SUCCESS,
            payload: {id: positionID, data}
        });
    } catch (error) {
        dispatch({
            type: UPDATE_POSITION_FAIL,
            payload: {id: positionID, error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message}
                
        })
    }
}

export const createNewPosition = (payload) => async (dispatch, getState) => {
    try {
        const url = `/api/positions/`;
        const { userLogin: { userInfo } } = getState();
        dispatch({
            type: CREATE_POSITION_REQUEST
        })

        const offeringAgent = userInfo._id;

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data = {} } = await axios.post(url, {...payload, offeringAgent}, config);

        dispatch({
            type: CREATE_POSITION_SUCCESS,
            payload: {data}
        });
    } catch (error) {
        dispatch({
            type: CREATE_POSITION_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const deletePositionByID = (positionID) => async (dispatch, getState) => {
    try {
        const url = `/api/positions/${positionID}`;
        const { userLogin: { userInfo } } = getState();
        dispatch({
            type: UPDATE_POSITION_REQUEST,
            payload: {id: positionID}
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data = {} } = await axios.put(url, {positionStatus: 'DELETED'}, config);

        dispatch({
            type: UPDATE_POSITION_SUCCESS,
            payload: {id: positionID, data}
        });
    } catch (error) {
        dispatch({
            type: UPDATE_POSITION_FAIL,
            payload: {id: positionID, error: error.response && error.response.data.message
                ? error.response.data.message
                : error.message}
                
        })
    }
}

