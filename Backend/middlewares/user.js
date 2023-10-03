import jsonwebtoken from 'jsonwebtoken';

const jwt = jsonwebtoken;

//checking user has a valid token
//decoding id, role from the token
const checkToken = async (req, res, next) => {

  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      console.error("cookie not found")
      return res.status(403).json({ message: "Login first" })
    }
    const token = cookies.split("=")[1];

    if (!token) {
      console.error("token not found")
      return res.status(403).json({ message: "A token is required" })
    }
    else {
      const decode = jwt.verify(token, process.env.secret);

      req.userId = decode._id;

      req.roleIs = decode.role;

      next();
    }

  } catch (err) {
    res.status(401).json({ message: "Invalid Token" })
    console.log(err)
  }
}

export { checkToken }