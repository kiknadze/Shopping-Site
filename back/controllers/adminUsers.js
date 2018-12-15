module.exports = function (app) {
    const fs = require('fs');

    const Users = "../routing/src/db/users.json";

    app.get("/db/users",(req,res) => {
        fs.readFile(Users, function (err, data) {
            let json = JSON.parse(data);
                res.json(json);
            })

     })
     app.post('/admin/user/edit/', (req, res) => {
        const { id , newUsername} = req.body;
        console.log(id)
        console.log(newUsername)
        
        fs.readFile(Users, function (err, data) {
            let json = JSON.parse(data);
            let editUser =json.findIndex(user => user.id == id);
            json[editUser].username=newUsername;
            fs.writeFile(Users, JSON.stringify(json), function (err) {
                if (err) res.json(json)
                res.json(json);
            })
        });
    });
}

