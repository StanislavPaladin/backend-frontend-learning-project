import express from "express";
import mongoose from 'mongoose';
import router from "./router.js";
import fileUpload from "express-fileupload";

const PORT = 5000
const DB_URL = `mongodb+srv://Admin:ltcntvgth1@cluster0.nr3hg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()
app.use(express.json())
app.use(fileUpload({}))
/*  ednpoints */ 
app.use('/api', router) //обрабатывает запросы, которые идут после /api  (http://localhost:5000/api/posts   etc.)



async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology:true, useNewUrlParser: true})
        app.listen(PORT, () => console.log('Server startet at port: ' + PORT))
    } catch (e) {
        console.log(e);
    }
}

startApp()