const Stadium = require("../../model/stadiums");

const getAllStadiums = async (req, res) => {
  const stadiums = await Stadium.find({}, { name: 1, image:1 ,location:1 });

  if (!stadiums || stadiums.length === 0) {
    return res.status(404).json({
      message: "No stadiums found",
      data: [],
    });
  }

  res.status(200).json({
    message: "Success",
    data: stadiums,
  });
};

module.exports = getAllStadiums;
