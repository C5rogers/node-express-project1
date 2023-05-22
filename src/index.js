const express = require('express')
    // requireing the express from the express library from function that will return the express app
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// the above will create the express app
const PORT = 3001;
app.listen(PORT, () => console.log(`Running Express Server On Port:${PORT}`))

const grocerieList = [{
    item: "milk",
    quantity: 1,
}, {
    item: "alcholic drinks",
    quantity: 10,
}, {
    item: "shrop",
    quantity: 4,
}]

app.get('/groceries', (request, responce) => {
    responce.send(
        grocerieList
    );
});

app.post('/groceries', (request, responce) => {
    grocerieList.push(request.body)
    responce.sendStatus(201);
});