<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220"  style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in topinfo.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                            <span v-text="item.title"></span>
                                            <p>
                                                <span v-for="subitem in item.subcates" :key="subitem.id"> {{subitem.title}} &nbsp;</span>
                                            </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <router-link :to="'/site/goodscate/'+item.id">{{item.title}}</router-link>
                                            </dt>
                                            <dd>
                                                <router-link :to="'/site/goodscate/'+subitem.id" v-for="subitem in item.subcates" :key="subitem.id"  href="javascript:void(0)">{{subitem.title}} &nbsp;</router-link>
                                            </dd>
                                        </dl>
    </div>
    </li>
    </ul>
    </div>
    </div>
    <!--/类别菜单-->
    <!--幻灯片-->
    <div class="left-705">
        <div class="banner-img">
            <div id="focus-box"  class="focus-box">
                <el-carousel trigger="click" height="150px">
                    <el-carousel-item v-for="item in topinfo.sliderlist" :key="item.id">
                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                            <img width="710" height="340" :src="item.img_url" alt="">
                        </router-link>
                        <h3>{{ item.title }}</h3>
                    </el-carousel-item>
                </el-carousel>
                </div>
                </div>
                </div>
                <!--/幻灯片-->
                <!--推荐商品-->
                <div class="left-220">
                    <ul class="side-img-list">
                        <li v-for="(item,index) in topinfo.toplist" :key="item.id">
                            <div class="img-box">
                                <label>{{index+1}}</label>
                                <img :src="item.img_url">
                                    </div>
                                    <div class="txt-box">
                                        <router-link :to="'/site/goodsinfo/'+item.id">{{item.title}}</router-link>
                                        <span>{{item.add_time | datefmt}}</span>
                                        </div>
                        </li>
                        </ul>
                        </div>
                        <!--/推荐商品-->
                        </div>
                        </div>
                        </div>


                        <div v-for="item in groupinfo" :key="item.level1cateid"  class="section">

                            <!--子类-->
                            <div class="main-tit">
                                <h2>{{item.catetitle}}</h2>
                                <p>
                                    <router-link v-for="l2item in item.level2catelist" :to="'/site/goodscate/'+l2item.subcateid">{{l2item.subcatetitle}}</router-link>
                                    <a href="/goods/40.html">更多
                                        <i>+</i>
                                        </a>
                                </p>
                        </div>
                        <!--/子类-->
                        <div class="wrapper clearfix">
                            <div class="wrap-box">
                                <ul class="img-list">

                                    <li v-for="dataitem in item.datas" :key="dataitem.artID">
                                        <a href="/goods/show-91.html">
                                            <div class="img-box">
                                                <img :src="dataitem.img_url">
                                                    </div>
                                                    <div class="info">
                                                        <h3> {{dataitem.artTitle}} </h3>
                                                        <p class="price">
                                                            <b>¥{{dataitem.sell_price}} </b>元</p>
                                                            <p>
                                                                <strong>库存 {{dataitem.stock_quantity}}</strong>
                                                                <span>市场价：
                                                                    <s> {{dataitem.market_price}} </s>
                                                                </span>
                                                            </p>
                                                            </div>
                                                            </a>
                                    </li>

                                    </ul>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
</template>
<script>
    export default {
        data() {
            return {
                topinfo: [], //存储顶部服务器返回数据
                groupinfo: [] //存储商品组服务器返回数据
            }
        },
        methods: {
            getGoodsList() {
                var url = '/site/goods/gettopdata/goods';
                this.$ajax.get(url).then(res => {
                    this.topinfo = res.data.message;
                })
            },
            getGoodsGroup() {
                var url = '/site/goods/getgoodsgroup';
                this.$ajax.get(url).then(res => {
                    this.groupinfo = res.data.message;
                })
            }
        },
        mounted() {
            this.getGoodsList();
            this.getGoodsGroup();
        }
    }
</script>
<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
<style>
    .el-carousel__container {
        width: 710px;
        height: 340px!important;
    }
</style>