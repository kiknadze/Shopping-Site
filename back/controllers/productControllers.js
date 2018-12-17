module.exports = function(app) {
    const fs = require('fs');
    let reviewID = 2;
    const reviewDB = "../routing/src/db/review.json";
    const usersfileDB = '../routing/src/db/users.json';

    app.post('/db/review', (req, res) => {
        const { productID } = req.body;
        fs.readFile(reviewDB, function (err, data) {
            let json = JSON.parse(data);
            let reviewFilter = json.filter(review => review.productID == productID);
            res.json(reviewFilter);
        })
    });

    app.post('/product/review/add', (req, res) => {
        const { productID, userID, message } = req.body;

        const review = {
            id: "" + reviewID,
            productID: "" + productID,
            userID: "" + userID,
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