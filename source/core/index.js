const url = require('./url');
const user = require('./user');

const core = db => ({
  url: url(db),
  user: user(db)
});

module.exports = core;
