import service from "@/utils/request"

/**
 * 获取验证码接口
 */
export function aa(){
    console.log(111)
}
export  function GetSms(data){
    return service.request({
        method: 'post',
        url: '/Orders/confirmOrder',
        data: data
        //data:data,左边的data是变量名（key）是后台接收的，右边的data是接受的参数，如果两者都是同名的情况下，可以写成单一个即可（ES6）
    })
}

/**
 * 获取用户角色
 */

/**
 * 登录https://weitao.veryman.xin/index.php/api/Index/getindex
 */
export function Login(data){
    return service.request({
        method: 'post',
        url: '/login/login',
        data: data
    })
}
/**
* 获取路由
*/

export function getRoute(data){
    return service.request({
        method: 'get',
        url: 'index/index',
        data: data
    })
}
/**
* 订单管理，商品订单
*/

export function productOrder(parme,page){
    let data = Object.assign(parme, page)
    return service.request({
        method: 'post',
        url: 'orders/index',
        data: data
    })
}
/**
* 商品管理，品牌列表
*/

export function goodsBrand(data){
    return service.request({
        method: 'get',
        url: 'goodsbrand/index',
        params: data
    })
}

/**
* 小伙伴管理，小伙伴列表
*/

export function supplierList(data){
    return service.request({
        method: 'post',
        url: 'supplier/index',
        data: data
    })
}