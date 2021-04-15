const producerRouter = require('./producers');

module.exports = function(app) {
  app.use('/api', [
    producerRouter
  ]);
};
