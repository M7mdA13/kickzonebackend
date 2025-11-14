const Stadium = require("../../model/stadiums");

const updateStadium = async (req, res) => {
  try {
    const { stadiumId } = req.params;

    // update only fields sent in body
    const updated = await Stadium.findByIdAndUpdate(
      stadiumId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Stadium not found",
        data: null,
      });
    }

    return res.status(200).json({
      message: "Stadium updated successfully",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = updateStadium;
