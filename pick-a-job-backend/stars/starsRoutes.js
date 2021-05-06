import express from 'express';
import {getPromotedByStar, promotePositionByStar, removePromotionByStar} from './starsControllers.js'
import {protectStarMiddleware} from './starsMiddleware.js'
const router = express.Router()

router.route('/').get(protectStarMiddleware, getPromotedByStar)

router.route('/:id').post(protectStarMiddleware, promotePositionByStar).delete(protectStarMiddleware, removePromotionByStar).get().put()



export default router;