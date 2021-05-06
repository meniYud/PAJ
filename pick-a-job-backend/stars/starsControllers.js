import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler'
import Position from '../models/positionModel.js';
import Star from '../models/starModel.js'
import { PositionStatus } from '../utils/consts.js';


// @desc    Fetch all promotions of logged-in star
// @route   GET /api/stars/
// @access  Private
const getPromotedByStar = asyncHandler(async (req, res) => {
    const {starID} = req.body;
    try {
        const promotions = await Star.findById(starID).select('-_id');

        if (promotions) {
            res.json(promotions)
        } else {
            throw new Error('promotions not found')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
})

// @desc    add new promotion to logged-in star promotions
// @route   POST /api/stars/:key
// @access  Private
const promotePositionByStar = asyncHandler(async (req, res) => {
    const {starID} = req.body;
    const positionID = req.params.id;

    try {
        const promotions = await Star.findById(starID);
        const position = await Position.findById(positionID).select("_id positionStatus");

        if (position && promotions) {

            if(!promotions.promotedPositions.includes(position._id) && position.positionStatus === PositionStatus.ACTIVE){
                promotions.promotedPositions.push(position._id)
                await promotions.save()
            }

            res.status(202).json(promotions)
        } else {
            throw new Error('Fail to update position')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// @desc    remove position from logged-in star promotions
// @route   DELETE /api/stars/:key
// @access  Private
const removePromotionByStar = asyncHandler(async (req, res) => {
    const {starID} = req.body;
    const positionID = req.params.id;

    try {
        const promotions = await Star.findById(starID);
        const position = await Position.findById(positionID).select("_id positionStatus");

        if (position && promotions && promotions.promotedPositions.includes(position._id)) {
            promotions.promotedPositions.pull(positionID)

            await promotions.save();

            res.status(202).json(promotions)
        } else {
            throw new Error('Fail to update position')
        }
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

export {
    getPromotedByStar,
    promotePositionByStar,
    removePromotionByStar
}