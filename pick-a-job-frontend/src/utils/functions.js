export const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
export const isLoggedIn = (userInfo) => {
    return userInfo && !isEmptyObject(userInfo);
}
export const isAdminUser = (userInfo) => {
    return isLoggedIn(userInfo) && userInfo.isUsersAdmin;
}