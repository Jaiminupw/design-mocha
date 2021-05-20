var Cookies = require('js-cookie')
export const getAuth = () => {
    var session = Cookies.get("session")
    if(session !== undefined) {
        return true
    }
    else {
        Cookies.remove("username")
        return false
    }
}