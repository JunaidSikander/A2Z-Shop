import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer
} from "./reducers/productReducers";
import {cartReducer} from "./reducers/cartReducers";
import {
    userDeleteReducer,
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    usersListReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from "./reducers/userReducers";
import {
    orderCreateReducers,
    orderDeliveredReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMyListReducer,
    orderPayReducer
} from "./reducers/orderReducers";


const reducer = combineReducers({
    productCreate: productCreateReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducer,
    orderDelivered: orderDeliveredReducer,
    orderList: orderListReducer,
    orderPay: orderPayReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    usersList: usersListReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    orderMyList: orderMyListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
    ? JSON.parse(localStorage.getItem("paymentMethod"))
    : {};

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));

export default store;
