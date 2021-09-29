const express = require('express');
const app = express();
const port = 9999;

const USER_ITEMS = [
    {
        username: 'kiwi',
        password: 'fruit',
    },
    {
        username: 'banana',
        password: 'fruit',
    },
    {
        username: 'apple',
        password: 'fruit',
    },
    {
        username: 'pear',
        password: 'fruit',
    },
    {
        username: 'carrot',
        password: 'vegetable',
    },
    {
        username: 'zuccini',
        password: 'vegetable',
    },
    {
        username: 'tomato',
        password: 'vegetable',
    },
    {
        username: 'onion',
        password: 'vegetable',
    },
]

app.use((req, res, next) => {
    console.log(`${req.method} for ${req.path} with param ${req.params}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/user-items', (req, res) => {
    res.send(USER_ITEMS);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})