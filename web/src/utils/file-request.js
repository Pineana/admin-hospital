import axios from 'axios'; // 引入axios



const serviceFile = axios.create({
    baseURL: "/file",
    https: true,
    timeout: 99999,
})

export default serviceFile




