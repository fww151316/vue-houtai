import Cookies from 'js-cookie'
const TokenKey = 'token'

// 用于登录时存用户的Token
export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function getToken() {  //取token
    return Cookies.get(TokenKey)
}

// 用于登录时删除用户的Token
export function removeToken() {
    return Cookies.remove(TokenKey)
}

// 收藏书时存书id
export function setToken2(name,id) {
    return Cookies.set(name, id)
}

export function getToken2(name) {  //取token
    return Cookies.get(name)
}

export function removeToken2(name) {
    return Cookies.remove(name)
}


