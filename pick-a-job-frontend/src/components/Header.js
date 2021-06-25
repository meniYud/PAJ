import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../api/userApi/actions';


const Header = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const logoutHandler = () => {
        dispatch(logout());
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
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                Cart
                            </Nav.Link>
                        </LinkContainer>
                        {
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
                        }
                        {userInfo && userInfo.isUsersAdmin && (
                            <NavDropdown title='Admin' id='adminMenu'>
                                <LinkContainer to='/admin/userList'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/productList'>
                                    <NavDropdown.Item>Products</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;