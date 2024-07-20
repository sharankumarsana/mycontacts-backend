const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the user"]
    },
    email:{
        type:String,
        required:[true,"Please add user email"],
        unique: [true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true, "please add mobile"]
    }
},
{
    timestamps:true

})

module.exports = mongoose.model("Users",userSchema)