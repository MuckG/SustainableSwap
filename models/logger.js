import mongoose from 'mongoose';

const LoggerSchema = mongoose.Schema ({
    serverIP: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    id: { type: String },
    request: { type : String, required: true },
    requestJSON: { type: String }
});

export default mongoose.model('Logger', LoggerSchema);