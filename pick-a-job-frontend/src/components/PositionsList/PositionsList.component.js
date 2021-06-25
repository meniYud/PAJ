import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Col } from 'react-bootstrap';
import { listPositions } from '../../api/positionApi/actions'
import Position from './Position';
import Loader from '../Loader';
import Message from '../Message';


const PositionslistComponent = (props) => {
    const {company, positionProps} = props;
    const dispatch = useDispatch();
    const positionsList = useSelector(state => state.positionList);
    const { loading, error, positionsData = {} } = positionsList;
    const {ids = []} = positionsData;

    const [shouldReloadData, setShouldReloadData] = useState(true);

    useEffect(() => {
        const action = company && company._id ? listPositions(company._id) : listPositions();
        if(shouldReloadData) {
            dispatch(action);
        }
        // if(company && company._id) {
        //     dispatch(listPositions(company._id));
        // } else {
        //     dispatch(listPositions());
        // }
        setShouldReloadData(false);
    }, [dispatch, company, shouldReloadData]);

    const singlePositionProps = {
        reloadData: () => setShouldReloadData(true),
        ...positionProps
    };

    return (
        <>
            {loading
                ? <Loader />
                : (error
                    ? <Message variant='danger'>{error}</Message>
                    : <ListGroup>
                        {
                            ids.map(positionID => (
                                <ListGroup.Item key={positionID} variant="flush">
                                    <Position positionID={positionID} positionProps={singlePositionProps} />
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>)
            }
        </>
    );
}

export default PositionslistComponent;
