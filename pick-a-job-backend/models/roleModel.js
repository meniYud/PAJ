import mongoose from 'mongoose';
import {aggregateRoles, Roles} from '../utils/consts.js';

const userCreatorSchema = mongoose.Schema({
    isCreator: {
        type: Boolean,
        required: true
    },
    createdUserType: {
        type: [String],
        enum: aggregateRoles(),
        required: false
    }
}, {
    timestamps: false,
    _id : false
})

const positionCreatorSchema = mongoose.Schema({
    isCreator: {
        type: Boolean,
        required: true
    },
    createdPositionType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies',
        required: false
    }
}, {
    timestamps: false,
    _id : false
})

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        enum: aggregateRoles(),
        default: Roles.GUEST,
        required: true
    },
    userCreator: userCreatorSchema,
    positionsCreator: positionCreatorSchema,
}, {
    timestamps: false
})

const Role = mongoose.model('Role', roleSchema);

export default Role;