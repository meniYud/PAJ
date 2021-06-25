import React from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'
export default function Guestdashboard(props) {
    

    return (
        <div className='paj-guest-dashboard'>
            <div className='paj-hero'>
                <Container>
                    <Row>
                        <Col sm={12} md={6} className='hero-text pl-0 pr-0'>
                            <h1>The best place to <span>pick a Job</span></h1>
                            <p>
                                here will be secondary setxt about the company.
                            </p>
                            <p>
                                this will a text that will explin what we are all about
                            </p>
                            <p>
                                <Nav.Link className='main-cta'>
                                    Sign up for a Demo
                                </Nav.Link>
                            </p>
                        </Col>
                        <Col sm={12} md={6} className='pl-0 pr-0'>
                            <div className='hero-img'>
                                <div className='img1 vertical-move'></div>
                                <div className='img2 horizontal-move'></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container fluid className='paj-data'>
                <Container >
                    <Row className='paj-cards'>
                        <Col sm={12} md={4}>
                            <div className='card card-1'>
                                <div className='icon icon-1' />
                                <h2>
                                    Private Users
                                </h2>
                                <p>
                                Lorem ipsum dolor sit amet, consecte adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua dui.
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='card card-2'>
                                <div className='icon icon-2' />
                                <h2>
                                    Companies
                                </h2>
                                <p>
                                Lorem ipsum dolor sit amet, consecte adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua dui.
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='card card-3'>
                                <div className='icon icon-3' />
                                <h2>
                                    Stars
                                </h2>
                                <p>
                                Lorem ipsum dolor sit amet, consecte adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua dui.
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='feature-border' />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={8}>
                            <div className='paj-content'>
                                <h2>
                                    Trusted by 25,000+ happy customers.
                                </h2>
                                <p>
                                    With lots of unique blocks, you can easily build
                                    a page without coding. Build your next website
                                    within few minutes.
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='paj-rate-box'>
                                <h3>
                                    25k
                                </h3>
                                <p>
                                    Active users visiting
                                    us every month!
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='paj-section paj-section-1 mt-5'>
                    <Container>
                        <Row>
                            <Col sm={12} md={5}>
                                <div className='paj-info' />
                            </Col>
                            <Col sm={12} md={7}>
                                <div className='paj-info-text'>
                                    <h3>
                                        Some headline about the compeny
                                    </h3>
                                    <p>
                                    We designed and tested prototypes that helped identify pain points in the account creation process. Together, we shaped the new standard.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        </div>
        
    )
}
