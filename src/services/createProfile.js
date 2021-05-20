import axios from "axios"
var Cookies = require('js-cookie')
export const createProfile = (user) => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common["session"] = JSON.stringify(Cookies.getJSON());
        axios.defaults.withCredentials = true;
        axios("https://designmocha-dev.el.r.appspot.com/public/profile", {

        method: "POST",
        withCredentials: true,
        credentials: "include",
        data:user
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })

    })
}