import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler'
import Company from '../models/companyModel.js';
import Position from '../models/positionModel.js'
import {enrichPositionData} from './positionDataEnrich.js';
import { PositionStatus } from '../utils/consts.js';

// @desc    Fetch all positions
// @route   GET /api/positions
// @access  Public
const getPositions = asyncHandler (async (req, res) => {
    const positions = await Position.find({}).select('-offeringAgent');

    if(positions) {
        const enrichedPositions = await enrichPositionData(positions)
        res.json(enrichedPositions)
    } else {
        res.status(404)
        throw new Error('positions not found')
    }
})


// @desc    Fetch all positions of company
// @route   GET /api/positions/:id
// @access  Public
const getPositionsByCompany = asyncHandler (async (req, res) => {
    const positions = await Position.find({
        'offeringCompany' : { $eq: req.params.id }
    })
    if(positions) {
        const enrichedPositions = await enrichPositionData(positions)
        res.json(enrichedPositions);
    } else {
        res.status(404)
        throw new Error('positions not found')
    }
})

// @desc    CreatesNewPosition
// @route   POST /api/positions/
// @access  Private
const createPosition = asyncHandler (async (req, res) => {
    const {
        offeredReward,
        positionStatus = PositionStatus.ACTIVE,
        offeringCompany,
        offeringAgent,
        positionDisplayId,
        positionName,
        subPositionName,
        positionDescription,
        positionLocation,
        requiredExperience
    } = req.body;

    try {
        const position = await Position.create({
            offeredReward,
            positionStatus,
            offeringCompany: mongoose.Types.ObjectId(offeringCompany),
            offeringAgent: mongoose.Types.ObjectId(offeringAgent),
            positionDisplayId,
            positionName,
            subPositionName,
            positionDescription,
            positionLocation,
            requiredExperience
        })
        if (position && position._id) {
            res.status(201).json({
                _id: position._id,
                offeredReward,
                positionStatus,
                offeringCompany,
                offeringAgent,
                positionDisplayId,
                positionName,
                subPositionName,
                positionDescription,
                positionLocation,
                requiredExperience,
            })
        } else {
            res.status(400)
            throw new Error('Failed to create position')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


// @desc    Update position
// @route   PUT /api/positions/:positionID
// @access  Private
const updatePosition = asyncHandler(async (req, res) => {
    const {
        offeredReward,
        positionStatus,
        offeringCompany,
        offeringAgent,
        positionDisplayId,
        positionName,
        subPositionName,
        positionDescription,
        positionLocation,
        requiredExperience
    } = req.body;

    try {
        const position = await Position.findById(req.params.id)

        if (position) {
            position.offeredReward = offeredReward || position.offeredReward;
            position.positionStatus = positionStatus || position.positionStatus;
            position.positionDisplayId = positionDisplayId || position.positionDisplayId;
            position.positionName = positionName || position.positionName;
            position.subPositionName = subPositionName || position.subPositionName;
            position.positionDescription = positionDescription || position.positionDescription;
            position.positionLocation = positionLocation || position.positionLocation;
            position.requiredExperience = requiredExperience || position.requiredExperience;

            const updatedPosition = await position.save();

            res.status(202).json({
                _id: updatedPosition._id,
                offeredReward: updatedPosition.offeredReward,
                positionStatus: updatedPosition.positionStatus,
                offeringCompany: updatedPosition.offeringCompany,
                offeringAgent: updatedPosition.offeringAgent,
                positionDisplayId: updatedPosition.positionDisplayId,
                positionName: updatedPosition.positionName,
                subPositionName: updatedPosition.subPositionName,
                positionDescription: updatedPosition.positionDescription,
                positionLocation: updatedPosition.positionLocation,
                requiredExperience: updatedPosition.requiredExperience
            })
        } else {
            throw new Error('Fail to update position')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const deletePosition = asyncHandler(async (req, res) => {
    try {
        const deletedPosition = await Position.findByIdAndDelete(req.params.id)

        if (deletedPosition.toObject()._id === req.params.id) {
            res.status(200).json({})
        } else {
            throw new Error('you asked to delete position that does not exist in DB')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

export {
    getPositions,
    getPositionsByCompany,
    createPosition,
    updatePosition,
    deletePosition
}