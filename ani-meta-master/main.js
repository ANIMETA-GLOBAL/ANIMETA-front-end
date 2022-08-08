import App from './App'


import Vue from 'vue'
import uView from 'uview-ui'
Vue.use(uView)

// 语言


import share from './common/js/share.js'
Vue.mixin(share)

import Head from "./componentes/head"
Vue.component('Head',Head)
import NoDate from "@/componentes/noDate.vue"
Vue.component('NoDate',NoDate)

import TabBar from "./componentes/tabBar"
Vue.component('TabBar',TabBar)

import PT28 from "./componentes/PT28px"
Vue.component('PT28',PT28)


import Bdialog from "./componentes/dialog/action_sheet"
Vue.component('Bdialog',Bdialog)


// import {ellipsisDirective, ellipsisComponent} from '@hyjiacan/vue-ellipsis'
// 注册为指 e(ellipsisDirective.name, ellipsisDirective)
// 注册为组件
// Vue.component('ellipsis', ellipsisComponent)



// 引入store
import store from './store'
Vue.prototype.$store = store


import my from './common/js/my.js'
Vue.prototype.$my = my 


Vue.config.productionTip = false
App.mpType = 'app'  

//多语言引入
import VueI18n from 'vue-i18n'; //引入npm下载模块
import messages from '@/common/js/lang/index.js' //引入自定义语言文件




Vue.use(VueI18n); //全局使用

const i18n = new VueI18n({
	locale: store.state.locale, // 默认选择的语言
	messages 
});

Vue.prototype._i18n = i18n; //作为属性挂载
const app = new Vue({
    ...App,
	store,
})
app.$mount()


// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif