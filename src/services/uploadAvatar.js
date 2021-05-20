import axios from "axios"
var Cookies = require("js-cookie")
export const uploadAvatar = (file, progress) => {
    return new Promise((resolve, reject) => {
        var data = new FormData()
        data.append('pic', file)
        var headers = {
            session: JSON.stringify(Cookies.getJSON())
        }
        axios.post("https://designmocha-dev.el.r.appspot.com/public/profile/update-profile-pic", data, {
            headers: headers, onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                progress(percentCompleted)
            }
        })
            .then((res) => {
                resolve(res)
            })
            .catch((error) => {
                reject(error)
            })
    })
}