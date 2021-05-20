import axios from "axios"
export const getSession = (headers) => {
    return new Promise((resolve, reject) => {
        axios.get("https://designmocha-dev.el.r.appspot.com/session/login/", {headers:headers})
        .then((res) => {
            resolve(res)
        })
        .catch((error) => {
            reject(error)
        })
    }) 
}