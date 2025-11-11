const Stadium = require("../../model/stadiums");

const deleteStadium = async (req, res) => {
  const { stadiumId: id } = req.params;

  const stadium = await Stadium.findByIdAndDelete(id);

  if (!stadium) {
    return res
      .status(404)
      .json({ message: "No stadium exists with this ID", data: [] });
  }

  res
    .status(200)
    .json({ message: "Stadium deleted successfully", data: stadium });
};

module.exports = deleteStadium;
