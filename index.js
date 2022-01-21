const express = require('express');
const app = express();
const cors = require('cors'); 
const codechef = require('./codechef')
const codeforces = require('./codeforces')
const ccprofile = require('./ccprofile')
const cfprofile = require('./cfprofile')
const {people} = require('./people')

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());


app.get('/info' , (req,res) => {
    res.send(people)
})

app.get('/info/codechef/:id' , ccprofile)
app.get('/info/codeforces/:id' , cfprofile)

app.listen(PORT, () => {
    console.log("Server is running on port 5000")
})