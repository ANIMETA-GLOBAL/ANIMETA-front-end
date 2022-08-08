//引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({//全局变量定义
    state: {
	   locale: "zh",  //语言 
       isSHowAddNft:false, 
	   tabhHeight:0,//标题栏高度
	   tabh:0,//状态栏高度 
    }, 
    mutations: {
	  changeLocale(state,value){
		 state.locale=value 
	  }, 
      changeAddNft(state,value){
		  state.isSHowAddNft=value
	  },  
	  changetabhHeight(state,value){ 
	  		  state.tabhHeight=value
	  },
	  changetabh(state,value){
	  		  state.tabh=value
	  },
    },
	
})
export default store