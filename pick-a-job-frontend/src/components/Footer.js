import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

const Footer = (props) => {
    

    return (
        <footer className='paj-footer'>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; Pick-A-Job
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;