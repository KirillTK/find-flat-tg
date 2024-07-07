import mongoose from 'mongoose';
import { Apartment } from '../types';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/flats';

export const connection = mongoose.createConnection(mongoUrl);


const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  chatId: { type: String, unique: true, required: true },
});

const FlatSchema = new Schema({
  previewUrl: String,
  name: String,
  price: String,
  rooms: String,
  czynsz: String,
  meters: String,
  location: String,
  urlToApartment: { type: String, unique: true, required: true },
  createdAt: String,
  validUntil: String,
  sent: Boolean,
  chatId: String,
});


export const FlatModel = connection.model('Flat', FlatSchema);


export const saveFlat = async (apartments: Apartment[]) => {
  try {
    await FlatModel.insertMany(apartments, { ordered: false });
  } catch (error) {
    console.error(error);
  }
}
