var mongoose = require("mongoose");

export default () => {
  mongoose.Promise = global.Promise;

  mongoose
    .connect("mongodb://localhost:27017/meetings", { useNewUrlParser: true })
    .catch(error => console.log(error));
  mongoose.set("useUnifiedTopology", true);

  mongoose.connection
    .once("open", () => {
      console.log("mongodb is running.");
    })
    .on("connected", () => console.log("Connected"))
    .on("error", err => {
      console.log("Connection failed with - ", err);
    })
    .on("disconnected", () => console.log("Disconnected"));
};
