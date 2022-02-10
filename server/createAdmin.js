const connectDB = require('./config/db');
const bcrypt = require("bcryptjs");


connectDB();

const User = require("./models/User");

async function createAdmin () {
  const password="adm!nUser$%";
  const user = new User({
    name: "superadmin",
    email: "superadmin@curltoon.com",
    password,
    phoneNumber: "0",
    role: "admin",
    active:true
  });

const salt = await bcrypt.genSalt(10);

user.password = await bcrypt.hash(password, salt);

await user.save();
}

try{
    User.find({name:"superadmin"}).exec(function (err, results) {
    var count = results.length
    if (count==0){
        createAdmin();
        console.log("admin created successfully");
    }
    else {
        console.log("admin already created");
    }
  
  });
} catch(err){
    console.log(err);
}