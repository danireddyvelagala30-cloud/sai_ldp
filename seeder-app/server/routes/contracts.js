const express = require('express');
const router = express.Router();
const contractsData = require('../data/contracts.json');

router.get('/', (req, res) => {
  console.log('[GET] /api/contracts requested');
  res.status(200).json(contractsData);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const contract = contractsData.find((c) => c.id === id);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }
  res.status(200).json(contract);
});

module.exports = router;
