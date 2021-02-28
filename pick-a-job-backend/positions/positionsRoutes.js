import express from 'express';
import {getPositions, getPositionsByCompany} from './positionsControllers.js'
const router = express.Router()

router.route('/').get(getPositions)

router.route('/:id').get(getPositionsByCompany)



export default router;