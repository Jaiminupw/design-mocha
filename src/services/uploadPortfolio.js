import axios from "axios"
var Cookies = require("js-cookie")
export const uploadPortfolio = (data, progress) => {
    return new Promise((resolve, reject) => {
        // var data = new FormData()
        // data.append('pic', file)
        var pdata = new FormData()
        pdata.append("portfolio_metadata", data.portfolio_metadata)
        data.media.map((media) => {
            pdata.append("media", media)
            return true
        })

        var headers = {
            session: JSON.stringify(Cookies.getJSON())
        }
        console.log(data.media)
        axios.post("https://designmocha-dev.el.r.appspot.com/designer/portfolio/", pdata, {
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