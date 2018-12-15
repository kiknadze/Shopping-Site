module.exports = function(app) {
    const fs = require('fs');
    let reviewID = 2;
    let reviewDB = "../routing/src/db/review.json";

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
}