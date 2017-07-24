import Vue from 'vue'

Vue.filter('currency', function (value) {
  value = parseFloat(value)

  var digitsRE = /(\d{3})(?=\d)/g
  var decimals = 2

  if (!isFinite(value) || (!value && value !== 0)) {
    return ''
  }

  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  var i = _int.length % 3
  var head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
  var _float = decimals ? stringified.slice(-1 - decimals) : ''
  var sign = value < 0 ? '-' : ''

  return sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float
})
