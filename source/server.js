const bodyParser = require('body-parser');
const express = require('express');

module.exports = (routes, db) => {

  const app = express();

  app.use(bodyParser.json());

  routes(app, db);

  app.listen(3000, () => console.log('The heat is on...'));

  return app;

};
