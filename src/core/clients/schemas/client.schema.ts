import { model, Schema } from 'mongoose';

const schema = new Schema(
  {
    completeName: String,
    gender: String,
    birthdate: Date,
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City'
    }
  },
  {
    timestamps: true
  }
);

export default model('Client', schema);
