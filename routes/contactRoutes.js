const express = require('express')
const router = express.Router();
const  {getContacts,createContact ,gettheContact,updateContact,deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validTokenHandler');


router.use(validateToken)

router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(gettheContact).put(updateContact).delete(deleteContact)
            
        
module.exports = router