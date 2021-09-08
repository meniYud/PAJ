import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'

import {Roles, isPublicRole, isUserAdminRole, getTokenFromRequest, findCreateePropsFromCreator} from '../utils/consts.js'

const protect = asyncHandler(async (req, res, next) => {
    let token = getTokenFromRequest(req);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            req.role = await Role.findById(req.user.role)
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not Authorized... token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

const userAdminProtect = asyncHandler(async (req, res, next) => {
    if (req.user && req.role && isUserAdminRole(req.role.name)) {
        next();
    } else {
        res.status(401);
        throw new Error('Insufficient authorization')
    }
})

const roleCreatorProtect = asyncHandler(async (req, res, next) => {
    try {
        let token
        const {creationRole = Roles.GUEST} = req.body;

        const creationPropsDoc = await Role.findOne({name: creationRole});
        const creationProps = creationPropsDoc.toObject();
        
        if(isPublicRole(creationProps?.name)) {
            body.creationProps = creationProps;
            next();
        } else {
            token = getTokenFromRequest(req);
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                const creatorUserDoc = await User.findById(decoded.id).select('-password')
                const creatorUserProps = creatorUserDoc.toObject();
                const creatorRoleDoc = await Role.findById(creatorUserDoc.role)
                const creatorRoleProps = creatorRoleDoc.toObject();
                const creatorProps = {...creatorUserProps, ...creatorRoleProps}

                const createdUserType = findCreateePropsFromCreator(creatorProps);
                const createdUserRoleDoc = await Role.findOne({name: createdUserType.role})
                const createdUserProps = {_id: createdUserRoleDoc._id, relatedEntities: createdUserType.relatedEntities}
                
                if (createdUserType) {
                    req.creationProps = createdUserProps;
                    next();
                } else {
                    res.status(401);
                    throw new Error('Logged in user has no permissions to create other users')
                }
            } else {
                res.status(401);
                throw new Error('Unable to create user due to missing creator token');
            }
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

export {
    protect,
    userAdminProtect,
    roleCreatorProtect
}