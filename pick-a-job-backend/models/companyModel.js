import mongoose from 'mongoose';

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    cvsEmail: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true,
    },
    companyAgents: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
        required: false,
        default: []
    },
    companyPositions: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Position' }],
        required: false,
        default: []
    }
}, {
    timestamps: true
});

const Company = mongoose.model('Company', companySchema);

export default Company;