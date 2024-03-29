import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Form} from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../api/userApi/actions';

export default function LoginScreen({ location, history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const redirect = location.search ? location.search.split('=')[1] : '/dashboard';
    
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({email, password}));
    };

    return (
        <div className='paj-page-header'>
            <Container fluid>
                <Container>
                    <Row className='justify-content-center'>
                        <h1>Sign In</h1>
                    </Row>
                </Container>
                
                {loading ? <Loader /> :
                    (
                        <FormContainer>
                            {error && <Message variant='danger'>{error}</Message>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group control_d='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                    </Form.Group>
                                <Form.Group control_d='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                    
                                <Button type='submit' variant='primary'>
                                    Sign In
                                </Button>
                            </Form>
                    
                            <Row className='py-3'>
                            {/* <Col>
                                New Customer? 
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                                    Register
                                </Link>
                            </Col> */}
                        </Row>
                        </FormContainer>
                    )
                }
            </Container>
        </div>
    )
}
