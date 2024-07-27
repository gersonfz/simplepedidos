import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    personalName: String,
    personalEmail: { type: String, unique: true, required: true },
    personalPhone: { type: String, unique: true, required: true },
    password: String,
    brandName: { type: String, unique: true, required: true },
    brandEmail: { type: String, unique: true, required: true },
    brandPhone: { type: String, unique: true, required: true },
    brandLocation: String,
    costDelivery: Number,
    brandInstagram: { type: String, unique: true, required: true }
});

adminSchema.methods.toJSON = function () {
    const admin = this.toObject();
    delete admin.password;
    return admin;
};

export default mongoose.model('Admin', adminSchema);
