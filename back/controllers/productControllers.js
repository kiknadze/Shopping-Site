module.exports = function(app) {
    const fs = require('fs');
    let reviewID = 2;
    const reviewDB = "../routing/src/db/review.json";
    const usersfileDB = '../routing/src/db/users.json';
    const productDB = "../routing/src/db/products.json";

    app.post("/user/addproduct", (req, res) => {
        const { userID, productID, quantity } = req.body;
    
        //read the products file from databse;
        //get the right product and
        //add the property - quantity, depending on user's chosen quantity
        fs.readFile(productDB, function(err, data) {
          let json = JSON.parse(data);
          let findProduct = json.find(product => product.id === productID);
          findProduct.quantity = "" + quantity;
    
          //read the users file from JSON,
          //find the right User
          //add the found product to the user's cart in the Database
          fs.readFile(usersfileDB, function(err, data) {
            let json = JSON.parse(data);
            let index = json.findIndex(user => user.id === userID);
            let userProdIndex = json[index].cart.findIndex(product => product.id == productID);
            if(userProdIndex >= 0) {
              json[index].cart[userProdIndex].quantity = Number(json[index].cart[userProdIndex].quantity) + Number(findProduct.quantity);
            } else {
              json[index].cart.push(findProduct);
            }
    
            //write the renewed information in the USERS' database
            fs.writeFile(usersfileDB, JSON.stringify(json), function(err) {
              if (err) res.json(json);
              res.json({message: 'Product Successfully Added'});
            });
          });
        });
    });

    //read review from DB
    app.post('/db/review', (req, res) => {
        const { productID } = req.body; //get ID
        fs.readFile(reviewDB, function (err, data) {
            let json = JSON.parse(data);
            let reviewFilter = json.filter(review => review.productID == productID); //filter reviews by product id
            res.json(reviewFilter);
        })
    });

    //add new review
    app.post('/product/review/add', (req, res) => {
        const { productID, userID, username, message } = req.body;
        const review = {
            id: "" + reviewID,
            productID: "" + productID,
            userID: "" + userID,
            username,
            message
        };
        
        reviewID++;

        fs.readFile(reviewDB, function (err, data) {
            let json = JSON.parse(data);
            json.push(review);
            fs.writeFile(reviewDB, JSON.stringify(json), function (err) {
                let reviewFilter = json.filter(review => review.productID == productID);
                if (err) res.json(reviewFilter)
                res.json(reviewFilter);
            })
        });
    });

    //make order
    app.post('/ordercompleted', (req, res) => {
        const { user } = req.body;
        fs.readFile(usersfileDB, function (err, data) {
            let json = JSON.parse(data);
            let findUser = json.find(users => users.id == user.id);
            let index = json.findIndex(users => users.id == user.id);
            for(let i=0; i < user.cart.length; i++) {
                for(let j=0; j < findUser.orders.length; j++) {
                    if(user.cart[i].id == findUser.orders[j].id) {
                        findUser.orders[j].quantity++;
                        break;
                    } else {
                        findUser.orders.push(user.cart[i])
                        break;
                    };
                };
            };
            findUser.cart = [];
            findUser.address = user.address;
            findUser.balance = "" + user.balance;
            json[index] = findUser;
            fs.writeFile(usersfileDB, JSON.stringify(json), function (err) {
                if (err) res.json(json)
                res.json(json);
            });        
        })
    });
}