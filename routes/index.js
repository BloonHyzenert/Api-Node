const producerRouter = require('./producers')
const movieRouter = require('./movies')

module.exports = function (app) {
  app.use('/api', [producerRouter, movieRouter])
}
