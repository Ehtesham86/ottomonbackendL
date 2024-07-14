const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose
        .connect('mongodb+srv://buttehtesham86:dbottomon123@dbottomon.aetwhlx.mongodb.net/',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        })
        .then(() => console.log('Connected Successfully'))
        .catch((err) => console.error('Not Connected',err));
}

module.exports = connectDB;

