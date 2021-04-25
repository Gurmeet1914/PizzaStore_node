const { urlencoded } = require('express')
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const mongoUrl="mongodb://localhost:27017/PizzaStore"
const Pizza=require('./model/pizza')

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
mongoose.connect(mongoUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err)
    {
        console.log("error");
    }
    else{
        console.log("connected");
    }
})
app.get("/",(req,res)=>{
    Pizza.find().sort({createdAt:-1})
    .then((data)=>{
        res.render("index",{title:"home",orders:data})
    })
    .catch((err)=>
    {
      console.log("error ocuur");
    })
    
    
})

app.get("/about",(req,res)=>{
    res.render("about",{title:"about"})
})
app.get("/orders",(req,res)=>{
    res.render("order",{title:"order"})
})

app.post("/orders",(req,res)=>
{
  const pizza=new Pizza(req.body)
  pizza.save()
  .then(()=>{
      res.redirect("/")
      console.log("order taken");
  })
  .catch((err)=>
  {
      console.log("error occur in order");
  })
})
app.use((req,res)=>
{
    res.render("404",{title:"error"})
})


app.listen(4040,()=>{
    console.log("server is on 4040");
})