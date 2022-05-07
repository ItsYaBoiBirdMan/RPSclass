var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel")


router.get('/:pId/playermatches/:pmId/deck', async function(req, res, next) {
  console.log("Get deck for player in a match");
  let pId = req.params.pId;
  let pmId = req.params.pmId;
  let result = await pModel.getPlayerDeck(pId,pmId);
  res.status(result.status).send(result.result);
});



router.get('/playermatches/:id', async function(req, res, next) {
  console.log("Get match info for player ");
  let pmId = req.params.id;
  let result = await pModel.getPlayerMatchInfo(pmId);
  res.status(result.status).send(result.result);
});



router.get('/:id', async function(req, res, next) {
  console.log("Get playerinfo ");
  let pId = req.params.id;
  let result = await pModel.getPlayerInfo(pId);
  res.status(result.status).send(result.result);
});

module.exports = router;
