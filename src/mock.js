const Mock = require('mockjs')

Mock.mock('/newact', (options) => {
  console.log(options)
  return Mock.mock({
    'number': '1'
  })
})
Mock.mock('/login', (options) => {
  console.log(options.body)
  return options.body
})
Mock.mock('/register', (options) => {
  console.log(options.body)
  return options.body
})
