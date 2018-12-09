const express = require('express');
const crypto = require('crypto');
const cors = require('cors');

const secret = 'demo__system';

const app = express();
app.use( cors('*') );
app.use( express.urlencoded( { extended: true}) );
app.use( express.json() );


const encrypt = data => {
    const hash = crypto.createHmac('sha256', secret)
                   .update(data)
                   .digest('hex');
    return hash;
};

app.get('/', (req, res) => {
    res.send("Hello")
});

app.listen( 5000, () => {
    console.log(`Port - 5000`);
});