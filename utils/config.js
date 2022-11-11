//~
import dotenv  from 'dotenv'

if ( process.env.NODE_ENV !== 'production' ) {
    dotenv.config()
}

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

export {
    MONGODB_URI,
    PORT
}