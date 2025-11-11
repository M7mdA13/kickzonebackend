const Stadium = require("../../model/stadiums");

const getAllStadiums = async (req, res) => {
 
    const stadiums = await Stadium.find({}, { __v: 0 });

    if (!stadiums) {
      return res.status(404).json({
        message: "No stadiums found",
        data: [],
      });
    }

    res.status(200).json({
      message: "Success",
      data: stadiums,
    })
};

module.exports = getAllStadiums;
