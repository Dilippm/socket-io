import jwt from "jsonwebtoken";
const generateTokenAndSetHeader = (userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

return token
	
	// Optionally, you can also send the token in the response body
	// res.json({ token }); // Uncomment if you want to send the token in the response body
};

export default generateTokenAndSetHeader;


