const mongoose= require('mongoose')

const PizzaSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    pizza: {
        type:String,
        required:true},
    location:{
        type:String,
        required:true}
},
{timestamps:true}
)

const Pizza=mongoose.model("Pizza",PizzaSchema)
module.exports=Pizza