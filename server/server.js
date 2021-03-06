const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Init Middleware
app.use(express.json({ extended: false }));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
///entrepreneur routes
app.use('/api/entrepreneur/lab', require('./routes/api/entrepreneur/lab'));
app.use("/api/entrepreneur/settings",require("./routes/api/entrepreneur/settings"));
app.use('/api/entrepreneur/project', require('./routes/api/entrepreneur/studio'));
app.use('/api/entrepreneur/team', require('./routes/api/entrepreneur/team'));


//freelancer routes
app.use('/api/freelancer/profile', require('./routes/api/freelancer/profile'));



//admin
app.use('/api/admin', require('./routes/api/admin/admin'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
