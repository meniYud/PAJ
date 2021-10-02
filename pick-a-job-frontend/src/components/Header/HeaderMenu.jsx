import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavDropdown } from 'react-bootstrap';
import {isAdminUser, isLoggedIn} from '../../utils/functions';


const HeaderMenu = ({userLogin, logoutHandler}) => {
    const { userInfo } = userLogin;

    const getAdminDropdown = () => {
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

    return getHeaderDropdown();
}

export default HeaderMenu;