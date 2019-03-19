import axios from 'axios'

axios.interceptors.request.use(request=>{
    
    return request;
},error=>{
    console.log('setaxios-error',error)
})