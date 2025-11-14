const User = require("../model/user"); // Using your file path
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    // 1. Get user data
    const {
      firstName,
      lastName,
      email,
      password,
      favouritePosition,
      preferredFoot,
      profilePicture,
      coverPhoto,
      birthday, 
    } = req.body;

    // 2. Check if user exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // 4. Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      favouritePosition,
      preferredFoot,
      profilePicture,
      coverPhoto,
      birthday, 
    });

    // 5. Save user
    await newUser.save();

    // 6. Create JWT for auto-login
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 7. Send response
    const userResponse = newUser.toObject(); 
    delete userResponse.password; 
    
    res.status(201).json({
      message: 'User created successfully!',
      token: token,
      user: userResponse // Send the full user object (minus password)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // 1. Get email and password from request
    const { email, password } = req.body;

    // 2. Find user by email
    const user = await User.findOne({ email: email }).select('+password');

    // 3. Check if user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 4. Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // 5. Check if passwords match
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 6. Create a JSON Web Token (JWT)
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // 7. Send the token and user info back (successful login)
    const userResponse = user.toObject();
    delete userResponse.password; 
    res.status(200).json({
      message: 'Login successful!',
      token: token,
      user: userResponse // Send the full user object (minus password)
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};