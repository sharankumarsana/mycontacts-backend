const mongoose = require('mongoose')


const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Users"
    },
    name:{
        type: String,
        required: [true, "Please add name of the contact"]
    },
    email:{
        type: String,
        required:[true, "Please add the email"]
    },
    mobile:{
        type: String,
        required:[true, "please add the mobile number"]
    }
},
    {
        timestamps:true
    }
)
module.exports = mongoose.model("Contact",contactSchema)
