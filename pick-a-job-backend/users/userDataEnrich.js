import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Company from '../models/companyModel.js';

import {getCompanyDataWithPositions} from '../utils/dataGetters.js'
import { Roles } from '../utils/consts.js';

const enrichUserData = asyncHandler(async (user) => {
    if (user) {
        const userRole = await Role.findById(user.role).select('name userCreator -_id');
        let relatedEntities = null;
        if(user?.relatedEntities?.company) {
            const company = await getCompanyDataWithPositions(user?.relatedEntities?.company)
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

const _getCompanyAgents = asyncHandler(async (id) => {
    const users = await User.find({relatedEntities: {company: id}}).select('-password');
    const compAdminRoleId = await Role.findOne({name: Roles.COMPANYADMIN });
    const compAgentRoleId = await Role.findOne({name: Roles.COMPANYAGENT });
    const enrichedUsers = users.map((user) => {
        const userProps = user.toObject();
        return {
            _id: userProps._id,
            email: userProps.email,
            name: userProps.name,
            relatedEntities: userProps.relatedEntities,
            isCompAdmin: user.get('role').toString() === compAdminRoleId.get('_id').toString(),
            isCompAgent: user.get('role').toString() === compAgentRoleId.get('_id').toString(),
        }
    })
    return enrichedUsers;
})

const _setUserAsCompanyAgent = asyncHandler(async (userId, companyId) => {
    try{
        const companyDOC = await Company.findById(companyId);
        const compAgents = companyDOC.get('companyAgents')
        let companyAgents = [...compAgents];
        companyAgents.push(userId);
        companyDOC.companyAgents = companyAgents;
        const updatedCompany = await companyDOC.save();
        return {success: true, companyData: updatedCompany};
    } catch (error) {
        return {success: false}
    }
})

const _removeUserAsCompanyAgent = asyncHandler(async (userId, companyId) => {
    try{
        const companyDOC = await Company.findById(companyId);
        const compAgents = companyDOC.get('companyAgents')
        let companyAgents = [...compAgents];
        const filteredAgents = companyAgents.filter((userDoc) => {
            const currentUserId = userDoc.toJSON()
            const userToDeleteId = userId
            if(currentUserId === userToDeleteId){
                return false
            }
            return true;
        });
        companyDOC.companyAgents = filteredAgents;
        const updatedCompany = await companyDOC.save();
        return {success: true, companyData: updatedCompany};
    } catch (error) {
        return {success: false}
    }
    
})

export {
    enrichUserData,
    _getCompanyAgents,
    _setUserAsCompanyAgent,
    _removeUserAsCompanyAgent
}