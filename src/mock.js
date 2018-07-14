const Mock = require('mockjs')

Mock.mock('/newact', (options) => {
  console.log(options)
  return Mock.mock({
    'number': '1'
  })
})
