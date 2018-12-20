module.exports = function(app) {
  const fs = require("fs");
  const Users = "../routing/src/db/users.json";
  const Products = "../routing/src/db/products.json";

  app.post("/admin/user/addproduct", (req, res) => {
    const { userID, productID, quantity } = req.body;

    //read the products file from databse;
    //get the right product and
    //add the property - quantity, depending on user's chosen quantity
    fs.readFile(Products, function(err, data) {
      let json = JSON.parse(data);
      let findProduct = json.find(product => product.id === productID);
      findProduct.quantity = "" + quantity;
      console.log(findProduct);

      //read the users file from JSON,
      //find the right User
      //add the found product to the user's cart in the Database
      fs.readFile(Users, function(err, data) {
        let json = JSON.parse(data);
        let findUser = json.findIndex(user => user.id === userID);
        // let cart = json[findUser].cart;
        json[findUser].cart.push(findProduct);

        //write the renewed information in the USERS' database
        fs.writeFile(Users, JSON.stringify(json), function(err) {
          if (err) res.json(json);
          res.json(json);
        });
      });
    });
  });
};
