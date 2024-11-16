import express from "express"
import connect from "./db.js"
import router from "./routes/contact-route.js";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();
const app=express();
const corsOptions = {
    origin: "http://localhost:5173", 
        credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use(express.json())
app.get('/', (req,res)=>{
res.send("hello from server")
})
const PORT= 9090;

app.use('/api/v1/', router);


app.listen(PORT, ()=>{
    connect()
    console.log(`server is running at ${PORT}`)
})
