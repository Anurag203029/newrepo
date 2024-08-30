// import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";

// const protectRoute = async (req, res, next) => {
// 	try {
// 		const token = req.cookies.jwt;

// 		if (!token) return res.status(401).json({ message: "Unauthorized" });

// 		const decoded = jwt.verify(token, 'sceret');
//         console.log(decoded)
// 		const user = await User.findById(decoded.userId).select("-password");

// 		req.user = user;

// 		next();
// 	} catch (err) {
// 		res.status(500).json({ message: err.message });
// 		console.log("Error in signupUser: ", err.message);
// 	}
// };

// export default protectRoute;

import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

 const protectRoute = async (req, res, next) => {
	// console.log(jwt);
	
	try {
		const token = req.cookies.jwt;
		console.log(token);
		
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

		const decoded = jwt.verify(token, "sceret");
		console.log(decoded);
		
		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
export default protectRoute;