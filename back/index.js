const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const fs = require('fs');
const LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');

const secret = 'demo__system';

const app = express();
app.use(cors('*'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let userID = 3;
const usersfile = '../routing/src/db/users.json';

const encrypt = data => {
    const hash = crypto.createHmac('sha256', secret)
        .update(data)
        .digest('hex');
    return hash;
};

app.get('/', (req, res) => {
    res.send("Hello")
});

app.post('/register', (req, res) => {
    let { name, lastname, username, password, email, birthdate, balance } = req.body;
    const user = {
        id: "" + userID,
        name,
        lastname,
        username,
        password: encrypt(password),
        email,
        birthdate,
        balance,
        level: "1"
    };

    fs.readFile(usersfile, function (err, data) {
        let json = JSON.parse(data)
        json.push(user)
        fs.writeFile(usersfile, JSON.stringify(json), function (err) {
            if (err) res.redirect('http://localhost:3000/registrationErr')
            res.redirect('http://localhost:3000/registrationSucces')
        })
    })

    userID++;

})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let matchUser = {
        id: -1,
        level: -1,
        auth: false
    };
    fs.readFile(usersfile, (err, data) => {
        let users = JSON.parse(data);
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email && users[i].password == encrypt(password)) {
                console.log(users[i].id)
                matchUser = {
                    id: users[i].id,
                    level: users[i].level,
                    auth: true
                };
            };
        };
        res.json(matchUser);
    });

})

app.listen(5000, () => {
    console.log(`Port - 5000`);
});