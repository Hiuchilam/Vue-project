<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="info.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box clearfix">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in info.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path"  />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1> {{info.goodsinfo.title}} </h1>
                                <p class="subtitle">{{info.goodsinfo.sub_title}} </p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{info.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{info.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{info.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="num1" size="small" controls-position="left" @change="countChange" :min="1" :max="info.goodsinfo.stock_quantity"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{info.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" ref="addcart" @click="addCar">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <!-- <a :class="istabshow:'selected'?'' " @click="istabshow=true" href="javascript:;">商品介绍</a> -->
                                            <a v-bind="{class:(istabshow?'selected':'')}" @click="istabshow=true" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li>
                                            <a v-bind="{class:(!istabshow?'selected':'')}" href="javascript:;" @click="istabshow=false" class="">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-show="istabshow" v-html="info.goodsinfo.content" style="display:block;">

                            </div>

                            <div class="tab-content" v-show="!istabshow" style="display: block;">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model="commentTxt" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" @click="addComment" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box clearfix">
                                        <p v-if="commentlist.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentlist " :key="item.id" v-if="commentlist">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.reply_time | datefmt("y-m-d hh:mm:ss") }}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <div id="pagination" class="digg">
                                            <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="currentIndex" :page-sizes="[1, 3, 5,10]"
                                                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">

                                    <li v-for="item in info.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/site/goodsinfo/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to: '/site/goodsinfo/'+item.id}" v-text="item.title">
                                            </router-link>
                                            <span>{{item.add_time | datefmt("y-m-d hh:mm:ss")}}</span>
                                        </div>
                                    </li>
 
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
        <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
            <div v-if="info.imglist" class="img" ref="img" v-show="isshow">
                <img width="50" height="50" :src="info.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
    // jq导入 步骤2 
    import "../../../statics/jqplugins/jqimgzoom/js/magnifier.js";
    // 导入共用bus.js
    import {
        vm,
        KEY
    } from "../../kits/bus.js";

    //导入locastorage操作方法
    import {
        setItem
    } from '../../kits/localstoragehelper.js';

    export default {
        data() {
            return {
                artid: this.$route.params.goodsid, //商品的id
                info: {}, //存储服务器返回数据,
                commentlist: {}, //评论的数据列表
                currentCount: 1, //存储当前预购商品数量
                num1: 1, //数字框必须选项
                istabshow: true, //选项卡的显示隐藏
                currentIndex: 1,
                pageSize: 3,
                totalCount: 1,
                classA: "", //商品评论的选中类别切换
                commentTxt: "", //评论文本框内容获取
                isshow: false, //控制购物车图片显示与否
                offsetObj: {}, //购物车图片初始位置
                endObj: {}, //购物车图片最后的位置
            };
        },
        methods: {
            //动画
            benter(el) {
                el.style.left = this.offsetobj.left + "px";
                el.style.top = this.offsetobj.top + "px";
            },
            enter(el, done) {
                el.offsetWidth;
                el.style.left = this.endObj.left + "px";
                el.style.top = this.endObj.top + "px";
                done();
            },
            aenter(el) {
                this.isshow = false;
            },
            getinfo() {
                // 获取商品详情
                this.$ajax
                    .get("/site/goods/getgoodsinfo/" + this.$route.params.goodsid)
                    .then(res => {
                        this.info = res.data.message;
                        if (!res.data.message) {
                            this.$message.error("商品不存在");
                        }
                        setTimeout(() => {
                            $("#magnifier1").imgzoon({
                                magnifier: "#magnifier1"
                            });
                        }, 200);
                    });
            },
            countChange(value) {
                // 改变商品数量
                this.currentCount = value;
            },
            getcomment() {
                // 获取评论
                var url = "/site/comment/getbypage/goods/" + this.artid + "?pageIndex=" + this.currentIndex +
                    "&pageSize=" + this.pageSize;
                this.$ajax.get(url).then(res => {
                    this.commentlist = res.data.message;
                    this.totalCount = res.data.totalcount;
                });
            },
            sizeChange(size) {
                // 切换页容量
                this.pageSize = size;
                this.getcomment();
            },
            pageChange(currentPage) {
                // 切换页数
                this.currentIndex = currentPage;
                this.getcomment();
            },
            addComment() {
                // 评论提交
                var url = '/site/validate/comment/post/goods/' + this.$route.params.goodsid;
                this.$ajax.post(url, {
                    'commenttxt': this.commentTxt
                }).then(res => {
                    if (res.data.status == 0) {
                        this.$message.success(res.data.message);
                        this.getcomment();
                        this.commentTxt = "";
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
            },
            addCar() {
                // 加入购物车
                // 用vm.$emit触发事件,将购买数量传入layout
                var goodsObj = {
                    gid: this.artid,
                    count: this.currentCount
                };
                setItem(goodsObj);
                // vm.$emit(KEY, this.currentCount);

                // 用vuex做
                this.$store.dispatch('changeCount', goodsObj);
                this.isshow = true;
            }
        },
        watch: {
            // 监控路由地址的改变
            $route: function () {
                this.istabshow = true;
                this.artid = this.$route.params.goodsid;
                this.getinfo();
                this.getcomment();
            }
        },
        mounted() {
            this.getinfo();
            this.getcomment();
            setTimeout(() => {
                // 控制购物车图片的位置
                var offsetObj = $(this.$refs.addcart).offset()
                this.offsetobj = offsetObj;
                this.endObj = $("#layoutcart").offset();
                $(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);
            }, 200);
        }
    };
</script>
<style scoped>
    /* jq插件的导入 步骤1 */

    #goodsTabs {
        float: left;
    }

    #goodsTabs li {
        float: left;
    }

    .page-box {
        margin: 5px 0 0 62px;
    }

    #commentList li {
        float: none;
    }

    .img {
        position: absolute;
        width: 50px;
        height: 50px;
        border: 1px solid #f00;
        transition: all 1s;
        top: 0;
        left: 0;
    }

    @import url("../../../statics/jqplugins/jqimgzoom/css/magnifier.css");
</style>