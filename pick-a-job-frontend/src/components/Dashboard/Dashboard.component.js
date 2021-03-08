import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { userRoles } from '../../api/userApi/consts'
import Loader from '../Loader';
import Message from '../Message';
import AgentDashboard from './AgentDashboard'
import StarDashboard from './StarDashboard'
import GuestDashboard from './GuestDashboard'
import PAJDashboard from './PAJDashboard'


export default function DashboardComponent(props) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo, loading, error } = userLogin;

    const roleName = userInfo?.role || userRoles.GUEST;
    let Dashboard = null;

    switch(roleName) {
        case userRoles.STAR:
            Dashboard = StarDashboard;
            break;
        case userRoles.SUPERSTAR:
            Dashboard = StarDashboard;
            break;
        case userRoles.COMPANYAGENT:
            Dashboard = AgentDashboard;
            break;
        case userRoles.COMPANYADMIN:
            Dashboard = AgentDashboard;
            break;
        case userRoles.PAJ:
            Dashboard = PAJDashboard;
            break;
        case userRoles.PAJADMIN:
            Dashboard = PAJDashboard;
            break;
        case userRoles.GUEST:
        default:
            Dashboard = GuestDashboard;
    };

    return (
        <>
            {loading
                ? <Loader />
                : (error
                    ? <Message variant='danger'>{error}</Message>
                    : <Dashboard userInfo={userInfo} />)
            }
            
        </>
    )
}
