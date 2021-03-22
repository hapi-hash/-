
const adminToken = "admin_token";
const usernamekey = "username";
//取token
export function getToken(){
    return sessionStorage.getItem(adminToken);
}
//存token
export function setToken(token){
    return sessionStorage.setItem(adminToken,token)
}
//删除token
export function removeToken(){
    return sessionStorage.removeItem(adminToken);
}

//如果有用户信息
export function removeAll(){
    return sessionStorage.clear();
}
//存用户名字
export function setUsername(value){
    return sessionStorage.setItem(usernamekey,value)
}

//取用户名字
export function getUsername(){
    return sessionStorage.getItem(usernamekey)
}
//删除用户名字
export function removeUsername(){
    return sessionStorage.removeItem(usernamekey);
}