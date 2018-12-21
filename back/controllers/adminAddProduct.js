module.exports = function(app) {
  const fs = require("fs");
  const Users = "../routing/src/db/users.json";
  const Products = "../routing/src/db/products.json";

  app.post("/user/addproduct", (req, res) => {
    const { userID, productID, quantity } = req.body;

    //read the products file from databse;
    //get the right product and
    //add the property - quantity, depending on user's chosen quantity
    fs.readFile(Products, function(err, data) {
      let json = JSON.parse(data);
      let findProduct = json.find(product => product.id === productID);
      findProduct.quantity = "" + quantity;

      //read the users file from JSON,
      //find the right User
      //add the found product to the user's cart in the Database
      fs.readFile(Users, function(err, data) {
        let json = JSON.parse(data);
        let index = json.findIndex(user => user.id === userID);
        console.log(json[index].cart)
        console.log(productID)
        let userProdIndex = json[index].cart.findIndex(product => product.id == productID);
        if(userProdIndex >= 0) {
          json[index].cart[userProdIndex].quantity = Number(json[index].cart[userProdIndex].quantity) + Number(findProduct.quantity);
        } else {
          json[index].cart.push(findProduct);
        }

        //write the renewed information in the USERS' database
        fs.writeFile(Users, JSON.stringify(json), function(err) {
          if (err) res.json(json);
          res.json({message: 'Product Successfully Added'});
        });
      });
    });
  });
};
