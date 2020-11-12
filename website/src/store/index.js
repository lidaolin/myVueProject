import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  //定义参数 this.$store.state.count;
  state: {
  },
  //过滤或者说数据处理类似于computed运算 this.$store.getters.newCount;
  getters:{
    token:state=>state.user.userInfo.token,
    userInfo:state=>state.user.userInfo,
    userSidebarData:state=>state.user.userSidebarData,
    getScreenHeight:state=>state.user.screenHeight?state.user.screenHeight-177:document.documentElement.clientHeight-177
    //237
  },
  //提交修改state里的值 this.$store.commit("increment", value);
  mutations: {
  },
  //用于提交类似登录可以写入请求 this.$store.dispatch('getParamSync',{name,age,sex})
  actions: {
  },
  //模块化vuex结构引入
  modules: {
    user,
  }
})
