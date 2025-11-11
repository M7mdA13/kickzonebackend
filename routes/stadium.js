const express = require("express");
const getAllStadiums = require("../controllers/stadiums/getAllStadiums");
const getOneStadium = require("../controllers/stadiums/getOneStadium");
const deleteStadium = require("../controllers/stadiums/deleteStadium");
const addStadium = require("../controllers/stadiums/addStadium");
const router = express.Router();

router.get("/", getAllStadiums);

router.get("/:stadiumId", getOneStadium);
router.post("/", addStadium);
router.delete("/:stadiumId", deleteStadium);

module.exports = router;
