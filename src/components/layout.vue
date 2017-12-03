<template>
    <div class="tmpl">
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <router-link v-if="!logined" to="/site/login">登录
                        </router-link>
                        <router-link v-if="!logined" to="/site/register">注册</router-link>
                        <router-link v-if="logined" to="/site/vipcenter">会员中心
                        </router-link>
                        <a v-if="logined" @click="logout" href="javascript:void(0);">退出</a>
                        <strong>|</strong>
                        <!-- <a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a> -->
                        <router-link to="/site/goodscar">
                            <i class="iconfont icon-cart"></i>购物车(
                            <!-- <span id="layoutcart">{{totalCount}}</span> ) -->
                            <!-- <span id="layoutcart">{{this.$store.state.buyCount}}</span> ) -->
                            <span id="layoutcart">{{this.$store.getters.getBuyCount}}</span> )
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                               <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                           </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <div id="menu2" class="menu">
                            <ul>
                                <li class="index">
                                    <a href="/index.html">
                                        首页
                                    </a>
                                </li>
                                <li class="news">
                                    <a href="/news.html">
                                        学员问题汇总
                                    </a>
                                </li>
                                <li class="photo">
                                    <a href="/photo.html">
                                        重难点专区
                                    </a>
                                </li>
                                <!--<li class="goods"><a href="">就业阶段</a></li>-->
                                <li class="video">
                                    <a href="/video.html">
                                        前端常用功能
                                    </a>
                                </li>
                                <li class="down">
                                    <a href="/down.html">
                                        资源下载
                                    </a>
                                </li>
                                <li>
                                    <router-link to="/site/goodslist">
                                        <a href="javascript:void(0)">购物商城</a>
                                    </router-link>
                                </li>
                            </ul>
                            <div class="cls"></div>
                        </div>

                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import {
        vm,
        KEY
    } from '../kits/bus.js';
    // 导入localstorage操作
    import {
        getItem
    } from '../kits/localstoragehelper.js';
    export default {
        data() {
            return {
                carCount: 0,
                totalCount: 0,
                logined: false
            }
        },
        methods: {
            getCarCount() {
                var goodsobj = getItem();
                this.carCount = goodsobj[this.$route.params.goodsid];
            },
            logout() {
                //注销
                this.$ajax.get('/site/account/logout').then(res => {
                    if (res.data.status == 0) {
                        this.$message.success("登出成功");
                        localStorage.setItem("logined", false);
                        this.logined=false;
                        this.$router.push({
                            name: "goodslist"
                        });
                    } else {
                        this.$message.error("登出失败");
                    }
                })
            },
            checklogin() {
                var res = localStorage.getItem("logined");
                if (res == "true") {
                    this.logined = true;
                } else {
                    this.logined = false;
                }
            }
        },
        mounted() {
            this.checklogin();
            vm.$on("changelogin", (val) => {
                this.checklogin();
            })
            $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function () {
                $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
            });

            $("#menu2 li a").hover(function () {
                $(".out", this).stop().animate({
                    'top': '48px'
                }, 300); // move down - hide
                $(".over", this).stop().animate({
                    'top': '0px'
                }, 300); // move down - show

            }, function () {
                $(".out", this).stop().animate({
                    'top': '0px'
                }, 300); // move up - show
                $(".over", this).stop().animate({
                    'top': '-48px'
                }, 300); // move up - hide
            });

            var counStr = localStorage.getItem("totalCount");
            if (counStr) {
                this.totalCount = parseInt(counStr);
            }

            // 监听key事件
            vm.$on(KEY, (buycount) => {
                this.totalCount += buycount;
                localStorage.setItem("totalCount", this.totalCount);
            })
        }
    }
</script>
<style scoped>
    @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css');
</style>