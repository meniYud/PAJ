import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap';
import Loader from '../../Loader';
import Message from '../../Message';
import { listUsers, registerAgent, deleteUser } from '../../../api/userApi/actions';
import AddUserModal from '../../AddUserModal';

export default function AgentsTab({ history }) {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const deletedUser = useSelector(state => state.deleteUser);
    const [addUser, setAddUser] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState(null)
    const [newUserData, setNewUserData] = React.useState(null);
    const { loading, error, users } = userList;
    const { loading: loadingDeleteUser, error: errorDeleteUser, users: userAfterDeletion } = deletedUser;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const newlyCreatedAgent = useSelector(state => state.newAgent);
    const { agentInfo = null, error: createUserError, loading: createUserLoading } = newlyCreatedAgent;

    if(agentInfo && agentInfo.role && newUserData){
        setNewUserData(null)
    }

    const createUserHandler = (e) => {
        e.stopPropagation()
        setAddUser(!addUser)
    }

    const submitNewUser = ({userName, email, password}) => {
        setAddUser(false)
        setNewUserData({userName, email, password})
    }

    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin && newUserData) {
            dispatch(registerAgent(newUserData));
        } else {
            dispatch(listUsers(true));
        }
    }, [dispatch, history, userInfo, newUserData]);


    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin && !newUserData) {
            dispatch(listUsers(false));
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin && userToDelete && !loadingDeleteUser) {
            dispatch(deleteUser(userToDelete));
        }
    }, [dispatch, history, userInfo, userToDelete]);

    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin && deletedUser) {
            if(errorDeleteUser){
                setUserToDelete(null);
                dispatch(listUsers(false));
            }
            if(userAfterDeletion && userAfterDeletion.length){
                setUserToDelete(null);
                dispatch(listUsers(false));
            }
        }
    }, [dispatch, history, userInfo, userAfterDeletion, errorDeleteUser]);

    const deleteHandler = (id) => {
        setUserToDelete(id)
        console.log(id);
    };

    return addUser ? <AddUserModal onSubmit={submitNewUser} onClose={createUserHandler} /> : (
        <>
            <h1>Users</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {<div onClick={(e) => createUserHandler(e)} className='add-job'>
                <i className="fas fa-plus-circle mr-2"></i>
                <span>Add Company Agent</span>
            </div>}
            {users && (
                <Table stripped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto: ${user.email}`}>{user.email}</a></td>
                                <td>{user.admin ? (
                                    <i className='fas fa-check' style={{ color: 'green' }} />
                                ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }} />
                                    )}</td>
                                <td>
                                    {/* <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer> */}
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
