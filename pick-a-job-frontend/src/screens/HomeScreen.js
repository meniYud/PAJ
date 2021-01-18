import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../api/productApi/actions'
import Product from '../components/Product';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products = [] } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            <h1>latest products</h1>
            {loading
                ? <h1>LOADING....</h1>
                : (error
                    ? <h3>{error}</h3>
                    : <Row>
                        {
                            products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4}>
                                    <Product product={product} />
                                </Col>
                            ))
                        }
                    </Row>)
            }
        </>
    );
}

export default HomeScreen;