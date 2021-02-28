import asyncHandler from 'express-async-handler'
import Company from '../models/companyModel.js';
import Position from '../models/positionModel.js';

const getCompanyData = asyncHandler(async (id) => {
    if (id) {
        try {
            const company = await Company.findById(id).select('-companyAgents')
            if(company.companyPositions.length) {
                const positions = await Position.find({
                    '_id' : { $in: company.companyPositions }
                })
                company.companyPositions = [...positions];
            }
            return company;
        } catch (error) {
            throw new Error('fail to retrieve company data')
        }
    } else {
        throw new Error('company ID not specified')
    }
})

export {
    getCompanyData
}



        // const userRole = await Role.findById(user.role).select('name -_id');
        // let relatedEntities = null;
        // if (user?.relatedEntities?.company) {
        //     const company = await Company.findById(user.relatedEntities.company).select('-companyAgents')
        //     relatedEntities = { company };
        // }
        // return {
        //     ...user,
        //     role: userRole,
        //     relatedEntities
        // }