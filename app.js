/**
 * Module to start Express application
 * 
 * - The router referenced in:
 *   import notesRouter from './controllers/notes.js'
 * 
 *   is used only if the URL of the request starts with '/api/notes' (root_path):
 *   app.use( '/api/notes', notesRouter ) 
 *   this allow create "related routes" to the app
 * 
 *   '/api/notes/:id' ==> '/:id'
 * 
 */

//~
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'

import notesRouter from './controllers/notes.js'

logger.info( '===========> connecting to...', `'${config.COLLECTION}'` )

mongoose.connect( config.MONGODB_URI, 
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    )

    .then( () => {
        console.log('===========> connected to MongoDB 🚀')
    })

    .catch( error => {
        console.log('XXXXXXXXXXX> error connection to MongoDB 😵: ', error.message)
    })

const app = express()

app.use( cors() )
app.use( express.static('build') )
app.use( express.json() )
app.use( middleware.requestLogger )

// define 'root_path' to create "related routes" to the app
app.use( '/api/notes', notesRouter )

app.use( middleware.unknownEndpoint )
app.use( middleware.errorHandler )

export default app