import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import Role from '../models/roleModel.js';
import Company from '../models/companyModel.js';
import {Roles} from '../utils/consts.js';
import {_setUserAsCompanyAgent} from '../users/userDataEnrich.js';


// @desc    create new company
// @route   POST /api/companies
// @access  power admin
const createCompany = asyncHandler(async (req, res) => {
    const {companyName, cvsEmail, companyDescription} = req.body.companyData;
    const {email, name, password} = req.body.companyAdmin;

    const compAdminRole = await Role.findOne({name: Roles.COMPANYADMIN})

    //1 create the company
    let company = await Company.create({
        companyName,
        cvsEmail,
        companyDescription,
    });
    //2 create the compAdmin using the company _id
    //update the company with its new agent _id
    if(!company._id){
        res.status(500)
        throw new Error('Failed to create new company entity')
    }

    let companyAdmin = await User.create({
        name,
        email,
        password,
        role: compAdminRole._id,
        relatedEntities: {company: company._id}
    })
    let addedToCompany = false;

    if(companyAdmin._id){
        addedToCompany = await _setUserAsCompanyAgent(companyAdmin._id, company._id)
    }
    let failUser = false;
    if(!addedToCompany){//the user should be company agent but we fail to update companys document
        failUser = await User.findByIdAndDelete(companyAdmin._id)
    }

    if (!failUser) {
        res.status(201).json({
            company: {
                companyName,
                cvsEmail,
                companyDescription,
                compAdmin: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc    get all partnering companies
// @route   GET /api/companies
// @access  power admin
const listCompanies = asyncHandler(async (req, res) => {
    const restrictions = req.userCompany;
    let comps = [];
    try{
        if(restrictions){
            comps = await Company.findById(restrictions).select('-companyPositions -companyAgents -__v');
        } else {
            comps = await Company.find({}).select('-companyPositions -companyAgents -__v');
        }
        res.json(comps);
    } catch(error) {
        res.status(500);
        throw new Error(error);
    }
    
});

export {
    createCompany,
    listCompanies
}