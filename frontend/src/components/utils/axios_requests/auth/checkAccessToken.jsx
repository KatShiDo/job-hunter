export const isExpired = (accessToken) => {
    const decoded = JSON.parse(atob(accessToken.split(".")[1]));
    // console.log(decoded);
    const expirationDate = new Date(decoded.exp * 1000);
    expirationDate.setSeconds(expirationDate.getSeconds() - 5);
    return Date.now() >= new Date(expirationDate);
}