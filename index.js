import express from "express";
import { connectUsingMongoose } from "./src/config/mongoose.js";
import User from "./src/feature/repository.js";
import cors from "cors";

// Creating an Express application
const app = express();
const port = 5000; // Set the port number
app.use(express.json())
app.use(cors())

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, world! This is your Express server.');
});

const user = new User();

app.post("/add/:id", (req, res) => {
    console.log("data from frontend", req.params);
    user.addData(req, res)
})

app.get("/get", (req, res) => {
    user.getData(req, res)
})

app.delete('/delete/:id', (req, res) => {
    user.delete(req, res)
});

app.post("/sendData",(req,res) => {
    console.log("lululuu",req.body);
        user.sendData(req,res)
})

// Start the server and listen on the specified port
app.listen(port, () => {
    // console.log(`Server is running on http://localhost:${port}`);
    connectUsingMongoose()

});
