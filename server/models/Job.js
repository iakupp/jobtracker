import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    status: { type: String, enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'], default: 'Applied' },
    notes: { type: String }
}, { timestamps: true });   

export default mongoose.model('Job', jobSchema);