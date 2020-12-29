import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from '../constants/productContants'

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loader: true, product: {reviews: []}};
        case PRODUCT_DETAILS_SUCCESS:
            return {loader: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loader: false, error: action.payload};
        default:
            return state;
    }
};
