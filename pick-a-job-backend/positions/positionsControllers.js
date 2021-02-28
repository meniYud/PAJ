import asyncHandler from 'express-async-handler'
import Position from '../models/positionModel.js'
import {enrichPositionData} from './positionDataEnrich.js'

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

export {
    getPositions,
    getPositionsByCompany
}