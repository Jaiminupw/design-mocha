import axios from "axios"
var Cookies = require('js-cookie')
export const getProfileById = (id) => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common["session"] = JSON.stringify(Cookies.getJSON());

        axios.defaults.withCredentials = true;
        axios("https://designmocha-dev.el.r.appspot.com/public/profile/" + id, {
        method: "GET",
        withCredentials: true,
        credentials: "include"
        }).then(res => {
            resolve(res)
            console.log(res);
        }).catch(err => {
            reject(err)
            console.log(err.response);
        })
    })
}