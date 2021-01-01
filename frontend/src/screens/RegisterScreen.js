import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Button, Col, Form, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {register} from "../redux/actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";


const RegisterScreen = ({history, location}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    useEffect(() => {
        if (userInfo)
            history.push(redirect)
    }, [history, redirect, userInfo]);


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            setMessage('Passwords do not match');
        else
            dispatch(register(name, email, password));
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'> {error} </Message>}
            {message && <Message variant='danger'> {message} </Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name}
                                  onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="confirmPassword" placeholder="Enter confirm Password" value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account ? <Link
                    to={redirect ? `/login/redirect=${redirect}` : '/login'}> Login </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;