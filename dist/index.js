
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./webclock.cjs.production.min.js')
} else {
  module.exports = require('./webclock.cjs.development.js')
}
