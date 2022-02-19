/* eslint-disable import/no-anonymous-default-export */

import { USER_LOADED, AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, WALLET_SUCCESS, WALLET_ERROR, LOGOUT, CLEAR_ERRORS } from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                error: null
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.auth_token);
            return {
                ...state,
                token: action.payload.auth_token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case WALLET_SUCCESS:
            return {
                ...state,
                wallet: action.payload,
                walletLoading: false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case WALLET_ERROR:
            return {
                ...state,
                error: action.payload,
                walletLoading: false
            }
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}