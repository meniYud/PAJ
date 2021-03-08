import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'

import {Roles, isSimpleRole} from '../utils/consts.js'

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
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

const adminProtect = asyncHandler(async (req, res, next) => {
    if (req.user && req.role && req.role.name === Roles.PAJADMIN) {
        next();
    } else {
        res.status(401);
        throw new Error('Insufficient authorization')
    }
})

const roleCreatorProtect = asyncHandler(async (req, res, next) => {
    try {
        let token
        const {askToCreate = Roles.GUEST} = req.body
        

        if(isSimpleRole(askToCreate)) {
            next();
        }
        
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {

            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const creatorRole = await Role.findOne({ name: decoded.role });
            const askToCreateProps = await Role.findOne({ name: askToCreate });

            
            if (
                creatorRole.userCreator.isCreator &&
                creatorRole.userCreator.createdUserType) {
                
                const {createdUserType} = creatorRole.userCreator;

                if(createdUserType.indexOf(askToCreateProps._id) + 1) {
                    req.askToCreate = askToCreateProps;
                    next();
                } else {
                    res.status(401);
                    throw new Error('Insufficient creator authorization')
                }
            } else {
                res.status(401);
                throw new Error('Logged in user has no permissions to create user')
            }
        } else {
            res.status(401);
            throw new Error('Missing token');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

export {
    protect,
    adminProtect,
    roleCreatorProtect
}