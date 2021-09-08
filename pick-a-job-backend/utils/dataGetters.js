import asyncHandler from 'express-async-handler'
import Company from '../models/companyModel.js';
import Position from '../models/positionModel.js';
import User from '../models/userModel.js'

const getCompanyDataWithPositions = asyncHandler(async (id) => {
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

const getCompanyDataWithAgents = asyncHandler(async (id) => {
    if (id) {
        try {
            const company = await Company.findById(id)
            if(company.companyPositions.length) {
                const positions = await Position.find({
                    '_id' : { $in: company.companyPositions }
                })
                company.companyPositions = [...positions];
            }
            if(company.companyAgents.length) {
                const agents = await User.find({
                    '_id' : { $in: company.companyAgents }
                }).select('-password')
                company.companyAgents = [...agents];
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
    getCompanyDataWithPositions,
    getCompanyDataWithAgents
}
