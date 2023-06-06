const dotenv = require( "dotenv" );
dotenv.config();
const { CLOUD_ACCESS, API_KEY, API_SECRET } = process.env;
module.exports = { CLOUD_ACCESS, API_KEY, API_SECRET };