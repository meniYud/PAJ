import mongoose from 'mongoose';
import Company from './companyModel.js';
import {PositionStatus, aggregatePositionStatus} from '../utils/consts.js';

const relatedCompanySchema = mongoose.Schema({
    company: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
}, {
    timestamps: false,
    _id: false
});

const positionSchema = mongoose.Schema({
    offeringCompany: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    offeringAgent: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    positionDisplayId: {
        type: String,
        required: true,
    },
    positionName: {
        type: String,
        required: true,
    },
    subPositionName: {
        type: String,
        required: false,
    },
    positionDescription: {
        type: String,
        required: true,
    },
    offeredReward: {
        type: Number,
        required: true,
        default: 0.0
    },
    positionStatus: {
        type: String,
        enum: aggregatePositionStatus(),
        default: PositionStatus.SUSPENDED,
        required: true
    },
    positionLocation: {
        type: String,
        required: true,
    },
    requiredExperience: {
        type: String,
        required: true,
    },
    relatedEntities: {
        type: relatedCompanySchema,
        required: false
    }
}, {
    timestamps: true
});



positionSchema.post('save', async function (doc) {
    try {
        const company = await Company.findById(doc.offeringCompany._id)
        if(!company.companyPositions.includes(doc._id)){
            company.companyPositions.push(doc._id)
            await company.save()
        }
    } catch (error) {
        throw new Error(`position was created, but unable to update company. company update failed with error: ${error}`)
    }
})

const Position = mongoose.model('Position', positionSchema);

export default Position;