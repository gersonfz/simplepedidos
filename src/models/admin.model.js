import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    personalName: String,
    personalEmail: { type: String, unique: true, required: true },
    personalPhone: String,
    password: String,
    brandName: String,
    brandEmail: { type: String, unique: true, required: true },
    brandPhone: String,
    brandLocation: String,
    costDelivery: Number,
    brandInstagram: String
});


export default mongoose.model('Admin', adminSchema);
