import mongoose, { Schema } from "mongoose";


const tokensSchema = new Schema(
  {
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true,unique: true },
   address: {
      detailed_address:{type:String, required:true},
      location:{
        lat:{type:Number},
        lng:{type:Number}
      }
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokensSchema);
export default Token;