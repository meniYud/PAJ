import mongoose from 'mongoose';
import dotenv from 'dotenv'
import users from './data/users.js'
import roles from './data/roles.js'
import companies from './data/companies.js'
import positions from './data/positions.js'
import User from './models/userModel.js'
import Product from './models/ProductModel.js'
import Order from './models/OrderModel.js'
import Role from './models/roleModel.js'
import Company from './models/companyModel.js'
import Position from './models/positionModel.js'
import connectDB from './config/db.js'

dotenv.config();
connectDB();

const importPositions = async () => {
    try {
        await Position.deleteMany();
        const createdPositions = await Position.insertMany(positions);

        console.log(createdPositions)

        process.exit()

    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importCompanies = async () => {
    try {
        await Company.deleteMany();
        const createdCompanies = await Company.insertMany(companies);

        console.log(createdCompanies)

        process.exit()

    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importRoles = async () => {
    try {
        await Role.deleteMany();
        const createdRoles = await Role.insertMany(roles);

        console.log(createdRoles)

        process.exit()

    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importUsers = async () => {
    try {
        // await User.deleteMany();
        const createdRoles = await Role.find({});

        const roleNameMap = createdRoles.reduce((aggrOne, newOne) => {
            return {
                ...aggrOne,
                [newOne.name]: newOne._id
            }
        }, {})

        console.log(roleNameMap)

        const roledUsers = users.map((user) => {
            const role = roleNameMap[user.role]
            return {
                ...user,
                role: role
            }

        })

        const createdUsers = await User.insertMany(roledUsers);
        console.log(createdUsers)

        process.exit()

    } catch(error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const importData = async () => {
    try {
        // await Order.deleteMany();
        // await Product.deleteMany();
 
        // await importRoles();
        await importUsers();
        // await importCompanies();
        // await importPositions();
        
        console.log('data imported');
        
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('data destroyed');
        process.exit()

    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}