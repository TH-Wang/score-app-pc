import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const whitelist = /(login|register|template|public)/g

const instance = axios.create({
  baseURL: 'http://localhost:7001/api/v1'
})

instance.interceptors.request.use(function (config) {
  if (!whitelist.test(config.url)) {
    config.headers.authorization = localStorage.getItem('token')
  }
  return config
})

instance.interceptors.response.use(function (res) {
  return res
}, function (error) {
  const { response } = error
  if (response.status === 401) {
    store.commit('deleteUser')
    store.commit('deleteToken')
    Message({
      message: response.data.message,
      type: 'warning',
      showClose: true
    })
    router.push('/auth/login')
  }
  return response
})

instance.get = (url, query) => {
  return instance.request({
    url,
    method: 'GET',
    params: query
  })
}

// function queryString (query) {
//   if (isEmpty(query)) return ''

//   let result = ''
//   Object.entries(query).forEach(([key, value], idx) => {
//     result += idx === 0 ? '?' : '&'
//     result += `${key}=${value}`
//   })
//   return result
// }

export default instance
