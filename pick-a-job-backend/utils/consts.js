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

// isPublicRole receives string and returns true iff the string is one of [GUEST, STAR]
const isPublicRole = (role) => {
    return role === Roles.GUEST || role === Roles.STAR;
}

// isUserAdminRole receives string and returns true iff the string is one of [COMPANYADMIN, PAJADMIN, PAJ]
const isUserAdminRole = (role) => {
    return role === Roles.COMPANYADMIN || role === Roles.PAJADMIN || role === Roles.PAJ;
}

// isUserPowerAdminRole receives string and returns true iff the string is one of [PAJADMIN]
const isUserPowerAdminRole = (role) => {
    return role === Roles.PAJADMIN;
}

// isUserCompanyAdminRole receives string and returns true iff the string is one of [COMPANYADMIN]
const isUserCompanyAdminRole = (role) => {
    return role === Roles.COMPANYADMIN;
}

const getTokenFromRequest = (req) => {
    let token = null;
    const authHeader = req?.headers?.authorization;
    const isBearerToken = authHeader && authHeader.startsWith('Bearer');
    if(isBearerToken){
        token = authHeader.split(' ')[1];
    }

    return token;
}

const findCreateeRoleFromCreator = (creatorProps) => {
    let createdUserType = null;
    const creatorPermissions = creatorProps?.userCreator;
    if(creatorPermissions?.isCreator){
        createdUserType = creatorPermissions?.createdUserType
    }

    return Array.isArray(createdUserType) ? createdUserType[0] : createdUserType;
}
const findCreateeRelatedEntityFromCreator = (creatorProps) => {
    let createdUserRelEntity = null;
    const creatorRelEntity = creatorProps?.relatedEntities;
    if(creatorRelEntity?.company){
        createdUserRelEntity = {relatedEntities: {company: creatorRelEntity?.company}}
    }

    return createdUserRelEntity;
}

const findCreateePropsFromCreator = (creatorProps) => {
    const createeRole = findCreateeRoleFromCreator(creatorProps)
    const createeRelEntity = findCreateeRelatedEntityFromCreator(creatorProps)

    return {role: createeRole, relatedEntities: createeRelEntity};
}

export {Roles,
    PositionStatus,
    aggregateRoles,
    isPublicRole,
    isUserAdminRole,
    aggregatePositionStatus,
    getTokenFromRequest,
    findCreateePropsFromCreator,
    isUserPowerAdminRole,
    isUserCompanyAdminRole
}