import {
    SET_LOGIN_BEGIN,
    SET_LOGIN_SUCCESS,
    SET_LOGIN_FAIL,
    SET_LOGOUT_SUCCESS,
    SET_LOGOUT_FAIL
} from './constants'

const setLoginBegin = payload =>({
    type: SET_LOGIN_BEGIN,
    payload
})

const setLoginSuccess = payload =>({
    type: SET_LOGIN_SUCCESS,
    payload
})
 
const setLoginFail = payload =>({
    type: SET_LOGIN_FAIL,
    payload
})

const setLogOutSuccess = payload =>({
    type: SET_LOGOUT_SUCCESS,
    payload
})

const setLogoutFail = () =>({
    type:SET_LOGIN_FAIL
})

export {
    setLoginBegin,
    setLoginSuccess,
    setLoginFail,
    setLogOutSuccess,
    setLogoutFail
}