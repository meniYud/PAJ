import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


const Product = ({position}) => {
    const {offeringCompany, positionName, subPositionName, positionDisplayId, positionDescription} = position;
    const {companyName} = offeringCompany;
    return (
        <details>
            <summary>
            <Row>
                <Col>{positionDisplayId}</Col>
                <Col>{positionName}</Col>
                <Col>{subPositionName}</Col>
                <Col>{companyName}</Col>
            </Row>
            </summary>
            <p>{positionDescription}</p>
        </details>
        
    )
}

export default Product;