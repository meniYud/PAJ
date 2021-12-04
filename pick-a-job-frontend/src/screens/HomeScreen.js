import React from 'react'
import { Col, Container, Row, Nav } from 'react-bootstrap'


export default function HomeScreen(props) {
    return (
        <div className='paj-guest-dashboard'>
            <div className='paj-hero'>
                <Container>
                    <Row>
                        <Col sm={12} md={6} className='hero-text pl-0 pr-0'>
                            <h1>The best place to <span>pick a Job</span></h1>
                            <p>
                            Find your next employee.
                            </p>
                            <p>
                            Cut Hiring costs and work with most professional hiring recruiters that will hire Top Talent in Less Time.
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
                                    <mark>pick<span>a</span>job for</mark>Private Users
                                </h2>
                                <p>
                                If You looking for your next challenge, New Jobs go up to pickAJob every day.
                                </p>
                                <a href="" className="paj-card-btn">Sign me up</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='card card-2'>
                                <div className='icon icon-2' />
                                <h2>
                                <mark>pick<span>a</span>job for</mark>Companies
                                </h2>
                                <p>
                                Employers? You can start working with our starts and stop searching!
                                </p>
                                <a href="" className="paj-card-btn">Tell Me How</a>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='card card-3'>
                                <div className='icon icon-3' />
                                <h2>
                                <mark>pick<span>a</span>job for</mark>Stars
                                </h2>
                                <p>
                                A skilled team of recruitment professionals who will understand exactly your company needs
                                </p>
                                <a href="" className="paj-card-btn">Let Me Join</a>
                            </div>
                        </Col>
                    </Row>
                    <Row className="hidden">
                        <Col>
                            <div className='feature-border' />
                        </Col>
                    </Row>
                    <Row className="hidden">
                        <Col sm={12} md={8}>
                            <div className='paj-content'>
                                <h2>
                                About us
                                </h2>
                                <p>
                                In every company there are people like us Stars
Their talent of hiring is expressed in the company itself but can not engage it outside the company.
On the other hand, the changing reality in recruiting employees that high-tech companies face, reaching potential candidates has led us to think about an innovative concept and to develop a tool that enables direct collaboration between companies and stars.
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={4}>
                            <div className='paj-rate-box'>
                                <h3>
                                    130 Openings
                                </h3>
                                <p>
                                    and more are waiting for you to join!
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
                                         About us
                                    </h3>
                                    <p>
                                    In every company there are people like us Stars
Their talent of hiring is expressed in the company itself but can not engage it outside the company.
On the other hand, the changing reality in recruiting employees that high-tech companies face, reaching potential candidates has led us to think about an innovative concept and to develop a tool that enables direct collaboration between companies and stars.
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
