const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
const getContacts = asyncHandler(async(req,res) => {
    console.log("getting all the contacts api",req.user);
    const contacts = await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts) }
)
const createContact = asyncHandler(async(req,res) => {
    console.log("creating a contact api");
    const {name,email,mobile} = req.body
    if(!name || !email || !mobile) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        mobile,
        user_id:req.user.id
    }
    )
    res.status(200).json(contact) })

const gettheContact = asyncHandler(async(req,res) => {
    console.log("getting a particular contact api");
    
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }

    // console.log(contact)
    res.status(200).json(contact)
})

const updateContact = asyncHandler(async(req,res) => {
    console.log("updating contact")
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found for updation")
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user is not allowed to update other's contact")

    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body,{new:true})
    console.log("updating the contact api");
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler(async(req,res) => {
    console.log("deleting contact")
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404)
        throw new Error("contact not found for deletion")
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user is not allowed to delete other's contact")

    }
    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({message:`Deleting the contact of id ${req.params.id}`})
})

module.exports = {getContacts,createContact ,gettheContact,updateContact,deleteContact}

// mongodb+srv://sanasharankumar:pKncwHZFPcWRbNKX@cluster0.sbq41zd.mongodb.net/