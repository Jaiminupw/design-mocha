import axios from "axios"
const { REACT_APP_BASE_URL } = process.env;
export const RegisterMe = (user) => {
    return new Promise((resolve, reject) => {
        var data = user
        axios.post(REACT_APP_BASE_URL + "/signup", data)
        .then((res) => {
            resolve(res)
        })
        .catch((error) => {
            reject(error)
        })
    }) 
}