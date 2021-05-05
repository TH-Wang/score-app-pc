const filters = {
  // 处理数值
  number: function (s) {
    s = Number(s)
    if (s < 1000) return s
    if (s >= 1000 && s < 10000) {
      return (Math.ceil(s / 100) / 10).toFixed(1) + 'k'
    }
    if (s >= 10000 && s < 100000) {
      return (Math.ceil(s / 1000) / 10).toFixed(1) + 'w'
    }
    if (s >= 100000) {
      return Math.ceil(s / 10000) + 'w'
    }
  }
}

export default {
  install: function (Vue) {
    Object.entries(filters).forEach(([name, handler]) => {
      Vue.filter(name, handler)
    })
  }
}
