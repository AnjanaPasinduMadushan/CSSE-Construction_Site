import Management from "../models/user/management-staff.js";
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { validateEmail, validatePWD } from "../validations/user-validation.js";

const jwt = jsonwebtoken;

const createToken = (_id) => {
  // console.log(process.env.SECRET)
  return jwt.sign({ _id }, process.env.secret, { expiresIn: '1hr' })
}

const signUp = async (req, res) => {

  const { name, mobile, email, password } = req.body;

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
    let existingManagementStaff;
    //chaecking whether user already sign up or not based on the email
    try {
      existingManagementStaff = await Management.findOne({ $or: [{ email: email }, { mobile: mobile }] });
    } catch (err) {
      console.error(err);
    }

    if (existingManagementStaff) {
      if (existingManagementStaff.email == email) {
        return res.status(409).json({ message: "A User is already signUp with this email" })
      }
      else if (existingManagementStaff.mobile == mobile) {
        return res.status(409).json({ message: "A User is already signUp with this mobile" })
      }

    }

    const salt = await bcrypt.genSalt(6)
    //hashsync is a function that can hasing the password
    const hashedpassword = await bcrypt.hash(password, salt);

    //creating a new User
    const management = new Management({
      name,
      mobile,
      email,
      password: hashedpassword
    });

    await management.save();
    return res.status(201).json({ message: "Account Creation is success, Login to your account", Management: management })//sending the new user details with token as a message for the response

  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: "Error in saving user in DB" });
  }

}

const login = async (req, res) => {

  const { email, password } = req.body;

  //checking whether pasword and login fields are filled or not 
  if (!email || !password) {
    return res.status(422).json({ message: "All feilds should be filled" })
  }

  let loggedManagementStaff;
  try {
    loggedManagementStaff = await Management.findOne({ email: email });

    if (!loggedManagementStaff) {
      return res.status(404).json({ message: "ManagementStaff is not found. Sign Up instead" })
    }

    //checking password and comare it with exist user's password in the db
    const isPasswordCorrect = bcrypt.compareSync(password, loggedManagementStaff.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" })
    }

    //Create and setting a cookie with the user's ID and token
    const token = createToken(loggedManagementStaff._id, loggedManagementStaff.role);

    res.cookie(`User:${String(loggedManagementStaff._id)}`, token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60),
      httpOnly: true,//if this option isn't here cookie will be visible to the frontend
      sameSite: "lax"
    })

    //we send this msg along with the token and user details
    return res.status(200).json({ message: "Successfully logged in", ManagementStaff: loggedManagementStaff, token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error occured during Login! Please contact server administrator", error: err });
  }
}

const getprofile = async (req, res) => {

  const userId = req.userId;

  try {

    const managementStaff = await Management.findById(userId, "-password")

    if (!managementStaff) {
      return res.status(404).json({ message: "ManagementStaff is not found" })
    }
    else {
      res.status(200).json({ managementStaff })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error in getting your Account" })
  }
}

const logout = (req, res) => {
  const uId = req.userId;//request user Id from the token
  const cookies = req.headers.cookie;//request cookie from the header

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


export { signUp, login, getprofile, logout }