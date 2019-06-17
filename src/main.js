import babelpolyfill from "babel-polyfill";
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import store from "./vuex/store";
import Vuex from "vuex";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./routes";
import "font-awesome/css/font-awesome.min.css";

import VueAMap from 'vue-amap';
// console.log(VueAMap);
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
    key: '1765771d9b897cad711cf533813fe6c2',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);

NProgress.configure({ showSpinner: false });

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path == "/login") {
        sessionStorage.removeItem("user");
    }
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (!user && to.path != "/login") {
        // next({ path: "/login" });
        next();
    } else {
        next();
    }
});

router.afterEach(transition => {
    NProgress.done();
});

new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount("#app");
