const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messageRoutes')

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT,()=>{
    console.log(`Servern Started on PORT ${process.env.PORT}`)
})





