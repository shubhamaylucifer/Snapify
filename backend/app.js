const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
 
//import routes      
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

// import errorhandler
const errorHandler = require("./middleware/error");
//const s3Router = require("./utils/uploadImages");
//db connect
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB Connected")).catch((err) => console.log(err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb"}));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

//auth routes middleware
app.use("/api", authRoutes);
app.use("/api", postRoutes);
//app.use(errorHandler);
//app.use("/image", s3Router);
 

//port
const port = process.env.PORT || 9000


app.listen(port , () => {
    console.log(`server running on port ${port}`)
})

