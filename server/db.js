import mongoose from "mongoose"

const connect=()=>{

mongoose.connect('mongodb+srv://cdileepkumar22:uImmxPqBSLAbpdU9@cluster0.pgyvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then((res)=>{
    console.log("Conected to MONGODB")
}).catch((err)=>{
    console.log(err);
})

}

export default connect