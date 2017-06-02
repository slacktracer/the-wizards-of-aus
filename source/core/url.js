const endec = require('./endec');

const url = db => ({
  async count () {

    return await this.data.count({ deleted: false });

  },
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
      this.data.findOne({ code, deleted: false }),
      this.data.update({ code, deleted: false }, { $inc: { hits: 1 } })
    ]);

    return result;

  },

  async stats ({ code }) {

    const data = await this.data.findOne({ code, deleted: false });

    const result = {
      code: data.code,
      hits: data.hits,
      url: data.url
    };

    return result;

  }
});

module.exports = url;
