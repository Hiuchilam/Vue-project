<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="cart-box">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <form id="orderForm" name="orderForm">
                                <div class="form-box address-info">
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="收货人姓名:" prop="accept_name">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <el-input v-model="ruleForm.accept_name"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="所属地区">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <v-distpicker v-model="ruleForm.area" @selected="onSelected"></v-distpicker>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="详细地址：" prop="address">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <el-input v-model="ruleForm.address"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="手机号码：" prop="mobile">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <el-input v-model="ruleForm.mobile"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="电子邮箱：" prop="email">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <el-input v-model="ruleForm.email"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                    <dl class="form-group">
                                        <dd>
                                            <el-form-item label="邮政编码：" prop="post_code">
                                                <el-row>
                                                    <el-col :span="12">
                                                        <el-input v-model="ruleForm.post_code"></el-input>
                                                    </el-col>
                                                </el-row>
                                            </el-form-item>
                                        </dd>
                                    </dl>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio class="radio" v-model="ruleForm.payment_id" label="6">手续费：0.00元</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio-group @change="expressChange" v-model="ruleForm.express_id">
                                                <el-radio :label="1">顺丰(运费20)</el-radio>
                                                <el-radio :label="2">圆通(运费10)</el-radio>
                                                <el-radio :label="3">韵达(运费8)</el-radio>
                                            </el-radio-group>
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodslist" :key="item.id">
                                            <td width="68">
                                                <router-link :to="'/site/goodsinfo/'+item.id">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <router-link :to="'/site/goodsinfo/'+item.id">{{item.title}} </router-link>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center"> {{item.buycount}} </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.totalamount}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.message">
                                                </el-input>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price"> {{goodslist.length}} </label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price"> {{goodsAmount}} </label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price"> {{currentfee}} </label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price"> {{getOrderAmount}} </label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <input id="btnSubmit" @click="submit('ruleForm')" name="btnSubmit" type="button" value="确认提交" class="btn submit">
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    // 引入VDistpicker
    import VDistpicker from 'v-distpicker';

    import {
        getItem
    } from '../../kits/localstoragehelper.js';
    export default {
        components: {
            VDistpicker
        },
        data() {
            var checkmobile = (rule, value, callback) => {
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                var regObj = new RegExp(reg);
                if (regObj.test(value) == false) {
                    callback(new Error("手机号码不合法"));
                } else {
                    callback();
                }
            }
            return {
                goodslist: [], //接口返回的结算商品详情
                goodsCount: [], //本地存储的商品购买数量
                goodsAmount: 0, //商品总价(不包括运费)
                expressfee: {
                    "1": 20,
                    "2": 10,
                    "3": 8
                },
                currentfee: 20,
                ruleForm: {
                    "goodsAmount": 4099,
                    "expressMoment": 20,
                    "accept_name": "骁骁",
                    "area": {
                        "province": {
                            "code": "140000",
                            "value": "山西省"
                        },
                        "city": {
                            "code": "140100",
                            "value": "太原市"
                        },
                        "area": {
                            "code": "140106",
                            "value": "迎泽区"
                        }
                    },
                    "address": "城区",
                    "mobile": "18667654355",
                    "email": "ivanyb@qq.com",
                    "post_code": "516000",
                    "payment_id": "6",
                    "express_id": 1,
                    "message": "4K,白色",
                    "goodsids": this.$route.params.ids,
                    "cargoodsobj": {}
                },
                rules: {
                    accept_name: [{
                        required: true,
                        message: '请输入收货人姓名',
                        trigger: 'blur'
                    }],
                    address: [{
                        required: true,
                        message: '请输入详细地址',
                        trigger: 'blur'
                    }],
                    mobile: [{
                        validator: checkmobile,
                        triggle: "blur"
                    }],
                    email: [{
                        required: true,
                        message: '请输入电子邮箱',
                        trigger: 'blur'
                    }],
                    post_code: [{
                        required: true,
                        message: '请输入邮政编码',
                        trigger: 'blur'
                    }],
                }
            }
        },
        computed: {
            getOrderAmount() {
                // 总价(包括运费)
                this.ruleForm["goodsAmount"] = this.currentfee + this.goodsAmount;
                return this.ruleForm["goodsAmount"];
            }
        },
        methods: {
            getgoodslist() {
                var url = '/site/validate/order/getgoodslist/' + this.$route.params.ids;
                this.$ajax.get(url).then(res => {
                    this.goodslist = res.data.message;
                    var allCount = getItem();
                    this.goodslist.forEach(item => {
                        // 商品总价(除运费)
                        item.buycount = allCount[item.id];
                        item.totalamount = item.buycount * item.sell_price;
                        this.goodsAmount += item.totalamount;
                        // cargoodsobj同步
                        this.ruleForm.cargoodsobj[item.id] = allCount[item.id];
                    });
                })
            },
            expressChange(val) {
                // 运费
                this.currentfee = this.expressfee[val];
                this.ruleForm.expressMoment = this.currentfee;
            },
            onSelected(data) {
                // 地址选择
                this.ruleForm.area = data;
            },
            submit(formName) {
                // 提交数据
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log(this.ruleForm);
                        // 提交到接口
                        this.$ajax.post('/site/validate/order/setorder', this.ruleForm).then(res => {
                            if (res.data.status == 0) {
                                this.$message.success("下单成功");
                                this.$router.push({name:'pay',params:{orderid:res.data.message.orderid}});
                            }else{
                                this.$message.error("失败");
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.getgoodslist();
        }
    }
</script>
<style>
    .el-form-item__label {
        width: 13% !important;
    }

    .el-form-item__content {
        margin-left: 13% !important;
    }
</style>