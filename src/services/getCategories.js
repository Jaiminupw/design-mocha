import axios from 'axios'
export const getCategories = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://designmocha-dev.el.r.appspot.com/categories/")
        .then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    })
}
