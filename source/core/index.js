const url = require('./url');
const user = require('./user');

const core = db => ({
  async stats ({ userId } = {}) {

    const match = { $match: { deleted: false } };

    if (userId) {

      match.$match.userId = userId;

    }

    const data = await Promise.all([
      this.url.data.aggregate([
        match,
        {
          $group: {
            _id: null,
            hits: { $sum: '$hits' },
            count: { $sum: 1 }
          }
        }
      ]),
      this.url.data.aggregate([
        match,
        {
          $group: {
            _id: { code: '$code', url: '$url' },
            hits: { $sum: '$hits' }
          }
        },
        { $sort: { hits: -1 } },
        { $limit: 10 }
      ])
    ]);

    if (data[0] && data[0][0] && data[1]) {

      const result = {
        hits: data[0][0].hits,
        urlCount: data[0][0].count,
        topUrls: data[1].map(entry => ({
          code: entry._id.code,
          url: entry._id.url,
          hits: entry.hits
        }))
      };

      return result;

    }

    return {};

  },
  url: url(db),
  user: user(db)
});

module.exports = core;
