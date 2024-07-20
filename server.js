const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config()
const app = express();
const PORT = process.env.PORT

connectDb();
app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(PORT , () => {
    console.log("Server running on ",PORT)
})
