import Vue from 'vue'
import Axios from 'axios'
import Qs from 'qs'
Vue.prototype.$axios = Axios
Axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.timeout = 8000
// 请求拦截
Axios.interceptors.request.use((config)=>{
    if(config.headers['Content-Type']){
        if(config.headers['Content-Type'] == 'application/x-www-form-urlencoded'){
            config.data = Qs.stringify(config.data, {arrayFormat: 'brackets'})
        }
    }        
    return config;
}, (error)=>{
    return Promise.reject(error)
})
//  响应拦截
Axios.interceptors.response.use((response)=>{
    return response
}, (error) => {
    return Promise.reject(error)
})
export default Axios;