import React from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../api/userApi/actions';
import {isEmptyObject, isAdminUser, isLoggedIn} from '../utils/functions';


const Header = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const history = useHistory();
    const { userInfo } = userLogin;
    
    const logoutHandler = () => {
        dispatch(logout()).then(() => history.push('/'));
    };

    const getAdminDropdown = () => {
        return (
            <NavDropdown title={userInfo.name} id='userName'>
                <LinkContainer to='/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                {/* <LinkContainer to='/dashboard/agents'>
                    <NavDropdown.Item>Agents List</NavDropdown.Item>
                </LinkContainer> */}
                <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/login'>
                    <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                    </NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>
        );
    }

    const getUserDropdown = () => {
        return (
            <NavDropdown title={userInfo.name} id='userName'>
                <LinkContainer to='/dashboard'>
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/login'>
                    <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                    </NavDropdown.Item>
                </LinkContainer>
            </NavDropdown>
        );
    }

    const nonLoggedInUser = () => {
        return (
            <LinkContainer to='/login'>
                <Nav.Link className='main-cta'>
                    Sign In
                </Nav.Link>
            </LinkContainer>
        );
    }

    const getHeaderDropdown = () => {
        if(isAdminUser(userInfo)){
            return getAdminDropdown();
        } else if(isLoggedIn(userInfo)){
            return getUserDropdown();
        } else {
            return nonLoggedInUser();
        }
    }

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
                        {getHeaderDropdown()}
                        {/* {
                            userInfo ? (
                                <NavDropdown title={userInfo.name} id='userName'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) :
                                <LinkContainer to='/login'>
                                    <Nav.Link className='main-cta'>
                                        Sign In
                                    </Nav.Link>
                                </LinkContainer>
                        } */}
                        {/* {userInfo && userInfo.isUsersAdmin && (
                            <NavDropdown title='Admin' id='adminMenu'>
                                <LinkContainer to='/dashboard/agents'>
                                    <NavDropdown.Item>Agents List</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )} */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;