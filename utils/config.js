/**
 * Module to handling of environment variables
 * 
 */

//~
import dotenv  from 'dotenv'

if ( process.env.NODE_ENV !== 'production' ) {
    dotenv.config()
}

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const COLLECTION = process.env.DB_COLLECTION

const CONNECT_PARAMS = {
    MONGODB_URI,
    PORT,
    COLLECTION
}

export default CONNECT_PARAMS