import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Company from '../models/companyModel.js'

import {Roles, isSimpleRole} from '../utils/consts.js'


const protectStarMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userDoc = await User.findById(decoded.id).select('_id relatedEntities role')
            const userID = userDoc?._id.toJSON()

            const roleDoc = await Role.findById(userDoc.role)
            const role = roleDoc.toObject()
            if(role.name === Roles.STAR) {
                req.body = {
                    starID: userDoc?._id
                }
                   next();
            } else {
                throw new Error('Current user is not authorized as a star')
            }
        } catch (error) {
            res.status(401);
            throw new Error(error)
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})



export {
    protectStarMiddleware
}