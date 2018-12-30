module.exports = function(app) {
    const fs = require('fs');
    let reviewID = 3;
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
              if (err) res.json({user: json[index], message: 'Product Not Added'});
              res.json({user: json[index], message: 'Product Successfully Added'});
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
            let index = json.findIndex(users => users.id == user.id);
            if(json[index].orders.length === 0) {
                json[index].orders = user.cart;
            } else {
                for(let i=0; i < user.cart.length; i++) {
                    for(let j=0; j < json[index].orders.length; j++) {
                        if(user.cart[i].id == json[index].orders[j].id) {
                            json[index].orders[j].quantity += user.cart[i].quantity;
                            break;
                        } else if(j === json[index].orders.length - 1) {
                            json[index].orders.push(user.cart[i])
                        };
                    };
                };
            }
            user.orders = json[index].orders;
            user.cart = [];
            json[index] = user;
            fs.writeFile(usersfileDB, JSON.stringify(json), function (err) {
                if (err) res.json(json[index])
                res.json(json[index]);
            });        
        })
    });

    //renew user cart
    app.post('/renewcart', (req, res) => {
        const { user } = req.body;
        fs.readFile(usersfileDB, function (err, data) {
            let json = JSON.parse(data);
            let index = json.findIndex(users => users.id == user.id);
            json[index] = user;
            fs.writeFile(usersfileDB, JSON.stringify(json), function (err) {
                if (err) res.json(json[index])
                res.json(json[index]);
            });        
        })
    });
}