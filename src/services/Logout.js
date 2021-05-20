import axios from "axios"
var Cookies = require('js-cookie')
export const Logout = () => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common["session"] = JSON.stringify(Cookies.getJSON());
        axios.defaults.withCredentials = true;
        axios("https://designmocha-dev.el.r.appspot.com/session/logout/", {
        method: "POST",
        withCredentials: true,
        credentials: "include",
        }).then(res => {
            if(res.status === 200) {
                Cookies.remove("session")
                Cookies.remove("userProfile")
                Cookies.remove("username")
            }
            resolve(res)
        }).catch(err => {
            reject(err)
        })

    })
}