const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors=require("cors")
const app = express();
const errorHandler = require("./middleware/errorHandling");
const authRouter = require("./routes/Auth");
const userRouter=require("./routes/User")
const countryRouter=require("./routes/Country")
const placeRouter=require("./routes/Place")
// const corsOptions = {
//   origin: "",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
//   optionsSuccessStatus: 204, // Set the preflight response status to 204
// };
app.use(express.json({ limit: "10mb" }));
// app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: "10mb", extended: "true" }));
app.use(errorHandler);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/country",countryRouter)
app.use("/api/v1/place",placeRouter)


dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));
const port = process.env.PORT || 3800;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
