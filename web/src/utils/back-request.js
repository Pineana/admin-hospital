import axios from 'axios'; // 引入axios


const serviceMongo = axios.create({
    baseURL: "/back",
    https: true,
    timeout: 99999,
})

export default serviceMongo




