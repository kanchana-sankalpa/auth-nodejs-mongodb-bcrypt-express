const Mongoose = require('mongoose');

let connectDB = async function () {
    try {
        const conn = await Mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
       return Mongoose.connection
                .once("open", function () {
                    //console.log("DB Connected!");
                    console.log(`MongoDB connected: ${conn.connection.host}`);
                })
                .on("error", function (error) {
                    console.log("Error is: ", error);
                });
                
    } catch (err) {
        console.log(err);

    }
}
//const connectDB = async () => {
   
//};

module.exports = connectDB;