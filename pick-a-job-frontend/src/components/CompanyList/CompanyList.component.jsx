import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container, Col, Row } from 'react-bootstrap';
import Loader from '../Loader';
import Message from '../Message';
import { listAllCompanies, addNewCompany } from '../../api/companyApi/actions';
import CreateCompany from './CreateCompany';

export default function CompanyList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const companyList = useSelector(state => state.company);
    // const deletedUser = useSelector(state => state.deleteUser);
    const [addCompany, setAddCompany] = React.useState(false);
    const [compAdminData, setCompAdminData] = React.useState(null)
    const [newCompanyData, setNewCompanyData] = React.useState(null);
    
    const { loading, error, companies: comps, recentlyAdded } = companyList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;


    const createCompanyHandler = (e) => {
        e.stopPropagation()
        setAddCompany(!addCompany)
    }

    const submitNewCompany = ({companyAdmin, companyData}) => {
        setAddCompany(false)
        setNewCompanyData({companyAdmin, companyData})
    }

    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin && newCompanyData) {
            dispatch(addNewCompany(newCompanyData));
        } else {
            dispatch(listAllCompanies());
        }
    }, [newCompanyData]);


    useEffect(() => {
        if (userInfo && userInfo.isUsersAdmin &&!newCompanyData) {
            dispatch(listAllCompanies());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);


    return (
        <div className="paj-companies-wrapper">
            <Container>
                {addCompany && <CreateCompany onSubmit={submitNewCompany} onClose={createCompanyHandler} />}
                <Row>
                    <Col>
                      <h1>Companies</h1>
                    </Col>
                    <Col md={4}>
                        {<div onClick={(e) => createCompanyHandler(e)} className='add-job'>
                            <i className="fas fa-plus-circle mr-2"></i>
                            <span>Add New Company</span>
                        </div>}
                    </Col>
                </Row>
                {loading && <Loader />}
                {error && <Message variant='danger'>{error}</Message>}
                
                {comps && (
                    <Table stripped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>CV EMAIL</th>
                                <th>DESCRIPTION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {comps.map(comp => (
                                <tr key={comp._id}>
                                    {/* <td>{user._id}</td> */}
                                    <td>{comp.companyName}</td>
                                    <td>{comp.cvsEmail}</td>
                                    <td>{comp.companyDescription}</td>
                                    <td>{userInfo.admin ? (
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
                                        {/* <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash' />
                                        </Button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </div>
    )
}
