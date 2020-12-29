import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Image, ListGroup, Row} from 'react-bootstrap'
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from '../redux/actions/productActions'
import Message from "../components/Message";
import Loader from "../components/Loader";

const ProductScreen = ({match}) => {
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const {loader, error, product} = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match]);
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>GO Bach</Link>
            {
                loader ? <Loader/>
                    : error ? <Message variant='danger'> {error} </Message>
                    : <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Price:
                                        </Col>
                                        <Col>
                                            <strong>
                                                ${product.price}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Status:
                                        </Col>
                                        <Col>
                                            <strong>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block'
                                            type='button'
                                            disabled={product.countInStock === 0}>
                                        Add to Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
            }
        </>
    )
};

export default ProductScreen;
