var express = require('express');
var router = express.Router();
var pModel = require("../models/playersModel")

router.get('/:id', async function(req, res, next) {
  console.log("Get playerinfo ");
  let pId = req.params.id;
  let result = await pModel.getPlayerInfo(pId);
  res.status(result.status).send(result.result);
});

module.exports = router;
