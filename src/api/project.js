import http from './http'

function getTemplates ({ page, size, keyword, tag }) {
  const query = { page, size }
  if (keyword) query.keyword = keyword
  if (tag) query.tag = tag
  return http.get('/project/template', query)
}

function getOwnProject (id) {
  return http.get(`/project/user/${id}`)
}

function create (data) {
  return http.post('/project', data)
}

function detail (id) {
  return http.get(`/project/${id}`)
}

function update ({ id, ...data }) {
  return http.put(`/project/${id}`, data)
}

function release (id) {
  return http.post(`/project/release/${id}`)
}

export default {
  getTemplates,
  getOwnProject,
  create,
  detail,
  update,
  release
}
