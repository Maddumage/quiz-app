const jwt = require("jsonwebtoken");
const { USERS } = require("../utils/dummy");

exports.verifyToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res
      .status(401)
      .send({ message: "Access Denied. No Token Provided" });
  }

  try {
    const token = accessToken.split(" ")[1]; // split to remove Bearer
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    console.log("decoded ==> ", token, decoded);
    if (decoded && decoded.user) {
      const {
        user: { id },
      } = decoded;
      const user = USERS.find((user) => user.id === id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "Invalid Access token" });
      }
    }
  } catch (error) {
    console.log("error ==> ", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Session Expired" });
    }
    return res.status(401).send({ message: "Invalid Token" });
  }
};
