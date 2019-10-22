const dotenv = require('dotenv')
const envFound = dotenv.config();
if(!envFound){
    throw new Error('Could not find the .env file')
} 
module.exports = {
    port : process.env.PORT, 
    databaseURL: process.env.databaseURI,
    JWTsecret: process.env.myTokenPrivateKey
}