import http from './http'

export default function (file) {
  const data = new FormData()
  data.append('file', file)
  return http.post('/upload', data)
}
