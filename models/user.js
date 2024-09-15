import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
// The "models" object is provided by the Mongoose library and stores all the registered models
// If the model named 'User' is already exists in the 'model' object, it assigns that existing model to the 'User' variable.
// This prevents the redefining the model and ensures that the existing model is reused

// If model names 'User' in not exists in the 'model' object, the 'model' function from the Mongoose library is called to create the model new model
// The newly created model is then assigned to the 'User' variable
