import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserDetails, updatedUserProfile} from "../redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {Button, Col, Form, Row} from "react-bootstrap";

const ProfileScreen = ({history, location}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    useEffect(() => {
        if (!userInfo)
            history.push('/login');
        else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, dispatch, userInfo, user]);


    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword)
            setMessage('Passwords do not match');
        else {
            dispatch(updatedUserProfile({id: user._id, name, email, password}))
        }
    };

    return <Row>
        <Col md={3}>
            <h2>user profile</h2>
            {error && <Message variant='danger'> {error} </Message>}
            {message && <Message variant='danger'> {message} </Message>}
            {success && <Message variant='success'> Profile updated </Message>}
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
                    <Form.Control type="password" placeholder="Enter confirm Password" value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
};

export default ProfileScreen;