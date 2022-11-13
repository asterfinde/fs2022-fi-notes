/**
 * Start the application importing the actual application from the app.js 
 * 
 */

//~
import http from 'http'

import app from './app.js'
import config from './utils/config.js'
import logger from './utils/logger.js'

//
const server = http.createServer( app )

server.listen( config.PORT, () => {
    logger.info( `>>>>>>>>>>>> server running on port ${config.PORT}` )
})
