<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd> {{orderinfo.order_no}} </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{orderinfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd> {{orderinfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd> {{orderinfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{orderinfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span> {{orderinfo.message}} </span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    <canvas width="400" height="400"></canvas>
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
    import '../../../statics/jqplugins/qr/jqueryqr.js';
    export default {
        data() {
            return {
                orderid: this.$route.params.orderid,
                orderinfo: [],
                intervalStop: 0
            }
        },
        methods: {
            getorderinfo() {
                this.$ajax.get('/site/validate/order/getorder/' + this.orderid).then(res => {
                    this.orderinfo = res.data.message[0];
                })
            }
        },
        created() {
            clearInterval(this.intervalStop);
            this.intervalStop = setInterval(() => {
                this.$ajax.get('/site/validate/order/getorder/' + this.orderid).then(res => {
                    if (res.data.message[0].status == 2) {
                        if (this.intervalStop) {
                            clearInterval(this.intervalStop);
                        }
                        this.$message.success("支付成功");
                        this.$router.push({
                            name: "PCpaysuccess"
                        })
                    }
                })
            }, 5000)
        },
        beforeDestroy() {
            if (this.intervalStop) {
                clearInterval(this.intervalStop);
            }
        },
        mounted() {
            this.getorderinfo();
            $("#container").erweima({
                label: '傻逼卢静',
                text: 'http://127.0.0.1:7076/#/payamount/' + this.orderid
            });
        }
    }
</script>
<style scoped>

</style>