import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const {data} = await axios.post('/api/order', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};

export const getOrderDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(`/api/order/${id}`, config);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_PAY_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.put(`/api/order/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};

export const myOrderList = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_MY_LIST_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(`/api/order/myorders`, config);

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.get(`/api/order`, config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};

export const delivereOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DELIVERED_REQUEST});

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        };

        const {data} = await axios.put(`/api/order/${order._id}/delivered`, {}, config);

        dispatch({
            type: ORDER_DELIVERED_SUCCESS,
            payload: data
        })

    } catch (e) {
        dispatch({
            type: ORDER_DELIVERED_FAIL,
            payload: e.response && e.response.data.message ?
                e.response.data.message : e.message
        })
    }
};