const { log } = require('console');
const dotenv = require('dotenv');
const path = require('path');



exports.envConfig = ()=>{
    dotenv.config({path : path.join(__dirname, "../../",".env")})
    
}