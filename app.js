//~
import { MONGODB_URI } from './utils/config'

import express from 'express'

const app = express()

import cors from 'cors'

import notesRouter from './controllers/notes'

import middleware from './utils/middleware'

import logger from './utils/logger'

import mongoose from 'mongoose'


logger.info( 'connecting to...', MONGODB_URI )

mongoose.connect( MONGODB_URI )
    .then( () => {
        logger.info( 'connected to MongoDB' )
    })

    .catch( error => {
        logger.error( 'error connection to MongoDB:', error.message )
    })

app.use( cors() )
app.use( express.static('build') )
app.use( express.json() )
app.use( middleware.requestLogger )

app.use( '/api/notes', notesRouter )

app.use( middleware.unknownEndpoint )
app.use( middleware.errorHandler )

export default app