import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    name: String,
    state: String
  },
  {
    timestamps: true
  }
);

export default model('City', schema);
