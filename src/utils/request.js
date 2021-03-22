import axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from "@/utils/app";

//创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/api";
const service = axios.create({
    baseURL: BASEURL,//域名地址
    timeout: 15000, //超时
});
/**
 * 请求接口前，做一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //配合后台在请求头传一下需要的参数

    // console.log(config.headers)
    if(getToken()){
        config.headers.Token = getToken()
    }
    //在请求头添加参数
    
    // config.headers.userId = "22222"
    // config.headers.uid = "333"
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口，返回数据进行拦截（响应拦截）
 */
// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;

    //判断请求接口返回是否成功
    if(data.code != 0){ 
        //请求返回的错误字段
       Message.error(data.msg);
       return Promise.reject(data);
    }else{
        return response;
    }
    
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;

/**
 * 使用export default时，但不能同时存在多个default
 * 文件 import 不需要花括号
 */