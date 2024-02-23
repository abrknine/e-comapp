

const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {

    console.log('MONGOURI:', process.env.MONGOURI);
    try {
        const conn = await mongoose.connect(process.env.MONGOURI, {
                     
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;