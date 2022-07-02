import Constants from "./Constants";

export default {
    REGISTER_USER: Constants.BASE_API_URL + 'customers',
    LOGIN_USER: Constants.BASE_API_URL + 'auth',
    RETRIVE_CUSTOMER: Constants.BASE_API_URL + 'customers/me',
    RETRIVE_CUSTOMER_ORDER: Constants.BASE_API_URL + 'customers/me/orders',
    RETRIVE_CUSTOMER_ADDRESS: Constants.BASE_API_URL + 'customers/me/addresses',
    RETRIVE_CUSTOMER_PAYMENT_METHODS: Constants.BASE_API_URL + '/customers/me/payment-methods',
    ADD_ADDRESS_CUSTOMER: Constants.BASE_API_URL + '/customers/me/addresses'
}