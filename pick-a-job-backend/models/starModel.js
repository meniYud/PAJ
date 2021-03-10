import mongoose from 'mongoose';

const starSchema = mongoose.Schema({
    _id: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    promotedPositions: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Position' }],
        required: false,
        default: []
    },
    fulfilledPositions: {
        type: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Position' }],
        required: false,
        default: []
    }
}, {
    timestamps: true,
    _id: false
});

const Star = mongoose.model('Star', starSchema);

export default Star;