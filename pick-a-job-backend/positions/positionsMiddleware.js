import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Company from '../models/companyModel.js'

import {Roles, isPublicRole} from '../utils/consts.js'

const protectCreatePosition = asyncHandler(async (req, res, next) => {
    const {offeringCompany, offeringAgent} = req.body;
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const userDoc = await User.findById(decoded.id).select('_id relatedEntities role')
            const userID = userDoc?._id.toJSON()
            const userCompanyID = userDoc?.relatedEntities?.company?.toJSON()
            const roleDoc = await Role.findById(userDoc.role)
            const role = roleDoc.toObject()
            if(
               offeringAgent === userID &&
               offeringCompany === userCompanyID &&
               role.positionsCreator.isCreator) {
                   next();
            } else {
                throw new Error('Current user is not authorized to create positions')
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

const protectUpdatePosition = asyncHandler(async (req, res, next) => {
    const updatedPositionId = req.params.id;
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            const userDoc = await User.findById(decoded.id).select('_id relatedEntities role')
            const userCompanyID = userDoc?.relatedEntities?.company
            const company = await Company.findById(userCompanyID)            
            
            const roleDoc = await Role.findById(userDoc.role)
            const role = roleDoc.toObject()
            if(
                company.companyPositions.includes(updatedPositionId) &&
                role.positionsCreator.isCreator) {
                   next();
            } else {
                throw new Error('Current user is not authorized to update positions')
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

const deletePositionMiddleware = asyncHandler(async (req, res, next) => {
    req.body = {
        positionStatus: 'DELETED'
    }
   next();
})


export {
    protectCreatePosition,
    protectUpdatePosition,
    deletePositionMiddleware
}