import mongoose from 'mongoose';

const techSwapSchema = mongoose.Schema({
    item: { type: String, required: true },
    dateAdded: { type: Date, required: true, default: Date.now },
    condition: { type: String, required: true },
    owner: { type: String, required: true },
    contactNo: String,
    email: { type: String, required: true} ,
    available: { type: Boolean, required:true, default: true },
    preferredSwap: String,
    giveAway: { type: Boolean, required: true, default: false }
});

export default mongoose.model('TechSwap', techSwapSchema);