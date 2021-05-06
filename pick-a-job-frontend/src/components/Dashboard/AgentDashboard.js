import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Nav, Col } from 'react-bootstrap';
import PositionList, { CreatePosition } from '../PositionsList'


const AgentDashboard = (props) => {
    const { userInfo: { name: agentName, relatedEntities: { company } } } = props;
    const [addingPosition, setAddingPosition] = useState(false);

    useEffect(() => {
        
    }, []);

    const onCreatePosition = (e) => {
        e.stopPropagation()
        if (!addingPosition) {
            setAddingPosition(true);
        }
    }

    const removeCreatePosition = () => {
        if (addingPosition) {
            setAddingPosition(false);
        }
    }

    const createPositionProps = {
        agentName: agentName,
        company: company,
        removeCreatePosition,
    };

    const editPositionProps = {
        enableUpdatePosition: true,
        enableDeletePosition: true,
        enablePromotePosition: false,
        showReward: true,
        company: company,
        agentName: agentName,
    };

    return (
        <>
            <Row>
                <Col><h3>Agent Dashboard</h3></Col>
                <Col md={{ span: 4, offset: 4 }}>
                    <div onClick={(e) => onCreatePosition(e)}>
                        <i className="fas fa-plus-circle fa-3x"></i>
                    </div>
                </Col>
            </Row>
            {addingPosition && <CreatePosition {...createPositionProps} />}
            <PositionList company={company} positionProps={editPositionProps} />
        </>
    );
}

export default AgentDashboard;
