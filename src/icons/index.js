
import Vue from "vue";
import SvgIcon from "./Svg";
Vue.component('svg-icon', SvgIcon);

/**
 * 
 * 解析svg图片
 * reuqire.context  读取指定目录的所有文件
 * 
 * 第一个：目录
 * 第二个：是否遍历子级目录
 * 第三个定义遍历文件规则
 */
const  req = require.context('./svg', false, /\.svg$/) // 正则里面表示结尾，读取结尾为.svg的文件
const requireAll = requireContext => {
    // console.log(requireContext.keys().map(requireContext))
    return requireContext.keys().map(requireContext)
}
requireAll(req)