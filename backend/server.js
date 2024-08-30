import express, { json } from "express";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import postRoute from "./routes/post.Routes.js";
import notificationRoutes from "./routes/notification.route.js";


import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import connectMongoDB from "./db/connect.mongooes.js";
import cookieParser from "cookie-parser";
dotenv.config();
cloudinary.config({
	cloud_name:"djek3leqz",

	api_key: "982387143765539",
	api_secret: "Ytt-RAlEw10NhqcK9YBwk8nAGrI",
});


const app = express();
app.use(express.json({limit:"5mb"}));
const port =10000 ;
// console.log(process.env.);

app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/notifications", notificationRoutes);


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
    connectMongoDB();
})