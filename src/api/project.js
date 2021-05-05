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

export default {
  getTemplates,
  getOwnProject,
  create
}
