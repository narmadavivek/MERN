const mongoose = require("mongoose")

const dbUrl = "mongodb+srv://mern:GPwttUPc5x96mYV3@cluster0.e3stebm.mongodb.net/mern_admin?retryWrites=true&w=majority";

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, connectionParams)
.then(()=>{
    console.log("connected to db successfully");
})
.catch((e)=>{
    console.log("error:", e)
});