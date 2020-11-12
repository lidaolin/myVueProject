import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";

axios.defaults.baseURL = "/api"
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 100000 // request timeout
});
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      config.headers["token"] = store.getters.token
    }
    return config;
  },
  error => {
    // Do something with request error
    //console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data;
    /*  200	成功
     *  110101	账号异常
     *  110102	密码错误
     *  110103	参数不合法
     *  110104	程序异常
     *  110105	无效token
     *  110106	登录失效
     *  110108	无权访问
     *  110109	唯一性冲突
     *  110110	操作失败
     *  110111	请求不合法
     *  110113	异地登录
     *  110114	session异常
     *  500	服务端异常
     *  404	地址出错  */
    if (res.code === 200) {
      return response;
    } else if (
      res.code === 110106 ||
      res.code === 110105 ||
      res.code === 110113 ||
      res.code === 110114
    ) {
      store.dispatch('outLogin')
      return false;
      // return Promise.reject(res.msg)
    } else if (res.code === 110101 || res.code === 110102 || res.code === 110115) {
      Message({
        message: res.msg,
        type: "warning"
      });
      console.log(999)
      return Promise.reject(res.msg);
    } else if (res.code === 110103 || res.code === 110104) {
      Message.error(res.msg);
      return Promise.reject(res.msg);
    } else if (res.code === 110108) {
      Message({
        message: res.msg,
        type: "warning"
      });
      return response;
    } else if (res.code === 110116) {
      return response;
    } else if (res.code === 110109) {
      return Promise.reject(res.msg);
    } else if (
      res.code === 110110 ||
      res.code === 110111 ||
      res.code === 110112
    ) {
      return Promise.reject(res.msg);
    } else if (res.byteLength) {
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(res)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    } else {
      Message.error(res.msg);
      return response;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
