import axios from "axios"
var Cookies = require('js-cookie')
export const getPortfolioById = (pid) => {
    return new Promise((resolve, reject) => {
        axios.defaults.headers.common["session"] = JSON.stringify(Cookies.getJSON());
        axios.defaults.withCredentials = true;
        axios("https://designmocha-dev.el.r.appspot.com/designer/portfolio/" + pid, {

        method: "GET",
        withCredentials: true,
        credentials: "include"

        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}