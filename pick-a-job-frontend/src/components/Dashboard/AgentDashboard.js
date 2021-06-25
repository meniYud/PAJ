import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Nav, Col, Container } from 'react-bootstrap';
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
        <div className='paj-agent-dashboard'>
            <div className='header'>
                <Container>
                    <Row>
                        <Col xs={10} md={10}>
                            <h3>Agent Dashboard</h3>
                        </Col>
                        <Col xs={2} md={2}>
                            <div onClick={(e) => onCreatePosition(e)} className='add-job'>
                                <i className="fas fa-plus-circle fa-3x"></i>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className='list'>
                    {addingPosition && <CreatePosition {...createPositionProps} />}
                    <PositionList company={company} positionProps={editPositionProps} />
                </div>
            </Container>
        </div>
    );
}

export default AgentDashboard;
