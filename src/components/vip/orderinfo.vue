<template>
    <div class="center">
        <div class="el-row">
            <div class="el-col el-col-24">
                <div class="comp">
                    <div class="tmpl routeanimate">
                        <div class="section">
                            <div class="location">
                                <span>当前位置：</span>
                                <router-link to="/site/goodslist"> 首页 </router-link>&gt;
                                <router-link to="/site/vipcenter"> 会员中心 </router-link>&gt;
                                <router-link to="/site/myorders"> 我的订单 </router-link>
                            </div>
                        </div>
                        <div class="section clearfix">
                            <div class="left-260">
                                <div class="bg-wrap">
                                    <div class="avatar-box">
                                        <a href="/user/center/avatar.html" class="img-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </a>
                                        <h3>

                                            ivanyb

                                        </h3>
                                        <p>
                                            <b>注册会员</b>
                                        </p>
                                    </div>
                                    <div class="center-nav">
                                        <ul>
                                            <li>
                                                <h2>
                                                    <i class="iconfont icon-order"></i>
                                                    <span>订单管理</span>
                                                </h2>
                                                <div class="list">
                                                    <p>
                                                        <router-link to="/site/myorders">
                                                            <i class="iconfont icon-arrow-right"></i>交易订单 </router-link>
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <h2>
                                                    <i class="iconfont icon-user"></i>
                                                    <span>账户管理</span>
                                                </h2>
                                                <div class="list">
                                                    <p>
                                                        <a href="#/site/member/center" class="">
                                                            <i class="iconfont icon-arrow-right"></i>账户资料</a>
                                                    </p>
                                                    <p>
                                                        <a href="#/site/member/center" class="">
                                                            <i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</a>
                                                    </p>
                                                    <p>
                                                        <a href="#/site/member/center" class="">
                                                            <i class="iconfont icon-arrow-right"></i>修改密码</a>
                                                    </p>
                                                    <p>
                                                        <a href="javascript:void(0)">
                                                            <i class="iconfont icon-arrow-right"></i>退出登录</a>
                                                    </p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="right-auto" v-if="orderdetail.orderinfo">
                                <div class="bg-wrap" style="min-height: 765px;">
                                    <div class="sub-tit">
                                        <router-link to="/site/myorders" class="add">
                                            <i class="iconfont icon-reply"></i>返回 </router-link>
                                        <ul>
                                            <li class="selected">
                                                <a href="javascript:;">查看订单</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="order-progress">
                                        <ul>
                                            <li class="first active">
                                                <div class="progress">下单</div>
                                                <div class="info"> {{orderdetail.orderinfo.add_time | datefmt('y-m-d hh:mm:ss')}} </div>
                                            </li>
                                            <li :class="orderdetail.orderinfo.status>1?'active':''">
                                                <div class="progress">已付款</div>
                                                <div :class="info"> {{orderdetail.orderinfo.payment_time | datefmt('y-m-d hh:mm:ss')}}</div>
                                            </li>
                                            <li :class="orderdetail.orderinfo.status>2?'active':''">
                                                <div class="progress">已经发货</div>
                                                <div class="info">{{orderdetail.orderinfo.express_time | datefmt('y-m-d hh:mm:ss')}} </div>
                                            </li>
                                            <li :class="orderdetail.orderinfo.status>3?'active':''">
                                                <div class="progress">已完成</div>
                                                <div class="info">{{orderdetail.orderinfo.confirm_time | datefmt('y-m-d hh:mm:ss')}}</div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="form-box accept-box form-box1" v-if="orderdetail.orderinfo.status!=5">
                                        <dl class="head form-group">
                                            <dd>
                                                订单号：{{orderdetail.orderinfo.order_no}}
                                                <router-link class="btn-pay" v-if="orderdetail.orderinfo.status==1" :to="'/site/pay/'+orderdetail.orderinfo.id">
                                                    去付款</router-link>
                                                <a href="javascript:void(0)" v-if="orderdetail.orderinfo.status==3" class="btn-pay" @click="complete">去签收</a>
                                                <!---->
                                            </dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>订单状态：</dt>
                                            <dd>
                                                 {{orderdetail.orderinfo.statusName}}
                                            </dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>快递单号：</dt>
                                            <dd>
                                                 {{orderdetail.orderinfo.express_no}}
                                            </dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>{{orderdetail.orderinfo.paymentTitle}}</dd>
                                        </dl>
                                    </div>
                                    <div class="table-wrap">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                                            <tbody>
                                                <tr>
                                                    <th align="left" colspan="2">商品信息</th>
                                                    <th width="10%">名称</th>
                                                    <th width="10%">单价
                                                    </th>
                                                    <th width="10%">数量</th>
                                                    <th width="10%">金额</th>
                                                </tr>
                                                <tr>
                                                    <td width="60" >
                                                        <img :src="orderdetail.goodslist[0].imgurl" class="img">
                                                    </td>
                                                    <td align="center" colspan="2">
                                                        <router-link target="_blank" :to="'/site/goodsinfo/'+orderdetail.goodslist[0].goods_id">
                                                         {{orderdetail.goodslist[0].goods_title}}</router-link>
                                                    </td>
                                                    <td align="center">
                                                        <s>￥{{orderdetail.goodslist[0].goods_price}}</s>
                                                        <p>￥{{orderdetail.goodslist[0].real_price}}</p>
                                                    </td>
                                                    <td align="center">{{orderdetail.goodslist[0].quantity}}</td>
                                                    <td align="center">￥{{orderdetail.goodslist[0].real_price}}</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="7" align="right">
                                                        <p>商品金额：
                                                            <b class="red">￥{{orderdetail.orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                                            <b class="red">￥{{orderdetail.orderinfo.express_fee}}</b>
                                                        </p>
                                                        <p style="font-size: 22px;">应付总金额：
                                                            <b class="red">￥{{orderdetail.orderinfo.order_amount}}</b>
                                                        </p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="form-box accept-box">
                                        <dl class="head form-group">
                                            <dd>收货信息</dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>顾客姓名：</dt>
                                            <dd>{{orderdetail.orderinfo.accept_name}}</dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{orderdetail.orderinfo.area}},{{orderdetail.orderinfo.address}}</dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>联系电话：</dt>
                                            <dd>{{orderdetail.orderinfo.mobile}} </dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>电子邮箱：</dt>
                                            <dd> {{orderdetail.orderinfo.email}}</dd>
                                        </dl>
                                        <dl class="form-group">
                                            <dt>备注留言：</dt>
                                            <dd>{{orderdetail.orderinfo.message}}</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderdetail: [], //订单明细列表
            }
        },
        methods: {
            getorderdetail() {
                // 获取订单明细列表
                var url = '/site/validate/order/getorderdetial/' + this.$route.params.orderid;
                this.$ajax.get(url).then(res => {
                    this.orderdetail = res.data.message;
                    console.log(this.orderdetail);
                })
            },
            complete() {
                // 确认操作
                this.$confirm('已收到商品,确定签收?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var url = "/site/validate/order/complate/" + this.$route.params.orderid;
                    this.$ajax.get(url).then(res => {
                        if (res.data.status == 0) {
                            this.$message.success(res.data.message);
                            this.getorderdetail();
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
                }).catch(() => {});

            }
        },
        mounted() {
            // 订单明细列表初始化
            this.getorderdetail();
        }
    }
</script>
<style scoped>

</style>