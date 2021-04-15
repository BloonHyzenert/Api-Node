const ProducerController = require('../controllers').ProducerController;

let express = require('express');
let router = express.Router();

router.get('/producers', async (req, res, next) => {
  res.json(await ProducerController.getAll());
});

router.get('/producers/:id', async (req, res, next) => {
  const producer = await ProducerController.getById(req.params.id);
  if (producer === null) {
    res.status(404).json({"error": "Producer not found"});
    return;
  }
  res.json(producer);
});

router.post('/producers', async (req, res, next) => {
  if (req.body.firstName && req.body.lastName) {
    const insertedProducer = await ProducerController.add(req.body.firstName, req.body.lastName);
    res.status(201).json(insertedProducer);
  } else {
    res.status(400).end();
  }
});

router.patch('/producers/:id', async (req, res, next) => {

  if (!req.body.firstName && !req.body.lastName) {
    res.status(400).end();
    return
  }

  const updatedProducer = await ProducerController.update(req.params.id, req.body);

  if (updatedProducer[0] === 1) {
    res.json(await ProducerController.getById(req.params.id));
    return
  }

  res.status(404).json({'error': "Producer doesn't exist"});
});

router.delete('/producers/:id', async (req, res, next) => {
  const success = await ProducerController.delete(req.params.id);
  if(!success) {
    res.status(404).json({'error': 'Producer not found'});
    return
  }

  res.status(204).json();
});

module.exports = router;
