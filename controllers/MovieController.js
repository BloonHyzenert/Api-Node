const Movie = require('../models').Movie
const Genre = require('../models').Genre
const Producer = require('../models').Producer
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class MovieController {
  async getAll(query) {
    var moviesPerPage = 5

    var search = query.search ? `%${query.search}%` : '%%'
    var page = query.page
    var genreId = query.genreId
    var sort = query.sort
      ? Array.isArray(query.sort)
        ? query.sort
        : [query.sort]
      : null
    var desc = query.desc
      ? Array.isArray(query.desc)
        ? query.desc.map((field) => [field, 'DESC'])
        : [[query.desc, 'DESC']]
      : null

    var movies = Movie.findAll({
      limit: page ? moviesPerPage : null,
      offset: page ? (page - 1) * moviesPerPage : 0,
      where: genreId
        ? {
            [Op.and]: [
              { genreId: genreId },
              {
                title: {
                  [Op.like]: search,
                },
              },
            ],
          }
        : {
            title: {
              [Op.like]: search,
            },
          },
      order: sort && desc ? sort.concat(desc) : sort || desc,
      include: [Genre, Producer],
    })
    return movies
  }

  async getById(id) {
    return Movie.findByPk(id, { include: [Genre, Producer] })
  }

  async add(title, description, year, genreId, producerId) {
    const genre = await Genre.findOne({ where: { id: genreId } })
    const producer = await Producer.findOne({ where: { id: producerId } })
    try {
      return await Movie.create({
        title,
        description,
        year,
      }).then((movie) => {
        movie.setGenre(genre)
        movie.setProducer(producer)
        return movie
      })
    } catch (err) {
      console.log(err)
    }
  }

  async update(id, payload) {
    const genre = await Genre.findOne({ where: { id: payload.genreId } })
    const producer = await Producer.findOne({
      where: { id: payload.producerId },
    })
    const movie = await Movie.findOne({
      where: { id },
    })
    movie.setGenre(genre)
    movie.setProducer(producer)

    return Movie.update(payload, {
      where: {
        id: id,
      },
    })
  }

  async delete(id) {
    return Movie.destroy({
      where: {
        id: id,
      },
    })
  }
}

module.exports = new MovieController()
