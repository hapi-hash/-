import service from "@/utils/request"

/**
 * 获取验证码接口
 */
// export  function GetSms(data){
//     return service.request({
//         method: 'post',
//         url: 'sys/login',
//         data
//         //data:data,左边的data是变量名（key）是后台接收的，右边的data是接受的参数，如果两者都是同名的情况下，可以写成单一个即可（ES6）
//     })
// }

/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data){
    return service.request({
        method: 'post',
        url: 'sys/login',
        data: data
    })
}
/**
* 注册
*/