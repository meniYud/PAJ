const _isDeletedPosition = (position) => position.positionStatus === 'DELETED';

export const positionsAggregator = (data) => {
    const ids = [];

    const positions = data.reduce((positions, position) => {
        const positionID = position._id;
        if (_isDeletedPosition(position)) {
            return {...positions};
        }

        ids.push(positionID);
        return {
            ...positions,
            [positionID]: {
                loading: false,
                data: position,
                error: null
            }
        };
    }, {});

    const response = {
        ids,
        positions
    };

    return response;
}