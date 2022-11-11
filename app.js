//~
import config from './utils/config.js'

import express from 'express'

import cors from 'cors'

import notesRouter from './controllers/notes.js'

import middleware from './utils/middleware.js'

import logger from './utils/logger.js'

import mongoose from 'mongoose'

//
logger.info( '===========> connecting to', `'${config.COLLECTION}'` )

mongoose.connect( config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => {
        console.log('===========> connected to MongoDB 🚀')
    })

    .catch((error) => {
        console.log('XXXXXXXXXXX> error connection to MongoDB 😵: ', error.message)
    })

const app = express()

app.use( cors() )
app.use( express.static('build') )
app.use( express.json() )
app.use( middleware.requestLogger )

app.use( '/api/notes', notesRouter )

app.use( middleware.unknownEndpoint )
app.use( middleware.errorHandler )

export default app