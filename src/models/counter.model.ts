import mongoose, { Schema, Document } from 'mongoose';

export interface ICounter extends Document {
  modelName: string;
  count: number;
}

const CounterSchema: Schema = new Schema({
  modelName: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

export default mongoose.model<ICounter>('Counter', CounterSchema);
