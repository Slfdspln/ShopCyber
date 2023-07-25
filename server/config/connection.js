const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ShopCyber');

module.exports = mongoose.connection;

// mongodb+srv://ttonyyu98:<password>@bootcamp.wmdbgvz.mongodb.net/?retryWrites=true&w=majority

// jjQWpsm4sy1QREAy

// ttonyyu98