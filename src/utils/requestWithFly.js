const Fly = require('flyio/dist/npm/wx')

let fly = new Fly;

const qs = require('qs/dist/qs')
const baseUrl = 'http://10.6.129.16:3000'

let getCRSEventTitle = ({pageSize,currentPage}) => {
    let queryInfo = qs.stringify({
        pageSize,
        currentPage
    })

    fly.get(baseUrl + '/api/getCRSEventTitle', {
        params: queryInfo
    }).then((response)=>{
        console.log('fly-response',response)
    }).catch((error)=>{
        console.log('fly-error', error)
    })
}

export { getCRSEventTitle }