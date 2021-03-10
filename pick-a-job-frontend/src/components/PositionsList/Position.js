import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';
import {updatePositionByPositionID, deletePositionByID, promotePositionByID} from '../../api/positionApi/actions';
import Loader from '../Loader';
import {CreatePosition} from './';

const Position = ({positionID, positionProps}) => {

    const dispatch = useDispatch();
    const position = useSelector(state => state?.positionList?.positionsData?.positions[positionID]);

    const {enableUpdatePosition, enableDeletePosition, showReward, enablePromotePosition, agentName, company, reloadData} = positionProps;
    const [showFullData, setShowFullData] = useState(false);
    const [editPosition, setEditPosition] = useState(false);
    const [loadingPosition, setLoadingPosition] = useState(false);
    const [updatedPosition, setUpdatedPosition] = useState(position.data || {});

    const {positionName, subPositionName, positionDisplayId, positionDescription, positionLocation, requiredExperience, offeredReward , _id, offeringCompany} = updatedPosition;

    useEffect(() => {
        if(position?.loading && !loadingPosition) {
            setLoadingPosition(true);
            setShowFullData(true);
        }
        if(position && !position.loading && position.data && loadingPosition) {
            setLoadingPosition(false);
            setUpdatedPosition(position.data);
        }
    }, [dispatch, position, loadingPosition])

    const expandPosition = () => {
        setShowFullData(!showFullData);
    }

    const onUpdatePosition = (e) => {
        e.stopPropagation();
        setEditPosition(true);
    };
    
    const onPromotePosition = (e) => {
        e.stopPropagation();
    };

    const handleSubmitUpdatedPosition = async (payload) => {
        await dispatch(updatePositionByPositionID(_id, payload));
    }

    const handleSubmitDeletedPosition = async (e) => {
        e.stopPropagation();
        await dispatch(deletePositionByID(_id, updatedPosition));
        reloadData();
    }
    
    const handleSubmitPromotePosition = async (e) => {
        e.stopPropagation();
        await dispatch(promotePositionByID(_id));
        reloadData();
    }

    const editPositionProps = {
        initialData: {
            positionDisplayId: positionDisplayId,
            positionName: positionName,
            subPositionName: subPositionName,
            positionDescription: positionDescription,
            positionLocation: positionLocation,
            requiredExperience: requiredExperience,
            offeredReward: offeredReward
        },
        company,
        agentName,
        agentID: _id,
        title: 'update position',
        removeCreatePosition: () => setEditPosition(false),
        handleSubmit: (payload) => handleSubmitUpdatedPosition(payload),
    };

    const positionActions = (
        <>
            {enableUpdatePosition && (<i className="far fa-edit" onClick={onUpdatePosition}></i>)}
            {enableDeletePosition && (<i className="far fa-trash-alt" onClick={handleSubmitDeletedPosition}></i>)}
            {enablePromotePosition && (<i className="fas fa-ad" onClick={onPromotePosition}></i>)}
        </>
    );

    const VisiblePart = (
        <Card border="primary" onClick={expandPosition}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Title>{positionName}</Card.Title>
                    </Col>
                    <Col>
                        {positionActions}
                    </Col>
                </Row>
                <Card.Subtitle className="mb-2 text-muted">{offeringCompany.companyName}</Card.Subtitle>
                <Card.Text>{subPositionName}</Card.Text>
            </Card.Body>
        </Card>
    );
    const HiddenPart = loadingPosition ? <Loader /> : (
        <Card>
            <Row className="p-3">
                <Col>{`Position ID: ${positionDisplayId}`}</Col>
                <Col>{`Location: ${positionLocation}`}</Col>
            </Row>
            <Card.Body>
                <Card.Text mt={'50px'}>{positionDescription}</Card.Text>
                <Row className="p-3">
                    <Col>{requiredExperience}</Col>
                    <Col>{showReward && offeredReward}</Col>
                </Row>
            </Card.Body>
        </Card>
    );

    return editPosition ? (
        <CreatePosition {...editPositionProps} />
    ) : (
        <>
            {VisiblePart}
            {showFullData && HiddenPart}
        </>
    )
}

export default Position;