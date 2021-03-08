import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Company from '../models/companyModel.js';

import {getCompanyData} from '../utils/dataGetters.js'

const enrichUserData = asyncHandler(async (user) => {
    if (user) {
        const userRole = await Role.findById(user.role).select('name userCreator -_id');
        let relatedEntities = null;
        if(user?.relatedEntities?.company) {
            const company = await getCompanyData(user?.relatedEntities?.company)
            relatedEntities = {company};
        }
        return {
            ...user,
            role: userRole,
            relatedEntities
        }
    } else {
        throw new Error('user was not sent')
    }
})

export {
    enrichUserData
}