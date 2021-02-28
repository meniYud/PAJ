import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { listPositions } from '../api/positionApi/actions'
import Position from '../components/Position';
import Loader from '../components/Loader';
import Message from '../components/Message';


const DashboardScreen = () => {
    const dispatch = useDispatch();
    const positionsList = useSelector(state => state.positionList);
    const { loading, error, positions = [] } = positionsList;

    useEffect(() => {
        dispatch(listPositions());
    }, [dispatch]);

    return (
        <>
            <h1>All Positions</h1>
            {loading
                ? <Loader />
                : (error
                    ? <Message variant='danger'>{error}</Message>
                    : <ListGroup>
                        {
                            positions.map(position => (
                                <ListGroup.Item key={position._id}>
                                    <Position position={position} />
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>)
            }
        </>
    );
}

export default DashboardScreen;