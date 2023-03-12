const Application = require('./application');

function createApplication() {
  const app = new Application();
  app.request = Object.create({});
  app.response = Object.create({});
  return app;
}

module.exports = createApplication;