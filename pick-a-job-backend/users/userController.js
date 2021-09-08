import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'
import Role from '../models/roleModel.js';


import { enrichUserData, _getCompanyAgents, _setUserAsCompanyAgent, _removeUserAsCompanyAgent } from './userDataEnrich.js'

// @desc    Auth the user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && user.role && (await user.matchPassword(password))) {
        const enrichedUser = await enrichUserData(user);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: enrichedUser.role.name,
            isUsersAdmin: enrichedUser.role.userCreator.isCreator,
            relatedEntities: enrichedUser.relatedEntities,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password')
    }

})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user && user.role) {
        const userRole = await Role.findById(user.role)
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: userRole.name
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const { creationProps } = req;
    let {relatedEntities = null, _id: roleId} = creationProps;
    let addedToCompany = {success: false};

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error('user already exist')
    }

    let user = await User.create({
        name,
        email,
        password,
        role: roleId,
        ...(relatedEntities && {...relatedEntities})
    })

    if(relatedEntities?.relatedEntities?.company){
        const companyId = relatedEntities.relatedEntities.company
        addedToCompany = await _setUserAsCompanyAgent(user._id, companyId)
    }

    if(relatedEntities && !addedToCompany.success){//the user should be company agent but we fail to update companys document
        user = await User.findByIdAndDelete(user._id)
    }

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    if(req.role.name === 'COMPANYADMIN'){
        const relEntity = req.user.relatedEntities;
        const companyId = relEntity.company;
        const users = await _getCompanyAgents(companyId);
        res.json(users);
    } else if(req.role.name === 'PAJ'){
        const users = await User.find({});
        res.json(users);
    } else {
        const users = await User.find({});
        res.json(users);
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const userToDelete = req.params.id;
    if(req.role.name === 'COMPANYADMIN'){// deleting an agent
        const relEntity = req.user.relatedEntities;
        const companyId = relEntity.company;
        const {success, companyData} = await _removeUserAsCompanyAgent(userToDelete, companyId);
        let outcome = null;
        let user = null;
        if(success){
            user = await User.findByIdAndDelete(userToDelete)
            if(user.get('id') === userToDelete){
                outcome = 'SUCCESS'
            } else {
                outcome = 'FAIL'
            }
        }
        res.json(outcome);
    }
});

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser
}