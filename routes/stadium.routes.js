const express = require("express");
const getAllStadiums = require("../controllers/stadiums/getAllStadiums");
const getOneStadium = require("../controllers/stadiums/getOneStadium");
const deleteStadium = require("../controllers/stadiums/deleteStadium");
const addStadium = require("../controllers/stadiums/addStadium");
const updateStadium = require("../controllers/stadiums/updateStadium"); // ← FIXED
const router = express.Router();

router.get("/", getAllStadiums);

router.get("/:stadiumId", getOneStadium);
router.post("/", addStadium);
router.delete("/:stadiumId", deleteStadium);
router.patch("/:stadiumId", updateStadium);

module.exports = router;
