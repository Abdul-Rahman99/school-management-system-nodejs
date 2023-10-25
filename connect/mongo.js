const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(
      "mongodb+srv://mrabdo1213:sVi7hV9528qt7Nc0@schoolcluster.ifagn1i.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((conn) => {
      console.log(`Database connected Successfully: ${conn.connection.host}`);
    });
  // .catch((err)=> {
  //     console.log(`Error in Database ${err}`)
  //     process.exit(1) ;
  // });
};

module.exports = dbConnection;
