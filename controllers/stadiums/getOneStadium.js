const Stadium = require("../../model/stadiums");

const getOneStadium = async(req, res) => {
    const {stadiumId:id}=req.params;
     const stadium = await Stadium.findById(id);
    
        if (!stadium) {
          return res.status(404).json({
            message: "No stadium exist contains this id",
            data: [],
          });
        }
    
        res.status(200).json({
          message: "Success",
          data: stadium,
        })
};

module.exports = getOneStadium;
