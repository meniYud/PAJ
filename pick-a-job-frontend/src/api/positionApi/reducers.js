import { positionListActions, positionActions } from './consts';

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

const initialState = {
    positionsData: {
        ids: [],
        positions: {}
    }
};


export const positionListReducer = (state = { ...initialState }, action) => {
    const {positionsData} = state;
    let id;
    // let enhancedIdsArray = [];
    const {ids, positions} = positionsData;
    if (action?.payload?.id) {
        id = action?.payload?.id;
        // ids.push(id)
        // enhancedIdsArray = [...new Set(ids)];
    }

    switch(action.type) {
        case POSITION_LIST_REQUEST:
            return { ...state, loading: true, positionsData  };
        case POSITION_LIST_SUCCESS:
            return { ...state, loading: false, positionsData: action.payload };
        case POSITION_LIST_FAIL:
            return { ...state, loading: false, positionsData, error: action.payload };
        case UPDATE_POSITION_REQUEST:
            return { ...state, positionsData: {...positionsData, positions: {...positions, [id]: {loading: true}}} };
        case UPDATE_POSITION_SUCCESS:
            return { ...state, positionsData: {...positionsData, positions: {...positions, [id]: {loading: false, data: action.payload.data}}} };
        case UPDATE_POSITION_FAIL:
            return { ...state, positionsData: {...positionsData, positions: {...positions, [id]: {loading: false, data: action.payload.error}}} };
        // case CREATE_POSITION_REQUEST:
        //     return { ...state, positionsData: {ids: enhancedIdsArray, positions: {...positionsData.positions, [id]: {loading: true}}} };
        // case CREATE_POSITION_SUCCESS:
        //     return { ...state, positionsData: {ids: enhancedIdsArray, positions: {...positionsData.positions, [id]: {loading: false, data: action.payload.data}}} };
        // case CREATE_POSITION_FAIL:
        //     return { ...state, positionsData: {ids: enhancedIdsArray, positions: {...positionsData.positions, [id]: {loading: false, data: action.payload.error}}} };
        case CREATE_POSITION_REQUEST:
            return { ...state };
        case CREATE_POSITION_SUCCESS:
            return { ...state };
        case CREATE_POSITION_FAIL:
            return { ...state };
        default:
            return {...state};
    }
};
