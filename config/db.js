const mongoose = require('mongoose');

const connectDB = async () => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            //useFindAndModify: false
       });

       console.log(`
       MongoDB Connected: 
       Host: ${conn.connection.host}
       Port: ${conn.connection.port} 
       DB: ${conn.connection.name}
       Collections: ${conn.connection.collections}`);
       console.log();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;