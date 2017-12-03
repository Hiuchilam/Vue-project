<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <router-link to="/site/register">注册</router-link>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <form id="loginform" name="loginform" class="login-box">
                            <div class="input-box">
                                <el-form-item label="" prop="user_name">
                                    <el-input v-model="ruleForm.user_name"></el-input>
                                    <!-- <input v-model="ruleForm.user_name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50"> -->
                                </el-form-item>
                            </div>
                            <div class="input-box">
                                <el-form-item label="" prop="password">
                                    <el-input type="password" v-model="ruleForm.password"></el-input>
                                    <!-- <input v-model="ruleForm.password" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16"> -->
                                </el-form-item>
                            </div>
                            <div class="btn-box">
                                <input id="btnSubmit" name="btnSubmit" type="button" @click="submit('ruleForm')" value="立即登录">
                            </div>
                            <!--记住上一页网址-->
                        </form>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {vm} from '../../kits/bus.js';
    export default {
        data() {
            return {
                ruleForm: {
                    user_name: "ivanyb",
                    password: "123"
                },
                rules: {
                    user_name: [{
                        required: true,
                        message: '请输入账号',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/site/account/login', this.ruleForm).then(res => {
                            if (res.data.status == 0) {
                                // 设置登录成功的local
                                localStorage.setItem("logined","true");
                                this.$message.success(res.data.message);
                                var path=localStorage.getItem("currentPath");
                                // console.log(path);
                                this.$router.push(path);
                                // 使用全局事件
                                vm.$emit("changelogin",true);
                            }else{
                                this.$message.error(res.data.message);                                
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .input-box {
        overflow: visible !important;
    }
</style>