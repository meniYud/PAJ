import React, { useState } from 'react';
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap';

export default function CreatePosition(props) {
    const {
        company = {},
        agentName = '',
        removeCreatePosition,
        initialData = {},
        handleSubmit = () => {},
        title = 'Create New Position' } = props;
    
    const [displayID, setDisplayID] = useState(initialData?.displayID || '');
    const [positionName, setPositionName] = useState(initialData?.positionName || '');
    const [subPositionName, setSubPositionName] = useState(initialData?.subPositionName || '');
    const [positionDescription, setPositionDescription] = useState(initialData?.positionDescription || '');
    const [positionLocation, setPositionLocation] = useState(initialData?.positionLocation || '');
    const [requiredExperience, setRequiredExperience] = useState(initialData?.requiredExperience || '');
    const [offeredReward, setOfferedReward] = useState(initialData?.offeredReward || 0);

    const onSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const payload = {
            displayID,
            positionName,
            subPositionName,
            positionDescription,
            positionLocation,
            requiredExperience,
            offeredReward
        };
        handleSubmit(payload);
        console.log('submitted');
        removeCreatePosition();
    }

    const handleClear = (e) => {
        e.stopPropagation();
        console.log('cleared');
    }


    return (
        <div className='createJob'>
            <Card>
                <Card.Header className="text-center">
                    <span>{title}</span>
                    <button type="button" class="close text-center" data-dismiss="modal" aria-label="Close" onClick={removeCreatePosition}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </Card.Header>
                <Container className='justify-content-md-center card-body'>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <Form.Group as={Row} controlId="formPlaintextCompany">
                            <Form.Label column sm="3">
                                Company Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control plaintext readOnly defaultValue={company.companyName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextAgent">
                            <Form.Label column sm="3">
                                Agent Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control plaintext readOnly defaultValue={agentName} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextDisplayID">
                            <Form.Label column sm="3">
                                Display ID
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" defaultValue={displayID} onChange={(e) => {setDisplayID(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextPositionName">
                            <Form.Label column sm="3">
                                Position Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" defaultValue={positionName} onChange={(e) => {setPositionName(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextSubPositionName">
                            <Form.Label column sm="3">
                                Sub Position Name
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" defaultValue={subPositionName} onChange={(e) => {setSubPositionName(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextPositionDescription">
                            <Form.Label column sm="3">
                                Position Description
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control as="textarea" rows={3} defaultValue={positionDescription} onChange={(e) => {setPositionDescription(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextPositionLocation">
                            <Form.Label column sm="3">
                                Position Location
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" defaultValue={positionLocation} onChange={(e) => {setPositionLocation(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextRequiredExperience">
                            <Form.Label column sm="3">
                                Required Experience
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" defaultValue={requiredExperience} onChange={(e) => {setRequiredExperience(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formtextOfferedReward">
                            <Form.Label column sm="3">
                                Offered Reward (NIS)
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" defaultValue={offeredReward} onChange={(e) => {setOfferedReward(e?.target?.value)}} />
                            </Col>
                        </Form.Group>
                        <div className='create-position-footer'>
                            <Button type='submit' variant='primary'>
                                Submit Position
                            </Button>
                            <Button variant='light' className="pull-right" onClick={(e) => handleClear(e)}>
                                Clear All
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Card>
        </div>
    )
}
