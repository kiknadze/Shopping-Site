const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const fs = require("fs");

//Controlers
const adminControllers = require("./controllers/adminControllers");
const adminUsers = require("./controllers/adminUsers");
const adminMessages = require("./controllers/adminMessages");
const productControllers = require("./controllers/productControllers");
const adminAddProduct = require("./controllers/adminAddProduct");

const secret = "demo__system"; //encrypt
const PORT = 5000; //PORT

const usersfileDB = "../routing/src/db/users.json";
let userID = 3;

const messagesFileDB = "../routing/src/db/messages.json";
let messageID = 3;

const categoryFileDB = "../routing/src/db/category.json";

const app = express();
app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const encrypt = data => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  return hash;
};

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/register", (req, res) => {
  let {
    name,
    lastname,
    username,
    password,
    email,
    birthdate,
    balance
  } = req.body;
  const user = {
    id: "" + userID,
    name,
    lastname,
    username,
    password: encrypt(password),
    email,
    birthdate,
    balance,
    cart: [],
    orders: [],
    level: "1"
  };

  fs.readFile(usersfileDB, function(err, data) {
    let json = JSON.parse(data);
    json.push(user);
    fs.writeFile(usersfileDB, JSON.stringify(json), function(err) {
      if (err) res.json(json);
      res.json(json);
    });
  });

  userID++;
});

//get userData to checkout page
app.get("/checkout", (req, res) => {
  fs.readFile(usersfileDB, (err, data) => {
    let user = JSON.parse(data);
    console.log(user);
    res.json(user);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  let matchUser = {
    id: -1,
    level: -1,
    auth: false
  };
  fs.readFile(usersfileDB, (err, data) => {
    let users = JSON.parse(data);
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email && users[i].password == encrypt(password)) {
        matchUser = {
          id: users[i].id,
          level: users[i].level,
          auth: true
        };
        break;
      }
    }
    res.json(matchUser);
  });
});

app.post("/addmessage", (req, res) => {
  const { name, email, subject, message } = req.body;

  const newMessage = {
    id: "" + messageID,
    name,
    email,
    subject,
    message
  };

  fs.readFile(messagesFileDB, function(err, data) {
    let json = JSON.parse(data);
    json.push(newMessage);
    fs.writeFile(messagesFileDB, JSON.stringify(json), function(err) {
      if (err) res.json(json);
      res.json(json);
    });
  });
  messageID++;
});

//Dea - Get the category and the users data from json
app.get("/db/category", (req, res) => {
  fs.readFile(categoryFileDB, (err, data) => {
    let json = JSON.parse(data);
    res.json(json);
  });
});

app.get("/db/users", (req, res) => {
  fs.readFile(Users, function(err, data) {
    let json = JSON.parse(data);
    res.json(json);
  });
});

adminControllers(app);
adminUsers(app);
adminMessages(app);
productControllers(app);
adminAddProduct(app);

app.listen(PORT, () => {
  console.log(`Port - ${PORT}`);
});
