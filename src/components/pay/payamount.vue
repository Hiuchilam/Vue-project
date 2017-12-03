<template>
    <div class="tmpl">
        <input v-model="payAmount" type="text" placeholder="请输入内容"></input>
        <el-button type="success" @click="pay">支付</el-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                payAmount: 0
            }
        },
        created() {
            this.getAmount();
        },
        methods: {
            getAmount() {
                var url = '/site/validate/order/getorder/' + this.$route.params.orderid;
                this.$ajax.get(url).then(res => {
                    this.payAmount = res.data.message[0].order_amount;
                })
            },
            pay() {
                this.$ajax.get('/site/validate/order/pay/' + this.$route.params.orderid).then(res => {
                    if (res.data.status == 0) {
                        this.$message.success("支付成功");
                        this.$router.push({
                            name: "paysuccess"
                        })
                    } else {
                        this.$message.error("支付失败");
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .tmpl {
        width: 500px;
        margin: 0 auto;
    }
</style>