
const roles = [
    {
        name: 'GUEST',
        userCreator: {
            isCreator: false,
            createdUserType: null
        },
        positionsCreator: {
            isCreator: false
        }
    },
    {
        name: 'STAR',
        userCreator: {
            isCreator: false,
            createdUserType: null
        },
        positionsCreator: {
            isCreator: false
        }
    },
    {
        name: 'SUPERSTAR',
        userCreator: {
            isCreator: true,
            createdUserType: ['STAR']
        },
        positionsCreator: {
            isCreator: false
        }
    },
    {
        name: 'COMPANYAGENT',
        userCreator: {
            isCreator: false
        },
        positionsCreator: {
            isCreator: true,
            createdPositionType: null
        },
    },
    {
        name: 'COMPANYADMIN',
        userCreator: {
            isCreator: true,
            createdUserType: ['COMPANYAGENT']
        },
        positionsCreator: {
            isCreator: true,
            createdPositionType: null
        },
    },
    {
        name: 'PAJ',
        userCreator: {
            isCreator: true,
            createdUserType: ['COMPANYADMIN']
        },
        positionsCreator: {
            isCreator: true,
            createdPositionType: null
        },
    },
    {
        name: 'PAJADMIN',
        userCreator: {
            isCreator: true,
            createdUserType: ['GUEST', 'STAR', 'SUPERSTAR', 'COMPANYAGENT', 'COMPANYADMIN', 'PAJ', 'PAJADMIN']
        },
        positionsCreator: {
            isCreator: true,
            createdPositionType: null
        },
    }
];

export default roles;