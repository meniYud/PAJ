import asyncHandler from 'express-async-handler'
import Company from '../models/companyModel.js';

const enrichPositionData = asyncHandler(async (positions = []) => {
    if (Array.isArray(positions)) {
        const companies = await Company.find({}).select('companyName cvsEmail companyDescription');
        const companyByID = companies.reduce((aggregator, singleComp) => {
            return {
                ...aggregator,
                [singleComp._id]: singleComp.toObject()
            }
        }, {})
        const enrichedPositions = positions.map((singlePosition) => {
            const {offeringCompany} = singlePosition;
            const positionCompany = companyByID[offeringCompany];
            return {
                ...singlePosition.toObject(),
                offeringCompany: positionCompany
            }
        })
        return enrichedPositions;
    } else {
        throw new Error('no positions were sent')
    }
})

export {
    enrichPositionData
}