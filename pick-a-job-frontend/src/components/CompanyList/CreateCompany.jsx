import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

const CreateCompany = (props) => {
    // New Company Admin Data
    const [userName, setUserName] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [userPassword, setUserPassword] = React.useState('');
    // New Company Data
    const [companyName, setCompanyName] = React.useState('');
    const [cvsEmail, setCvsEmail] = React.useState('');
    const [companyDescription, setCompanyDescription] = React.useState('');

    const onSubmit = (e) => {
        e.stopPropagation();
        if(props.onSubmit){
            props.onSubmit({
                companyData: {companyName, cvsEmail, companyDescription},
                companyAdmin: {email: userEmail, name: userName, password: userPassword}
            });
        }
    }

    const handleClear = (e) => {
        e.stopPropagation()
        setUserName('');
        setUserEmail('');
        setUserPassword('');

        setCompanyName('')
        setCvsEmail('')
        setCompanyDescription('')
    }

    const handleRegret = (e) => {
        e.stopPropagation()
        if(props.onClose){
            props.onClose(e);
        }
    }
    

    return (
        <div className="modal" tabindex="-1" role="dialog" style={{display: 'inherit'}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Company</h5>
                        <button type="button" className="close text-center" data-dismiss="modal" aria-label="Close" onClick={handleRegret}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Container className='justify-content-md-center card-body'>
                            <Form onSubmit={(e) => onSubmit(e)}>
                                <h2>Company Data</h2>
                                <Form.Group control_d='newCompanyName'>
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        id="newCompanyName"
                                        type='text'
                                        placeholder='Enter Company Name'
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group control_d='email'>
                                    <Form.Label>CV Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={cvsEmail}
                                        onChange={(e) => setCvsEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group control_d='companyDescription'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type='textarea'
                                        rows="3"
                                        placeholder='Company Description'
                                        value={companyDescription}
                                        onChange={(e) => setCompanyDescription(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <h2>Company Admin Data</h2>
                                <Form.Group control_d='formPlaintextNewUserEmail'>
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter User Name'
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group control_d='email'>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='Enter email'
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group control_d='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        placeholder='Enter Password'
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                    >
                                    </Form.Control>
                                </Form.Group>
                                
                                <div className='create-position-footer'>
                                    <Button type='submit' variant='primary'>
                                        Create User
                                    </Button>
                                    <Button variant='light' className="pull-right" onClick={(e) => handleClear(e)}>
                                        Clear All
                                    </Button>
                                </div>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany;