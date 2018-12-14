module.exports = function (app) {
    const fs = require('fs');
    let productID = 4;
    let productDB = "../routing/src/db/products.json";

    //add products
    app.post('/admin/product/add', (req, res) => {
        let { name, category, url, desc, color, material, price } = req.body;

        const product = {
            id: "" + productID,
            url,
            name,
            category,
            desc,
            price,
            color,
            material
        };

        productID++;

        fs.readFile(productDB, function (err, data) {
            let json = JSON.parse(data);
            json.push(product);
            fs.writeFile(productDB, JSON.stringify(json), function (err) {
                if (err) res.json(json)
                res.json(json);
            })
        })
    });

    //delete products
    app.post('/admin/product/delete/', (req, res) => {
        const { id } = req.body;
        fs.readFile(productDB, function (err, data) {
            let json = JSON.parse(data);
            json.splice(json.findIndex(product => product.id == id), 1);
            fs.writeFile(productDB, JSON.stringify(json), function (err) {
                if (err) res.json(json)
                res.json(json);
            })
        });
    });
}