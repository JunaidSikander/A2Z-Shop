import React, {useEffect, useState} from "react";
import axios from "axios";
import {PayPalButton} from "react-paypal-button-v2";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {delivereOrder, getOrderDetail, payOrder} from "../redux/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {ORDER_DELIVERED_RESET, ORDER_PAY_RESET} from "../redux/constants/orderConstants";

const OrderScreen = ({match, history}) => {
    const [sdkReady, setSdkReady] = useState(false);

    const orderId = match.params.id;
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const orderDetails = useSelector(state => state.orderDetails);
    const {error, loading, order} = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderPay;

    const orderDelivered = useSelector(state => state.orderDelivered);
    const {loading: loadingDelivered, success: successDelivered} = orderDelivered;

    useEffect(() => {
        if (!userInfo)
            history.push('/login');
        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script);
        };

        if (!order || successPay || successDelivered) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVERED_RESET});
            dispatch(getOrderDetail(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order, successPay, successDelivered]);


    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        };
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    };

    const deliverHandler = () => {
        dispatch(delivereOrder(order))
    };

    return loading ? <Loader/> : error ? <Message variant='danger'> {error} </Message>
        : <>
            <h1>Order {orderId} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name} </p>
                            <p><strong>Email: </strong> <a href={`mailto: ${order.user.email}`}> {order.user.email} </a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city} ,{order.shippingAddress.postalCode} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'> {order.isDelivered} </Message> :
                                <Message variant='danger'> Not Delivered </Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <p>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'> {order.isPaid} </Message> :
                                <Message variant='danger'> Not Paid </Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message>Your cart is Empty</Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {
                                                order.orderItems.map((item, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                            </Col>
                                                            <Col>
                                                                <Link to={`/product/${item.product}`}>
                                                                    {item.name}
                                                                </Link>
                                                            </Col>
                                                            <Col md={4}>
                                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Items </Col>
                                    <Col> ${order.itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Shipping </Col>
                                    <Col> ${order.shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> ${order.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> ${order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}
                                    {!sdkReady ? <Loader/> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDelivered && <Loader/>}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type="button" className="btn btn-block"
                                            onClick={deliverHandler()}>
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
};

export default OrderScreen;