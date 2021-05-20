import axios from "axios"
const { REACT_APP_BASE_URL } = process.env;
export const ResetPass = (user) => {
    return new Promise((resolve, reject) => {
        var data = user
        axios.post(REACT_APP_BASE_URL + "/forgetpassword", data)
        .then((res) => {
            resolve(res)
        })
        .catch((error) => {
            reject(error)
        })
    }) 
}