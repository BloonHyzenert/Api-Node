const MovieController = require('../controllers').MovieController

let express = require('express')
let router = express.Router()

router.get('/movies', async (req, res, next) => {
  res.json(await MovieController.getAll(req.query))
})

router.get('/movies/:id', async (req, res, next) => {
  const movie = await MovieController.getById(req.params.id)
  if (movie === null) {
    res.status(404).json({ error: 'Movie not found' })
    return
  }
  res.json(movie)
})

router.post('/movies', async (req, res, next) => {
  if (
    req.body.title &&
    req.body.year &&
    req.body.genreId &&
    req.body.producerId
  ) {
    const insertedMovie = await MovieController.add(
      req.body.title,
      req.body.description,
      req.body.year,
      req.body.genreId,
      req.body.producerId
    )
    res.status(201).json(insertedMovie)
  } else {
    res.status(400).json({ error: 'Movie not created' })
  }
})

router.patch('/movies/:id', async (req, res, next) => {
  if (
    !(
      req.body.title &&
      req.body.year &&
      req.body.genreId &&
      req.body.producerId
    )
  ) {
    res.status(400).json({ error: 'Movie not updated' })
    return
  }

  const updatedMovie = await MovieController.update(req.params.id, req.body)

  if (updatedMovie[0] === 1) {
    res.json(await MovieController.getById(req.params.id))
    return
  }

  res.status(404).json({ error: "Movie doesn't exist" })
})

router.delete('/movies/:id', async (req, res, next) => {
  const success = await MovieController.delete(req.params.id)
  if (!success) {
    res.status(404).json({ error: 'Movie not found' })
    return
  }

  res.status(204).json()
})

module.exports = router
