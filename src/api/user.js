import http from './http'

function loginByPwd ({ username, password }) {
  return http.post('/user/login/pwd', { username, password })
}

export default { loginByPwd }
