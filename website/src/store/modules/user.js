import Cookies from 'js-cookie'
import { Loading, Message, MessageBox } from 'element-ui'
import { login } from '@/api'
const TokenKey = 'Admin-Tokens'
const user = {
    state: {
        userInfo: Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : {},
        userSidebarData: [],
        screenHeight: document.documentElement.clientHeight,
        userEchartsInfo: Cookies.get('ChilckInfo') ? JSON.parse(Cookies.get('ChilckInfo')) : {}
    },
    mutations: {
        changeScreenHeight(state) {
            state.screenHeight = document.documentElement.clientHeight
        },
        saveToken(state, data) {
            state.userInfo = data
        },
        changeUserInfo(state, data) {
            state.userInfo = data
        },
        removeToken(state) {
            state.userInfo = {}
        },
        userSidebar(state, data) {
            var datas = []
            for (let index = 0; index < data.length; index++) {
                if (data[index].children.length > 0) {
                    datas = datas.concat(data[index].children)
                }
            }
            state.userSidebarData = datas
        },
        chilckInfoData(state, data) {
            state.userEchartsInfo = data
        }
    },
    actions: {
        getLogin(context, data) {
            // Loading.service({
            //     text: '正在登录,请稍后.....'
            // })
            return new Promise((resolve, reject) => {
                login(data).then(res => {
                    Message({
                        message: '登录成功,正在跳转......',
                        type: "success"
                    });
                    Cookies.set(TokenKey, res.data.data)
                    context.commit('saveToken', res.data.data)
                    Loading.service().close()
                    location.reload(); // 为了重新实例化vue-router对象 避免bug
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })

            })
        },
        toPromotionEcharts(context, data) {
            Cookies.remove('ChilckInfo')
            Cookies.set('ChilckInfo', data)
            context.commit('chilckInfoData', data)
        },
        outLogin(context) {
            MessageBox.confirm('登录异常', "确定登出", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                Cookies.remove(TokenKey)
                context.commit('removeToken')
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
        }
    }
}
export default user