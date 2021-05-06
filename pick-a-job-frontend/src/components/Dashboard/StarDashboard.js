import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Nav, Col } from 'react-bootstrap';
import PositionList from '../PositionsList'

export default function Stardashboard(props) {
    const { userInfo: { _id, name: starName } } = props;

    useEffect(() => {
        
    }, []);

    const editPositionProps = {
        enableUpdatePosition: false,
        enableDeletePosition: false,
        enablePromotePosition: true,
        showReward: true,
    };

    return (
        <>
            <Row>
                <Col><h3>Star Dashboard</h3></Col>
            </Row>
            <PositionList positionProps={editPositionProps} />
        </>
    );
}
