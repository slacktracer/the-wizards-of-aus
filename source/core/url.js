const endec = require('./endec');

const url = db => ({
  async create ({ url, userId }) {

    const count = await this.data.count();

    const code = endec.encode(count);

    const result = await this.data.insert({
      code,
      deleted: false,
      hits: 0,
      url,
      userId
    });

    return result;

  },

  data: db.get('urls'),

  async delete ({ code }) {

    return await this.data.update({ code }, { $set: { deleted: true } });

  },

  async read ({ code }) {

    const [ result ] = await Promise.all([
      this.data.findOne({ code }),
      this.data.update({ code }, { $inc: { hits: 1 } })
    ]);

    return result;

  }
});

module.exports = url;
