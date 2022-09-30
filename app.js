const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const md5 = require('md5');
const User = require('./models/user.model');
dotenv.config();


const app = express();
app.use(express.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.use(cors());

const dbURL =process.env.DB_URL;

mongoose.connect(dbURL)
.then(()=>{
    console.log('Connected to MongoDB Database');
})
.catch((error)=>{
    console.log(error);
    process.exit(1);
})




app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/./views/index.html");
});

app.post("/register",async (req,res)=>{
   
    try {
        
        const newUser= new User({
            email: req.body.email,
            password: md5(req.body.password),
        });
        await  newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: error});
    }

});

app.post("/login", async(req,res)=>{
    try {
        const email= req.body.email;
        const password= md5(req.body.password);
        const user = await User.findOne({email: email});
        if (user && user.password === password){
            res.status(200).json({message:"valid user"});
        }else {
            res.status(500).json({message:"not valid user"});
        }
  
      
    } catch (error) {
        res.status(500).json({error: error});
    }

   
 });

//route middleware

app.use((req, res, next) => {
    res.status(404).json({message: '404 Not Found'})
})

//server middleware

app.use((err,req, res, next) => {
    res.status(500).json({message: 'something is broken '})
});

module.exports =app;