import React, { useReducer } from 'react';
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";


import { USER_LOADED, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, WALLET_ERROR, WALLET_SUCCESS, LOGOUT, CLEAR_ERRORS } from '../types';


const setHeaderToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

function AuthState(props) {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null,
        wallet: null,
        walletLoading: true,
        authLoading: false
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const loadUser = async () => {
        if (localStorage.token) {
            setHeaderToken(localStorage.token)
        }

        axios.get('https://crypto-fin.herokuapp.com/api/auth/users/me/')
            .then(res => {
                dispatch({ type: USER_LOADED, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: AUTH_ERROR, payload: err.response.data })
            })
    }

    const register = async (formData) => {

        return axios.post('https://crypto-fin.herokuapp.com/api/auth/users/', formData)
            .then((res) => {
                dispatch({ type: REGISTER_SUCCESS, payload: res.data })
                return "success"
            })
            .catch((err) => {
                dispatch({ type: REGISTER_FAIL, payload: err.response.data })
                return "error"
            });
    }

    const login = async (formData) => {
        setHeaderToken(null)

        return axios.post("https://crypto-fin.herokuapp.com/api/auth/token/login", formData)
            .then((res) => {
                dispatch({ type: LOGIN_SUCCESS, payload: res.data });
                return "success"
                // loadUser();
            })
            .catch((err) => {
                dispatch({ type: LOGIN_FAIL, payload: err.response.data });
                return "error"
            });
    };

    const getWallet = async (userid) => {

        axios.get(`https://crypto-fin.herokuapp.com/api/wallet/?user=${userid}`)
            .then(res => {
                dispatch({ type: WALLET_SUCCESS, payload: res.data })
            })
            .catch(err => {
                dispatch({ type: WALLET_ERROR, payload: err.response.data })
            })
    }

    const logout = async () => {
        if (localStorage.token) {
            setHeaderToken(localStorage.token)
        }
        axios.post('https://crypto-fin.herokuapp.com/api/auth/token/logout', localStorage.token)
            .then(res => {
                dispatch({ type: LOGOUT });
                localStorage.setItem('token', null)
            })
    };

    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (
        <AuthContext.Provider value={{ ...state, loadUser, register, login, getWallet, logout, clearErrors }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;