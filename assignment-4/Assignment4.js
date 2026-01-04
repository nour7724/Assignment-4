const e = require("express");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
app.use(express.json());

app.post("/addUser", (req, res) => {
  let { id,name, age, email, password } = req.body;
  let users = JSON.parse(fs.readFileSync("users.json"));
  const alrdyExists = users.find(user => user.email === email);
  if (alrdyExists) {
    return res.json("User already exists");
  } else {
    users.push({ id, name, age, email, password });
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.json("User added successfully");
  }
});

app.patch("/updateUser/:id", (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync("users.json"));
  let userIndex = users.findIndex(user => user.id == id);
  if (userIndex === -1) {
    return res.json("User not found");
  } else {
    let { name, age, email, password } = req.body;
    if (name) users[userIndex].name = name;
    if (age) users[userIndex].age = age;
    if (email) users[userIndex].email = email;
    if (password) users[userIndex].password = password;
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.json("User updated successfully");
  }
});

app.delete("/deleteUser/:id", (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync("users.json"));
  let userIndex = users.findIndex(user => user.id == id);
  if (userIndex === -1) {
    return res.json("User not found");
  } else {
    users.splice(userIndex, 1);
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.json("User deleted successfully");
  }
});

app.get("/getByName", (req, res) => {
  let { name } = req.query;
  let users = JSON.parse(fs.readFileSync("users.json"));
  let user = users.find(user => user.name === name);  
    if (!user) {
        return res.json("User not found");
    } else {
        res.json(user);
    }
});

app.get("/allUsers", (req, res) => {
  let users = JSON.parse(fs.readFileSync("users.json"));
  res.json(users);
});

app.get("/filter", (req, res) => {
  let { minimumAge } = req.query;
  let users = JSON.parse(fs.readFileSync("users.json"));
  let flUsers = users.filter(user => user.age >= minimumAge);
  if (!flUsers) {
    return res.json("user not found");
  } else {
    res.json(flUsers);
  }
});

app.get("/getById/:id", (req, res) => {
  let { id } = req.params;
  let users = JSON.parse(fs.readFileSync("users.json"));
  let user = users.find(user => user.id == id);   
    if (!user) {
        return res.json("User not found");
    } else {
        res.json(user);
    }   
});

app.listen(port, () => {
  console.log(`Server working on port 3000`);
});
