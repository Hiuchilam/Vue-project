<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/site/goodslist">首页</router-link>&gt;
                <router-link to="/site/goodscar">购物车</router-link>
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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                {{values}}
                                <tr>
                                    <th width="48" align="center">
                                        <el-button size="small" type="success" @click="selectAll"> {{selectTxt}} </el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodslist.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="values[index]" on-color="#13ce66" off-color="#ff4949">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <!-- 放商品图片和标题 -->
                                        <img width="50" height="50" :src="item.img_url" :alt="item.title"> {{item.title}}
                                    </td>
                                    <td width="84" align="left"> {{item.sell_price}} </td>
                                    <td width="104" align="center">
                                        <inputnumber :obj="{gid:item.id,count:item.buycount}" @msg="getobj"></inputnumber>
                                    </td>
                                    <td width="104" align="left"> {{item.sell_price * item.buycount}} </td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click="delData(item.id)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity"> {{selectedNum}} </b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount"> {{getAmount}} </b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" @click="shopping">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 导入localstorage操作组件
    import {
        getItem,
        setItemReplace,
        removeItem
    } from '../../kits/localstoragehelper.js';
    // 导入自定义number组件
    import inputnumber from '../subcom/inputnumber.vue';
    export default {
        // 注册子组件
        components: {
            inputnumber
        },
        data() {
            return {
                selectedNum: 0,
                goodslist: {}, //接口获取的商品数据
                values: [], //switch按钮的值绑定
                selectTxt: "全选",
                isSelected: false,
            }
        },
        computed: {
            getAmount() {
                // 先获取总件数
                var trueArr = this.values.filter(item => item);
                this.selectedNum = trueArr.length;

                // 统计总金额
                var totalprice = 0;
                this.values.forEach((item, index) => {
                    if (item) {
                        totalprice += (this.goodslist[index]["buycount"] * this.goodslist[index]["sell_price"]);
                    }
                })
                return totalprice;
            }
        },
        methods: {
            // 获取购物车商品数据
            getgoodslist() {
                var goodsObj = getItem();
                var idArr = [];
                for (var key in goodsObj) {
                    idArr.push(key);
                }
                var idsStr = idArr.join(",");
                // 发送请求
                this.$ajax.get("/site/comment/getshopcargoods/" + idsStr).then(res => {
                    // 手动给数据中的buycount赋值
                    res.data.message.forEach(element => {
                        element.buycount = goodsObj[element.id];
                        this.values.push(false);
                    });
                    this.goodslist = res.data.message;
                })
            },
            selectAll() {
                // 全选按钮
                this.isSelected = !this.isSelected;
                if (this.isSelected) {
                    this.selectTxt = "反选";
                } else {
                    this.selectTxt = "全选";
                }
                // this.values.forEach(element=>{
                //     element=this.isSelected;
                // })
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isSelected;
                }
                this.values.push(false);
                this.values.pop();
            },
            delData(goodsid) {
                // 1.获取索引
                var index = this.goodslist.findIndex(item => item.id == goodsid);
                // 2.删除values对应的值
                this.values.splice(index, 1);
                // 3.删除goodslist中的值
                this.goodslist.splice(index, 1);
                // 删除localstorage中的值
                removeItem(goodsid);
            },
            getobj(obj) {
                // 修改localstorage中的值
                setItemReplace(obj);
                // 将新的值赋值给goodslist
                var index = this.goodslist.findIndex(function (item) {
                    return item.id == obj.gid;
                });
                this.goodslist[index]["buycount"] = obj.count;
            },
            shopping() {
                var ids = [];
                this.values.forEach((item,index)=>{
                    if (item) {
                        ids.push(this.goodslist[index]["id"]);
                    }
                });
                this.$router.push({name:"shopping",params:{ids:ids.join(",")}});
            }
        },
        mounted() {
            this.getgoodslist();
        }
    }
</script>
<style scoped>

</style>