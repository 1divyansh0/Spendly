require('dotenv').config()

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRouter");
const incomeRouter = require("./routes/incomeRouter");
const expenseRouter = require("./routes/expenseRouter");
const dashboardRouter = require("./routes/dashboardRouter")
const app = express();

//middleware to handle cors ;
app.use(
    cors({
        origin:process.env.CLIENT_URL||"*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
   })
);

app.use(express.json());
connectDB();

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/income",incomeRouter)
app.use("/api/v1/expense",expenseRouter);
app.use("/api/v1/dashboard",dashboardRouter);

//serve uploads folder ;
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on post ${PORT}`))

  


