import mongoose from 'mongoose';
import { dbURI } from '../config/environment.js';

//connect to MongoDB
export function connectDb() {
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    return mongoose.connect(dbURI, opts);
}