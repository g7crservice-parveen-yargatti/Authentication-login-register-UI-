export const saveToken = (token: string) => {
    sessionStorage.setItem('token', token)
}
export const isLoggedIn = () => {
    return sessionStorage.getItem('token') ? true : false
}
export const deleteToken = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userName')
}