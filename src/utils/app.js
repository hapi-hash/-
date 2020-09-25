import cookie from "cookie_js";

const adminToken = "admin_token";
const usernamekey = "username";
//取token
export function getToken(){
    return cookie.get(adminToken);
}
//存token
export function setToken(token){
    return cookie.set(adminToken,token)
}
//删除token
export function removeToken(){
    return cookie.remove(adminToken);
}

//如果有用户信息

//存用户名字
export function setUsername(value){
    return cookie.set(usernamekey,value)
}

//取用户名字
export function getUsername(){
    return cookie.get(usernamekey)
}
//删除用户名字
export function removeUsername(){
    return cookie.remove(usernamekey);
}