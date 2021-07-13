import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Nav, Col, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
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
                        <Col>
                            <h3>Agent Dashboard</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='sub-header'>
                <Container>
                <Row>
                    <Col sm={3}>
                        <div onClick={(e) => onCreatePosition(e)} className='add-job'>
                            <i className="fas fa-plus-circle mr-2"></i>
                            <span>Add Position</span>
                        </div>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="Link"  size="lg">
                                    <i className="fas fa-search fa-2x mr-2"></i>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                    <Col sm={2}>
                        <div className='filter'>
                            <i className="fas fa-filter mr-2"></i>
                            Filter a job
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
            <Container>
                <Row>
                    <Col xs={3}>
                        <div className='paj-company-pane'>
                            <h3>company Panel</h3>
                            <div className='company-img'>
                                <img src='data:image/png;base64,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' />
                            </div>
                        </div>
                    </Col>
                    <Col sm={9}>
                        <div className='list'>
                            {addingPosition && <CreatePosition {...createPositionProps} />}
                            <PositionList company={company} positionProps={editPositionProps} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AgentDashboard;
