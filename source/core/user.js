const CoreError = require('./CoreError');

const user = db => ({
  async create ({ id }) {

    const result = (await this.data.find({ id })).length === 0;

    if (result === true) {

      const result = await this.data.insert({ id, deleted: false });
      return result;

    } else {

      throw new CoreError(`User "${id}" already exists!`, 1);

    }

  },

  async delete ({ id }) {

    return await this.data.update({ id }, { $set: { deleted: true } });

  },

  data: db.get('users')
});

module.exports = user;
