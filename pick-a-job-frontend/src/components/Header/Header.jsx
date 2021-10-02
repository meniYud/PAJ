import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from '../../api/userApi/actions';
import HeaderMenu from './HeaderMenu';


const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const history = useHistory();

    const logoutHandler = () => {
        dispatch(logout()).then(() => history.push('/'));
    };

    return (
        // eslint-disable-next-line
        <Navbar className='paj-nav' bg="dark" variant='tran' sticky="top" bg='red' expand="lg">
            <Container fluid className='pr-0 pl-0'>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <div className='paj-logo'>
                            Pick a Job
                        </div>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <HeaderMenu userLogin={userLogin} logoutHandler={logoutHandler} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;