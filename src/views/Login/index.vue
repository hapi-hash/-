<template>
    <div id="login">
        <div class="login-wrap">
            <ul class="menu-tab">
                <li :class="{'current': item.current }" v-for="(item, index) in menuTab" :key="item.id" @click="toggleMenu(item,'ruleForm')">{{ item.txt }}</li>
            </ul>
            <!-- 表单 -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
                <el-form-item prop="username">
                    <label>账号</label>
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                
                <el-form-item prop="password">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="4" maxlength="20"></el-input>
                </el-form-item>

                <!-- <el-form-item prop="passwords" v-show="model === 'register'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <el-form-item prop="code">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
                        </el-col>
                    </el-row>
                    
                </el-form-item> -->

                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import sha1 from 'js-sha1';
import { Login } from "@/api/login";
import { stripscript, validateEmail, validatePass, validateVcode } from '@/utils/validate';
export default {   
    name:'login',
    data(){
      //用户名验证
      var validateUsername = (rule, value, callback) => {
         
        if (value === '') {
          callback(new Error('请输入账号'));
        }else {
          callback();
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => { 
        // 过滤特殊字符
        // console.log(stripscript(value))
        // this.ruleForm.password = stripscript(value);
        value = this.ruleForm.password
        //密码正则
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      //验证重复密码
      var validatePasswords = (rule, value, callback) => { 
        if(this.model === 'login'){
            callback();
        }
        // 过滤特殊字符
        // console.log(stripscript(value))
        this.ruleForm.passwords = stripscript(value);
        value = this.ruleForm.passwords
        //密码正则
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.ruleForm.password) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      };
      //验证验证码
      var checkCode = (rule, value, callback) => {
            
          if (value === "") {
                return callback(new Error('请输入验证码'));
          } else if(validateVcode(value)){
                return callback(new Error("验证码格式有误"))
          } else{
                callback();
          }
            
      };

        return {
            menuTab: [
                { txt: '登录', current: true, type: 'login' }
            ],
            model: 'login',
            ruleForm: {
                username: 'admin',
                password: '123456',
                passwords: '',
                code: ''
            },
            //验证码按钮状态
            codeButtonStatus: {
                status : false,
                text: "获取验证码"
            },
            //倒计时时间
            timer:'',
            
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
                passwords: [
                    { validator: validatePasswords, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        
    },
    //挂载完成后自动执行
    mounted(){
        
    },
    methods: {
        toggleMenu(data,ruleForm){
            this.menuTab.forEach(elem => {
                elem.current = false
            })
            data.current = true
            this.model = data.type
            this.$refs[ruleForm].resetFields();
            this.clearcountDown()
            // console.log(this.$refs)
            
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                // if (valid) {  原有判断，判断输入信息格式
                    let requestData = {
                        amount: this.ruleForm.username,
                        password: this.ruleForm.password,
                        
                    }
                    /**
                     *通过vuex 登录接口调用
                     */
                    // console.log(requestData)
                    this.$store.dispatch('app/login', requestData).then((routes) => {
                        console.log(routes)
                        // 登录成功跳转的地址
                        this.$router.push({
                            name:'Components'
                        })
                    }).catch((error) => {
                        console.log(error)
                        // this.$router.push({
                        //     name:'Components'
                        // })
                    })
                    // this.$router.push({
                    //     name:'Console'
                    // })
                    
                    
                    // if(data.username == "admin" && data.password == "admin" && data.code == "123456"){
                    //     this.$message({
                    //         message:"登录成功",
                    //         type: "success"
                    //     })
                    //     //页面跳转
                    //     this.$router.push({
                    //         name:'Console'
                    //     })
                    // }else{
                    //     this.$message.error("信息有误")
                    // }
                    // alert('submit!');
                // } else {
                //     console.log('error submit!!');
                //     return false;
                // }
            });
        },
        
        /**
         * 倒计时
         */
        countDown(number){ 
            let time = number;
            console.log(time)
           this.timer = setInterval(() => {
                time--
                if(time == 0){
                    clearInterval(this.timer)
                    this.codeButtonStatus.status = false;
                    this.codeButtonStatus.text = "重新发送"
                }else{
                    this.codeButtonStatus.text = `倒计时${time}秒`
                }
                
            },1000)
        },
        //清楚倒计时
        clearcountDown(){
            this.codeButtonStatus.status = false
            this.codeButtonStatus.text = "获取验证码"
            
            clearInterval(this.timer)
        }
    }
}
</script>
<style lang="scss" scoped>
#login{
    height:100vh;
    background:#344a5f;
}
.login-wrap{
    width:330px;
    margin:auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width:88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top:24px;
    label{
        display: block;
        font-size: 14px;
        color: #fff;
        font-weight: normal;
    }
    .block{
        display: block;
        width:100%;
    }
    .login-btn{ margin-top:20px; }
    .el-form-item{
        margin-bottom:12px;
    }
}
</style>