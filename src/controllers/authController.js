const { readJSON } = require("../utils/fileUtils");
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;
  const users = readJSON("users.json");

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({ message: "Login successful", token, role: user.role });
};
