import http from './http'

function getItems (id) {
  return http.get(`/items/${id}`)
}

function create (data) {
  return http.post('/items/create', data)
}

function update ({ id, ...rest }) {
  return http.put(`/items/${id}`, rest)
}

export default { getItems, create, update }
