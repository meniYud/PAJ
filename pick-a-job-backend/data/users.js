import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@paj.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@paj.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@paj.com',
        password: bcrypt.hashSync('123456', 10),
    }
];

export default users;