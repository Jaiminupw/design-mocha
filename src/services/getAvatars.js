import axios from 'axios'
export const getAvatars = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://designmocha-dev.el.r.appspot.com/avatar-images/")
        .then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}