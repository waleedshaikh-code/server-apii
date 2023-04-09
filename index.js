const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const authRoutes = require("./Router/AuthRoutes");
const cookieParser = require("cookie-parser");
const Profile = require("./Models/ProfileModal");
// app.use(cors({
//     origin: ["http://localhost:3000"] ,
//     method:["GET", "POST"],
//     Credentials:true
// }));
// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);    

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/createProfile", async (req, res) => {
  let data = new Profile(req.body);
  let result = await data.save();
  console.log(req.body);
  res.send(result);
});

app.get("/profile", async (req, res) => {
  const myData = await Profile.find({});
  res.status(200).json( myData );
});

app.put("/updateProfile/:id", async (req,res) =>{
  console.log(req.params)
  let data = await Profile.findOneAndUpdate(
    req.params,
    {
      $set: req.body.firstName,
      $set: req.body.lastName,
      $set: req.body.email,
      $set: req.body.phone,
      $set: req.body.nic,


    }
  );
  res.send(data)
})

app.listen(5000, () => {
  console.log("Server is running on port 8000");
});
