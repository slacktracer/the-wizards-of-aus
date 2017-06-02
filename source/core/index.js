const url = require('./url');
const user = require('./user');

const core = db => ({
  async stats () {

    const data = await Promise.all([
      this.url.data.aggregate([
        { $match: { deleted: false } },
        {
          $group: {
            _id: null,
            hits: { $sum: '$hits' },
            count: { $sum: 1 }
          }
        }
      ]),
      this.url.data.aggregate([
        { $match: { deleted: false } },
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

  },
  url: url(db),
  user: user(db)
});

module.exports = core;
