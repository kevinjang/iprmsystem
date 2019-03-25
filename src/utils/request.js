import axios from 'axios'
const qs = require('qs')
const baseUrl = 'http://10.6.129.16:3000'

let getCRSEventTitle = async (info) => {
    let queryInfo = qs.stringify({
        pageSize: info.pageSize,
        currentPage: info.currentPage
    })

    return await axios.get(baseUrl + '/api/getCRSEventTitle', {
        params: queryInfo
    })
}

export { getCRSEventTitle }
