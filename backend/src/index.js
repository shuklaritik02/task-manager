import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
});


import app from "./app.js";
import connectdb from "./db/connectdb.js"

const Port = process.env.PORT || 8000;



// Connect to the database
connectdb()
    .then(()=>{
        app.listen(Port, ()=> {
            console.log(`Server is running on port ${Port}`);
        })
    })
    .catch((error) => {
        console.error("Failed to connect to the database:", error);
    })


