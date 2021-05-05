import http from './http'

function getItems (id) {
  return http.get(`/items/${id}`)
}

export default { getItems }
