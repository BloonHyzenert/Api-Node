const Producer = require('../models').Producer;

class ProducerController {

  async getAll() {
    return Producer.findAll();
  }

  async getById(id) {
    return Producer.findByPk(id);
  }

  async add(firstName, lastName) {
    try {
      return await Producer.create({firstName, lastName});
    } catch (err) {
      console.log(err);
    }
  }

  async update(id, payload) {
    return Producer.update(payload, {
      where: {
        id: id
      }
    });
  }

  async delete(id) {
    return Producer.destroy({
      where: {
        id: id
      }
    });
  }

}

module.exports = new ProducerController();
