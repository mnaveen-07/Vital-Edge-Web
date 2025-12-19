import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  medicalId: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  email: { type: String, required: false }, 
}, { timestamps: true });

// This check prevents Next.js from trying to create the model again every time you reload
const User = models.User || model("User", UserSchema);

export default User;