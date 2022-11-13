/**
 * Module to handle all of the routes 
 * 
 * - The event handlers of routes are commonly referred to as 'controllers'
 * - It creates a new router object and exports it to be available for all consumers of the module
 * - The router is in fact a middleware, that can be used for defining "related routes" in a 
 *   single place, that is typically placed in its own module (like a “mini-application”)
 * 
 */

//~
import express from 'express'
import Note from '../models/note.js'

const notesRouter = express.Router()

notesRouter.get( '/', ( request, response ) => {
    Note.find( {} )
        .then( notes => {
            response.json( notes )
        })
})

notesRouter.get( '/:id', ( request, response, next ) => {
    Note.findById( request.params.id )
        .then(note => {
            if ( note ) {
                response.json( note )
            } else {
                response.status( 404 ).end()
            }
        })

        .catch( error => next(error) )
})

notesRouter.post('/', ( request, response, next ) => {
    const body = request.body

    const note = new Note( {
        content: body.content,
        important: body.important || false,
        date: new Date(),
    } )

    note.save()
        .then( savedNote => {
            response.json( savedNote )
        })

        .catch( error => next(error) )
})

notesRouter.delete( '/:id', (request, response, next ) => {
    Note.findByIdAndRemove( request.params.id )
        .then(() => {
            response.status( 204 ).end()
        })

        .catch( error => next(error) )
})

notesRouter.put( '/:id', ( request, response, next ) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important,
    }

    Note.findByIdAndUpdate( request.params.id, note, { new: true } )
        .then(updatedNote => {
            response.json( updatedNote )
        })

        .catch( error => next(error) )
})

export default notesRouter
