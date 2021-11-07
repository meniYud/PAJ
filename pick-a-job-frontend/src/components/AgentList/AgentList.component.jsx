import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import ConfirmModal from '../../screens/ConfirmModal';
import { listUsers, registerAgent, deleteUser } from '../../api/userApi/actions';
import CreateAgent from './CreateAgent';
import {isAdminUser} from '../../utils/functions';

export default function AgentList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userList = useSelector(state => state.userList);
    const deletedUser = useSelector(state => state.deleteUser);
    const [addUser, setAddUser] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState(null)
    const [newUserData, setNewUserData] = React.useState(null);
    const [attentionModal, setAttentionModal] = React.useState(false);
    const { loading, error, users } = userList;
    const { loading: loadingDeleteUser, error: errorDeleteUser, users: userAfterDeletion } = deletedUser;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const loggedInUserIsAdmin = isAdminUser(userInfo);

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
        if (userInfo && loggedInUserIsAdmin && newUserData) {
            dispatch(registerAgent(newUserData));
        } else {
            dispatch(listUsers(true));
        }
    }, [dispatch, history, userInfo, newUserData]);


    useEffect(() => {
        if (userInfo && loggedInUserIsAdmin && !newUserData) {
            dispatch(listUsers(false));
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    useEffect(() => {
        if (userInfo && loggedInUserIsAdmin && userToDelete && !loadingDeleteUser) {
            dispatch(deleteUser(userToDelete));
        }
    }, [dispatch, history, userInfo, userToDelete]);

    useEffect(() => {
        if (userInfo && loggedInUserIsAdmin && deletedUser) {
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

    const onCancellDeletion = () => setAttentionModal(false)

    const deleteHandler = (id) => {
        setUserToDelete(id)
        setAttentionModal(false)
    };

    return (
        <div className="paj-add-user-wrapper">
            <Container>
            {createUserError && <Message variant='danger'>{createUserError}</Message>}
                {addUser && <CreateAgent onSubmit={submitNewUser} onClose={createUserHandler} />}
                <Row>
                    <Col>
                        <h1>Agents</h1>
                    </Col>
                    <Col md={4}>
                        {loggedInUserIsAdmin && <div onClick={(e) => createUserHandler(e)} className='add-job'>
                            <i className="fas fa-plus-circle mr-2"></i>
                            <span>Add Company Agent</span>
                        </div>}
                    </Col>
                </Row>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                
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
                                    <td>{user.isCompAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }} />
                                    ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }} />
                                        )}</td>
                                    <td>
                                        {<Button variant='danger' className='btn-sm' disabled={user.isCompAdmin || !loggedInUserIsAdmin} onClick={() => setAttentionModal(user._id)}>
                                            <i className='fas fa-trash' />
                                        </Button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                { attentionModal &&
                    <ConfirmModal onConfirm={deleteHandler} onDecline={onCancellDeletion} dataToPass={attentionModal} message={"You are about to delete an agent. Are you sure?"} />
                }
            </Container>
        </div>
    )
}
