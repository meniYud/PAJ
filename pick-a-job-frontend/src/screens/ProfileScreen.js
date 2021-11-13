import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Row, Col, Button, Form, Container} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../api/userApi/actions';
import {isNullish} from '../utils/functions';

export default function ProfileScreen({ location, history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [enablePasswordChange, setEnablePasswordChange] = useState(false)
    
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name);
                setEmail(user.email);
            }
            if(success && name === user.name && email === user.email){
                dispatch(getUserDetails('profile'))
                setEnablePasswordChange(false)
                setPassword('')
                setConfirmPassword('')
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault();
        if((password !== confirmPassword) && (enablePasswordChange)) {
            setMessage('Password do not match')
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                ...(enablePasswordChange && {password})
            }))
        }
    };

    const onPasswordSwitchChange = (e) => {
        setEnablePasswordChange(e.currentTarget.checked)
    }

    const shouldEnableUpdateButton = () => {
        const passwordIsOk = (password === confirmPassword) || !enablePasswordChange;
        const emailOk = !isNullish(email)
        const nameOk = !isNullish(name)
        return passwordIsOk && emailOk && nameOk;
    }

    return (
        <Container>
            <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" id="customSwitch1" onClick={onPasswordSwitchChange} checked={enablePasswordChange} />
                        <label class="custom-control-label" for="customSwitch1">Change password</label>
                    </div>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            disabled={!enablePasswordChange}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            disabled={!enablePasswordChange}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                
                    <Button type='submit' variant='primary' disabled={!shouldEnableUpdateButton()}>
                        Update
                    </Button>
                </Form>
            </Col>
            {/* <Col md={9}>
                <h2>My Orders</h2>
            </Col> */}
        </Row>
        </Container>
    )
}
