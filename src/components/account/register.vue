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
                        <a class="selected" href="javascript:;">免费注册</a>
                        <i>|</i>
                        <router-link to="/site/login">账户登录</router-link>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <form id="loginform" name="loginform" class="login-box">
                            <div class="input-box">
                                <el-form-item label="" prop="user_name">
                                    <span class="input-left">
                                        用户名：&nbsp;&nbsp;&nbsp;</span>
                                    <el-input v-model="ruleForm.user_name"></el-input>
                                    <!-- 用户名<input v-model="ruleForm.user_name" id="txtUserName" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50"> -->
                                </el-form-item>
                            </div>
                            <div class="input-box">
                                <el-form-item label="" prop="password">
                                    <span class="input-left">
                                        密码：&nbsp;&nbsp;&nbsp;</span>
                                    <el-input type="password" v-model="ruleForm.password"></el-input>
                                    <!-- <input v-model="ruleForm.password" id="txtPassword" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16"> -->
                                </el-form-item>
                            </div>
                            <div class="input-box">
                                <el-form-item label="" prop="password2">
                                    <span class="input-left">
                                        确认密码：&nbsp;&nbsp;&nbsp;</span>
                                    <el-input type="password" v-model="ruleForm.password2"></el-input>
                                </el-form-item>
                            </div>
                            <div class="input-box">
                                <el-form-item label="" prop="mobile">
                                    <span class="input-left">
                                        手机&nbsp;&nbsp;&nbsp;</span>
                                    <el-input type="text" v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                            </div>
                            <div class="input-box">
                                <el-form-item label="" prop="email">
                                    <span class="input-left">
                                        邮箱&nbsp;&nbsp;&nbsp;</span>
                                    <el-input type="email" v-model="ruleForm.email"></el-input>
                                </el-form-item>
                            </div>
                            <div class="btn-box">
                                <input id="btnSubmit" name="btnSubmit" type="button" @click="submit('ruleForm')" value="立即创建">
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
    import {
        vm
    } from '../../kits/bus.js';
    export default {
        data() {
            var checkusername = (rule, value, callback) => {
                var url = '/site/account/checkuser/' + value;
                this.$ajax.get(url).then(res => {
                    if (res.data.status == 1) {
                        callback(new Error('用户名已被占用'));
                    } else {
                        callback();
                    }
                })
            };
            var checkpaw = (rule, value, callback) => {
                if (value == "") {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    user_name: "",
                    password: "",
                    password2: "",
                    mobile: "",
                    email: "",
                },
                rules: {
                    user_name: [{
                        validator: checkusername,
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    password2: [{
                        validator: checkpaw,
                        trigger: 'blur'
                    }],
                    mobile: [{
                        required: true,
                        message: '请输入手机',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur'
                    }],
                }
            }
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('/site/account/register', this.ruleForm).then(res => {
                            if (res.data.status == 0) {
                                this.$message.success(res.data.message);
                                this.$router.push({
                                    name: 'login'
                                });
                            } else {
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

    .input-box .input-left {
        width: 100px;
    }

    .el-input,
    .el-input__inner {
        width: 200px;
    }
</style>
<style>
    .el-form-item__content {
        margin-left: 0 !important;
    }
</style>