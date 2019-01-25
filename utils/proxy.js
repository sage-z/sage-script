import fetch from 'node-fetch'

export default (...args) => {
  return fetch.apply(null, args).then(function (res) {
    return res.text()
  })
}
