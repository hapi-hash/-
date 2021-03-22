import Vue from "vue";
import App from "./App.vue";
import VueCompositionapi from "@vue/composition-api"
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit"
const echarts = require('echarts');
Vue.prototype.$echarts = echarts
//自定义全局组件
import "./icons";


Vue.use(ElementUI);
Vue.use(VueCompositionapi);

Vue.config.productionTip = false;





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
