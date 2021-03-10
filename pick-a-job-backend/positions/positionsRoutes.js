import express from 'express';
import {getPositions, getPositionsByCompany, createPosition, updatePosition, promotePosition} from './positionsControllers.js'
import {protectCreatePosition, protectUpdatePosition, deletePositionMiddleware} from './positionsMiddleware.js'
const router = express.Router()

router.route('/').get(getPositions).post(protectCreatePosition, createPosition)

router.route('/:id').get(getPositionsByCompany).put(protectUpdatePosition, updatePosition).delete(protectUpdatePosition, deletePositionMiddleware, updatePosition).post(promotePosition)



export default router;