const Roles = {
    GUEST: 'GUEST',
    STAR: 'STAR',
    SUPERSTAR: 'SUPERSTAR',
    COMPANYAGENT: 'COMPANYAGENT',
    COMPANYADMIN: 'COMPANYADMIN',
    PAJ: 'PAJ',
    PAJADMIN: 'PAJADMIN'
}

const PositionStatus = {
    ACTIVE: 'active',
    SUSPENDED: 'suspended',
    CANCELED: 'canceled',
    FULFILLED: 'fulfilled',
    DELETED: 'deleted'
}

// aggregateRoles receives no arguments and returns array of all roles
const aggregateRoles = () => {
    return Object.keys(Roles)
}

// aggregatePositionStatus receives no arguments and returns array of all possible statuses for a position
const aggregatePositionStatus = () => {
    return Object.keys(PositionStatus)
}

// isSimpleRole receives string and returns true iff the string is one of [GUEST, STAR]
const isSimpleRole = (role) => {
    return role === Roles.GUEST || role === Roles.STAR;
}

export {Roles, PositionStatus, aggregateRoles, isSimpleRole, aggregatePositionStatus}