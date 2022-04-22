const express = require('express');
const res = require('express/lib/response');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('hello my personal world with restart')
});

app.use(cors());

//for getting body data
app.use(express.json());

const users = [
    { id: 1, name: 'sebok', email: 'sebok@gmail.com', phone: '01245' },
    { id: 2, name: 'roni', email: 'roni@gmail.com', phone: '03554' },
    { id: 3, name: 'biplob', email: 'biplob@gmail.com', phone: '01254' },
    { id: 4, name: 'nirob', email: 'nirob@gmail.com', phone: '54554' },
    { id: 5, name: 'saikot', email: 'saikot@gmail.com', phone: '4445' },
    { id: 6, name: 'sresto', email: 'sresto@gmail.com', phone: '5875' },
    { id: 7, name: 'juboraj', email: 'juboraj@gmail.com', phone: '854545' }
];

//filtered by search query parameter
app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(matched)
    } else {

        res.send(users)
    }
});

app.get('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    res.send(user);
});

app.post('/user', (req, res) => {
    console.log('request', req.body)
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user)
});

app.listen(port, () => {
    console.log('litstenint mama', port)
});