import axios from "axios"
const { REACT_APP_BASE_URL } = process.env;
export const LoginMe = (user) => {
    return new Promise((resolve, reject) => {
        var data = user
        axios.post(REACT_APP_BASE_URL + "/login", data, {withCredentials: false})
        .then((res) => {
            resolve(res)
        })
        .catch((error) => {
            reject(error)
        })
    }) 
}