import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const users = [
    {
        name: 'Guest User',
        email: 'guest@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'GUEST'
    },
    {
        name: 'Star User',
        email: 'star@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'STAR'
    },
    {
        name: 'Superstar User',
        email: 'Superstar@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'SUPERSTAR'
    },
    {
        name: 'CompAgent User',
        email: 'compAgent@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT'
    },
    {
        name: 'Matrix agent 1',
        email: 'matrixAgent1@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT'
    },
    {
        name: 'Matrix agent 2',
        email: 'matrixAgent2@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT'
    },
    {
        name: 'SeanIndustries agent 1',
        email: 'seanIndustriesAgent1@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT'
    },
    {
        name: 'SeanIndustries agent 2',
        email: 'seanIndustriesAgent2@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT'
    },
    {
        name: 'CompAdmin User',
        email: 'compAdmin@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYADMIN'
    },
    {
        name: 'Matrix admin',
        email: 'matrixAdmin@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYADMIN'
    },
    {
        name: 'SeanIndustries admin',
        email: 'seanIndustriesAdmin@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYADMIN'
    },
    {
        name: 'paj User',
        email: 'paj@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'PAJ'
    },
    {
        name: 'pajAdmin User',
        email: 'pajAdmin@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'PAJADMIN'
    },
];

const oneUser = [
    {
        name: 'Matrix agent 3',
        email: 'matrixAgent3@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT',
        relatedEntities: {
            company: mongoose.Types.ObjectId('60366b5d2e9a6743b013d114')
        },
    },
    {
        name: 'SeanIndustries agent 3',
        email: 'seanIndustriesAgent3@paj.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'COMPANYAGENT',
        relatedEntities: {
            company: mongoose.Types.ObjectId('60366b5d2e9a6743b013d115')
        },
    }
];

export default oneUser;