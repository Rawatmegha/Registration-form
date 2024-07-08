const express = require("express")
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");

const app=express();
dotenv.config();

const port = process.env.PORT ||3000;

const username=process.env.MONGODB_USERNAME; 
const password =process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.umzy2ys.mongodb.net/registrationFormDB`,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
});
const registrationSchema=new mongoose.Schema({
    name :String,
    email :String,
    password :String
});

const Registration=mongoose.model("Registration",registrationSchema);
app.use{bodyparser.urlencoded ({extended:true})};
app.use{bodyparser.json()};
app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/BHARATINTERN1/index.html");
})

app.post("/register",async(req,res)=>{
    try{
       const {name,email,password}=req.body;
       const registrationData=new Registration({
        name,
        email,
        password
       });
      await registrationData.save();
      res.redirect("/success");
    }
    catch(error){
        console.log("error")
        res.redirect("error");

    }
})
app.get("/success",(rec,res)=>{
    res.sendFile
}

app.listen(port, ()=>{
     console.log(`yessss server is running ${port}`);

})