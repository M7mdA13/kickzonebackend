const Stadium = require("../../model/stadiums");

const addStadium = async (req, res) => {
  const { name, location, rating, price, description, image, capacity } =
    req.body;

  if (
    !name ||
    !location ||
    !price ||
    !description ||
    !image ||
    !capacity
  ) {
    return res
      .status(400)
      .json({ message: "Please fill all required fields." });
  }

  const stadiumExist = await Stadium.findOne({
    name,
    location,
  });
  if (stadiumExist) {
    return res.status(400).json({ message: "This stadium already exists." });
  }

  const newStadium = new Stadium({
    name,
    location,
    rating,
    price,
    description,
    image,
    capacity,
  });

  await newStadium.save();

  res
    .status(201)
    .json({ message: "Stadium added successfully", data: newStadium });
};

module.exports = addStadium;
