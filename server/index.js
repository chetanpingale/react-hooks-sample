var express = require('express')
var cors = require('cors');
var bodyParser = require('body-parser')

var data = require('./data.js');
var app = express()

let userData = data;

app.use(cors());
app.use(bodyParser.json());

app.get('/users', function (req, res, next) {
    res.json({users: userData});
})

app.post('/user/edit', function (req, res, next) {
    console.log("Edit User: "+JSON.stringify(req.body));
    const {id} = req.body;
    userData.forEach(u => {
        if(Number(u.id) === Number(id)) {
            console.log('TRUE');
            u.first_name = req.body.first_name;
            u.last_name = req.body.last_name;
            u.email = req.body.email;
        }
    });
    console.log(userData);
    res.send(204);
})

app.post('/user/add', function (req, res, next) {
    console.log("Add User: "+JSON.stringify(req.body));
    const newUser = req.body;
    let id = userData.length > 0 ? userData[0].id : 1;

    if(userData.length  === 0) {
        userData = [newUser]
    } else {
        userData.forEach(u => {
            if(Number(u.id) > Number(id)) {
                id = u.id
            }
        });
        id++;
    }
    newUser.id = id;
    userData.push(newUser)
    console.log(userData);
    res.send(204);
})

app.post('/user/delete', function (req, res, next) {
    console.log("Delete: "+JSON.stringify(req.body));
    const {userId} = req.body;
    const index = userData.findIndex(u => u.id === userId);
    userData.splice(index, 1);
    res.send(204);
})

app.listen(7000, function () {
    console.log('CORS-enabled web server listening on port 7000')
})