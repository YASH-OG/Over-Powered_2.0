const { readJSON, writeJSON } = require("../utils/fileUtils");

exports.getMenu = (req, res) => {
  const menu = readJSON("menu.json");
  res.json(menu);
};

exports.addMenuItem = (req, res) => {
  const { name, category, price } = req.body;
  const menu = readJSON("menu.json");

  const newItem = { id: menu.length + 1, name, category, price };
  menu.push(newItem);
  writeJSON("menu.json", menu);

  res.status(201).json({ message: "Item added", newItem });
};
