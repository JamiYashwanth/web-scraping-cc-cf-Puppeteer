const express = require('express');
const app = express();
const cors = require('cors'); 
const codechef = require('./codechef')
const codeforces = require('./codeforces')
const {people} = require('./people')

app.use(express.json());
app.use(cors());


app.get('/info' , (req,res) => {
    res.send(people)
})

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})