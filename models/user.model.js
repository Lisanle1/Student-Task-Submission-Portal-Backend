const mongoose=require('mongoose');
const validator=require('validator')

//defining Schema
const userScheme= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true,
        trim:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value) 
        }
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Mentor","Student"],
        default:""
    },
    resetToken:{
        type:String
    }
});

module.exports=mongoose.model('Users',userScheme);