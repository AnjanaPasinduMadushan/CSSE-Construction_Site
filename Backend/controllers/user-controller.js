import Users from "../models/user/user.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { validateEmail, validatePWD } from "../validations/user-validation.js";

const jwt = jsonwebtoken;

const createToken = (_id, role) => {
  // console.log(process.env.SECRET)
  return jwt.sign({ _id, role }, process.env.secret, { expiresIn: '1hr' })
}

const signUp = async (req, res) => {

  const { name, mobile, email, password, role, shopName, shopAddress } = req.body;

  if (!name || !mobile || !email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }
  else if (!validateEmail(email)) {
    return res.status(400).json({ message: "Please provide valid Email" })
  }
  else if (!validatePWD(password)) {
    console.log(`invalid password format: ${password}`)
    return res.status(400).json({ message: "Please provide valid Password" })
  }
  try {
    let existingUsers;
    //chaecking whether user already sign up or not based on the email
    try {
      existingUsers = await Users.findOne({ $or: [{ email: email }, { mobile: mobile }] });
    } catch (err) {
      console.error(err);
    }

    if (existingUsers) {
      if (existingUsers.email == email) {
        return res.status(409).json({ message: "A User is already signUp with this email" })
      }
      else if (existingUsers.mobile == mobile) {
        return res.status(409).json({ message: "A User is already signUp with this mobile" })
      }

    }

    const salt = await bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    //creating a new User
    const user = new Users({
      name,
      mobile,
      email,
      password: hashedpassword,
      role,
      shopName,
      shopAddress
    });
    await user.save();
    return res.status(201).json({ message: "Account Creation is success, Login to your account", Users: user })//sending the new user details with token as a message for the response

  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Error in saving user in DB" });
  }

}

const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(422).json({ message: "All fields should be filled" });
    }

    const loggedUser = await Users.findOne({ email: email });

    if (!loggedUser) {
      return res.status(404).json({ message: "User is not found. Sign Up instead" });
    }

    // Check the password using bcrypt.compare
    const isPasswordCorrect = await bcrypt.compare(password, loggedUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If the role is provided, check it against the stored userRole
    if (role && role !== loggedUser.role) {
      return res.status(403).json({ message: "Incorrect login portal" });
    }

    // Create and set a cookie with the user's ID and token
    const token = createToken(loggedUser._id, loggedUser.role);
    res.cookie(String(loggedUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,
      sameSite: "lax"
    });

    // Return success message along with the token and user details
    return res.status(200).json({
      message: "Successfully logged in",
      ManagementStaff: loggedUser,
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error occurred during login! Please contact the server administrator",
      error: err.message
    });
  }
};


const getprofile = async (req, res) => {

  const userId = req.userId;

  try {

    const user = await Users.findById(userId, "-password")

    if (!user) {
      return res.status(404).json({ message: "User is not found" })
    }
    else {
      res.status(200).json({ user })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting your Account" })
  }
}

const logout = (req, res) => {
  const uId = req.userId;//request user Id from the token
  const cookies = req.headers.cookie;//request cookie from the header

  if (!cookies) {
    console.error("cookie not found")
    return res.status(403).json({ message: "Login first" })
  }

  //exttracting token from the cookies
  const previousToken = cookies.split("=")[1];

  //if token is not found return this response
  if (!previousToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }

  //varifying token using secret key from the environmental variables
  jwt.verify(String(previousToken), process.env.secret, (err) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });//if not verified return this error
    }

    //if token is varified return this success message as response
    res.clearCookie(`${uId}`);
    req.cookies[`${uId}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

const getAllSiteManagers = async (req, res) => {
  try {
    const siteManagers = await Users.find({ role: "site-manager" },);
    console.log("siteManagers",siteManagers)
    res.status(200).json({ siteManagers });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in getting site managers" });
  }
}

const getSiteManagerById = async (req, res) => {
  try {
    const siteManager = await Users.findById(req.params.id);
    res.status(200).json({ siteManager });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error in getting site manager" });
  }
}

export { signUp, login, getprofile, logout,getAllSiteManagers,getSiteManagerById }