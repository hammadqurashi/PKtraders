import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const connectToMongo = async () => {
  if (mongoose.connections[0].readyState) {
    return console.log("MongoDb Already Connected");
  } else {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Connected to Mongo Successfully"))
      .catch((err) => console.log(err));
  }
};

module.exports = connectToMongo;
