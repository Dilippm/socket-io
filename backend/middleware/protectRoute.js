import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
	try {
		// Extract the Authorization header
		const authHeader = req.headers['authorization'];

		// Check if the header exists and starts with "Bearer"
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		// Extract the token from the "Bearer <token>" format
		const token = authHeader.split(' ')[1];

		// Verify and decode the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}

		// Find the user based on the decoded userId
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Attach the user to the request object for further middleware/route access
		req.user = user;

		// Call next middleware or route handler
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;
