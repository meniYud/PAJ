import mongoose from 'mongoose';
import {PositionStatus, aggregatePositionStatus} from '../utils/consts.js';

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
}, {
    timestamps: true
});

const Position = mongoose.model('Position', positionSchema);

export default Position;