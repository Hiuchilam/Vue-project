<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <router-link to="/site/goodslist">购物商城</router-link>
                &nbsp;&gt;&nbsp;
                <router-link :to="'/site/goodscate/'+cateid">手机数码</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper clearfix">
                <div class="screen-box">
                    <!--分类-->
                    <dl>
                        <dt>分类：</dt>
                        <dd>

                            <a href="/goods/0.html">全部</a>
                            <router-link v-for="item in goodsparentcate" :key="item.level1cateid" :to="'/site/goodscate/'+item.level1cateid"> {{item.catetitle}} </router-link>

                        </dd>
                    </dl>
                    <!--/分类-->
                </div>

            </div>
        </div>

        <div class="section">
            <div class="wrapper clearfix">
                <ul class="img-list">
                    <!--取得一个分页DataTable-->

                    <li v-for="item in goodslist" :key="item.id">
                        <router-link :to="'/site/goodsinfo/'+item.id">
                            <div class="img-box">

                                <div class="abs-txt">推荐</div>

                                <img :src="item.img_url">
                            </div>
                            <div class="info">
                                <h3> {{item.title}} </h3>
                                <p class="price">
                                    <b>¥{{item.sell_price}} </b>元</p>
                                <p>
                                    <strong>库存 {{item.stock_quantity}}</strong>
                                    <span>市场价：
                                        <s>{{item.market_price}}</s>
                                    </span>
                                </p>
                            </div>
                        </router-link>
                    </li>


                </ul>

                <!--页码列表-->
                <div class="page-box" style="margin:15px 0 0;">
                    <div class="digg">
                        <el-pagination class="el-pagination" @size-change="pageSizeChange" @current-change="pageIndexchange" :current-page="pageIndex"
                            :page-sizes="[3, 5, 10, 15]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                            :total="totalCount">
                        </el-pagination>
                    </div>
                </div>
                <!--/页码列表-->
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cateid: this.$route.params.cateid, //分类id
                goodslist: [], //分类列表
                pageIndex: 1, //当前页数
                pageSize: 10, //当前页容量
                totalCount: 1, //商品总数
                goodsparentcate: [], //分类父列表
            }
        },
        methods: {
            getgoodslist() {
                // 获取分类列表
                var url = '/site/goods/getgoodsbycateid/' + this.cateid + '?pageIndex=' + this.pageIndex +
                    '&pageSize=' +
                    this.pageSize;
                this.$ajax.get(url).then(res => {
                    this.goodslist = res.data.message;
                    this.totalCount = res.data.totalcount;
                })
            },
            getgoodsparentcate() {
                // 获取分类父列表
                var url = '/site/goods/getgoodsgroup';
                this.$ajax.get(url).then(res => {
                    this.goodsparentcate = res.data.message;
                })
            },
            pageSizeChange(size) {
                // 页容量操作
                this.pageSize = size;
                this.getgoodslist();
            },
            pageIndexchange(index) {
                // 当前页数操作
                this.pageIndex = index;
                this.getgoodslist();
            }
        },
        watch: {
            // 监控路由地址改变
            $route: function () {
                // 初始化id
                this.cateid = this.$route.params.cateid;
                // 初始化分类列表
                this.getgoodslist();
                // 初始化分类父列表
                this.getgoodsparentcate();
            }
        },
        mounted() {
            // 初始化分类列表
            this.getgoodslist();
            // 初始化分类父列表
            this.getgoodsparentcate();
        }
    }
</script>
<style scoped>

</style>