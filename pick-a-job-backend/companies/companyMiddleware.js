import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'

import {Roles, isPublicRole, isUserPowerAdminRole, getTokenFromRequest, findCreateePropsFromCreator} from '../utils/consts.js'

const viewCompanyDataProtect = asyncHandler(async (req, res, next) => {
    next();
})

const editCompanyDataProtect = asyncHandler(async (req, res, next) => {
    if (req.user && req.role && isUserAdminRole(req.role.name)) {
        next();
    } else {
        res.status(401);
        throw new Error('Insufficient authorization')
    }
})

const createCompanyProtect = asyncHandler(async (req, res, next) => {
    try {
        let token = getTokenFromRequest(req);
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const creatorDoc = await User.findById(decoded.id).select('-password')
            const creatorRoleDoc = await Role.findById(creatorDoc.role)
            const creatorRoleProps = creatorRoleDoc.toObject();
            const isAllowedToCreateCompany = isUserPowerAdminRole(creatorRoleProps.name)
            
            if (isAllowedToCreateCompany) {
                next();
            } else {
                res.status(401);
                throw new Error('Logged in user has no permissions to create company')
            }
        } else {
            res.status(401);
            throw new Error('Unable to create company due to missing creator token');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

const legitCompanyDataProtect = asyncHandler(async (req, res, next) => {
    try {
        let companyAdminData = req.body.companyAdmin
        
        if (companyAdminData && companyAdminData.email) {
            const userExist = await User.findOne({ email: companyAdminData.email });
            if (userExist) {
                res.status(400)
                throw new Error('company admin user already exist')
            }
            next();
        } else {
            res.status(401);
            throw new Error('Unable to create company due to missing creator token');
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

export {
    legitCompanyDataProtect,
    createCompanyProtect,
    editCompanyDataProtect,
    viewCompanyDataProtect
}