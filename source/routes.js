const core = require('./core')(
  require('monk')(
    'mongodb://admin:password00000000000@ga-shard-00-00-npf4k.mongodb.net:27017,ga-shard-00-01-npf4k.mongodb.net:27017,ga-shard-00-02-npf4k.mongodb.net:27017/GA?ssl=true&replicaSet=GA-shard-0&authSource=admin'
  )
);

module.exports = app => {

  app.get('/stats', async function (request, response) {

    response.json({});

  });

  app.get('/stats/:id', function (request, response) {

    response.json({});

  });

  app.get('/urls/:code', async (request, response) => {

    const { code } = request.params;

    try {

      const result = await core.url.read({ code });

      response.redirect(301, result.url);

    } catch (error) {

      response.status(500).json();

    }

  });

  app.delete('/urls/:code', async (request, response) => {

    const { code } = request.params;

    try {

      await core.url.delete({ code });

      response.status(204).json();

    } catch (error) {

      response.status(500).json();

    }

  });

  app.post('/users', async (request, response) => {

    const { id } = request.body || {};

    if (typeof id === 'string' && id) {

      try {

        const result = await core.user.create({ id });

        response.status(201).json(result);

      } catch (error) {

        if (error.code === 1) {

          return response.status(409).json();

        }

        response.status(500).json();

      }

    } else {

      response.status(400).json();

    }

  });

  app.post('/users/:userId/urls', async (request, response) => {

    const { userId } = request.params;

    const { url } = request.body || {};

    if (url) {

      try {

        const result = await core.url.create({ url, userId });

        response.status(201).json(result);

      } catch (error) {

        response.status(500).json();

      }

    } else {

      response.status(400).json();

    }

  });

  app.get('/users/:userId/stats', function (request, response) {

    response.json({});

  });

  app.delete('/users/:userId', async (request, response) => {

    const { userId } = request.params;

    try {

      await core.user.delete({ id: userId });

      response.status(204).json();

    } catch (error) {

      response.status(500).json();

    }

  });

};
