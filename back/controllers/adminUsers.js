module.exports = function (app) {
    const fs = require('fs');

    const Users = "../routing/src/db/users.json";

    app.get("/db/users",(req,res) => {
        fs.readFile(Users, function (err, data) {
            let json = JSON.parse(data);
                res.json(json);
            })

     })
}

