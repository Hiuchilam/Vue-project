// 导入vue包
import Vue from "vue";

// 导入iview 
import {
    Affix
} from 'iview';
Vue.component('Affix', Affix);

// 导入 app.vue文件
import App from './App.vue';
// 导入router包
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 引入路由文件
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodscate from './components/goods/goodscate.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodscar from './components/goods/car.vue';
import shopping from './components/goods/shopping.vue';
import pay from './components/goods/pay.vue';
import login from './components/account/login.vue';
import register from './components/account/register.vue';
import vipcenter from './components/vip/vipcenter.vue';
import payamount from './components/pay/payamount.vue';
import paysuccess from './components/pay/paysuccess.vue';
import myorders from './components/vip/myorders.vue';
import orderinfo from './components/vip/orderinfo.vue';


// elementUI
import ElementUI from 'element-ui';

// 引入样式
import '../statics/site/css/style.css';
import '../statics/elementuiCss/index.css';
import 'iview/dist/styles/iview.css';

Vue.use(ElementUI);

// 导入axios
import axios from "axios";
// 设置axios的默认请求域名
axios.defaults.baseURL = "http://127.0.0.1:8899";
// 允许携带session
axios.defaults.withCredentials = true;
// 引入axios
Vue.prototype.$ajax = axios;

var router = new VueRouter({
    routes: [{
        name: "payamount",
        path: "/payamount/:orderid",
        component: payamount,
    }, {
        name: "paysuccess",
        path: "/paysuccess",
        component: paysuccess,
    }, {
        name: "default",
        path: "/",
        redirect: "/site/goodslist"
    }, {
        name: "layout",
        path: "/site",
        component: layout,
        children: [{
                name: "goodslist",
                path: "goodslist",
                component: goodslist
            }, {
                name: "goodsinfo",
                path: "goodsinfo/:goodsid",
                component: goodsinfo
            }, {
                name: "goodscar",
                path: "goodscar",
                component: goodscar,
            }, {
                name: "shopping",
                path: "shopping/:ids",
                component: shopping,
                meta: {
                    checklogin: "true"
                }
            }, {
                name: "pay",
                path: "pay/:orderid",
                component: pay,
                meta: {
                    checklogin: "true"
                }
            },
            {
                name: "login",
                path: "login",
                component: login,
                meta: {
                    nosave: "true"
                }
            },
            {
                name: "register",
                path: "register",
                component: register,
                meta: {
                    nosave: "true"
                }
            },
            {
                name: "PCpaysuccess",
                path: "PCpaysuccess",
                component: paysuccess,
                meta: {
                    checklogin: "true"
                }
            },
            {
                name: "vipcenter",
                path: "vipcenter",
                component: vipcenter,
                meta: {
                    checklogin: "true"
                }
            },
            {
                name: "myorders",
                path: "myorders",
                component: myorders,
                meta: {
                    checklogin: "true"
                }
            },
            {
                name: "orderinfo",
                path: "orderinfo/:orderid",
                component: orderinfo,
                meta: {
                    checklogin: "true"
                }
            },
            {
                name: "goodscate",
                path: "goodscate/:cateid",
                component: goodscate,
                meta: {
                    checklogin: "true"
                }
            },
        ]
    }]
})

// 全局守卫
router.beforeEach((to, from, next) => {
    if (to.meta.nosave != "true") {
        // 将当前要跳转的路径存入Local中
        localStorage.setItem("currentPath", to.path);
        // var currentPath=to.path;
    }
    if (to.meta.checklogin == "true") {
        // 检测是否登录
        axios.get('/site/account/islogin').then(res => {
            if (res.data.code == "logined") {
                next();
            } else {
                router.push({
                    name: "login"
                });
            }
        })
    } else {
        next();
    }
})

// 设置全局时间过滤器
Vue.filter("datefmt", (input, fmtString) => {
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (fmtString == "y-m-d hh:mm:ss") {
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    } else {
        return y + "-" + m + "-" + d;
    }
})
// 导入local操作文件
import {
    setItem,
    getItem
} from './kits/localstoragehelper.js';

// 引入vuex的四个核心对象
import vuex from 'vuex';

Vue.use(vuex);
// 1.全局保存的属性
var state = {
    buyCount: 0
}
// 2.通过mutation来改变state中的buyCount
var mutations = {
    changeCounts(state, goodsObj) {
        var obj = getItem();
        var totalcount = 0;
        for (var key in obj) {
            totalcount += obj[key];
        }
        state.buyCount = totalcount;
    }
}
// 3.通过actions调用mutation
var actions = {
    changeCount({
        commit
    }, goodsObj) {
        commit('changeCounts', goodsObj);
    }
}
// 对state中的某个属性进行封装
var getters = {
    getBuyCount(state) {
        if (state.buyCount > 0) {
            return state.buyCount;
        } else {
            var obj = getItem();
            var totalcount = 0;
            for (var key in obj) {
                totalcount += obj[key];
            }
            state.buyCount = totalcount;
            return totalcount;
        }
    }
}

// 将四个对象实例化
var store = new vuex.Store({
    state,
    mutations,
    actions,
    getters
});


new Vue({
    el: "#app",
    store,
    router: router,
    render: create => create(App)
})