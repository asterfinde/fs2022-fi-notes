/**
 * Module to handle custom middlewares:
 * • requestLogger
 * • unknownEndpoint
 * • errorHandler
 * 
 */
//~

import logger from './logger.js'

/**
 * Middleware to print messages in server console
 * @param {object} request - The object represents the HTTP request and has properties for the request query string, parameters, body,
 * @param {object} response - The object represents the HTTP response that an Express app sends when it gets an HTTP request
 * @param {next} function - Call next() to pass control to the next middleware function
 * 
 */
const requestLogger = ( request, response, next ) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('FullUrl: ', request.protocol + '://' + request.get('host') + request.originalUrl)
    logger.info('- - - - - - - - - - - - - - - - - - - - - - - ')
    logger.info('----------------------------------------------')

    next()
}

/**
 * Middleware to unknown endpoints
 * @param {object} request 
 * @param {object} response 
 * @returns - Json error
 */
const unknownEndpoint = ( request, response ) => {
    response.status( 404 )
            .send({ error: 'unknown endpoint' })
}

/**
 * Middleware to handle errors
 * Express handles any route with four arguments as error handling middleware
 * It's important to list all four arguments for the error handling callback function
 * It's also important to list this middleware after your REST API routes
 * @param {*} error 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 */
const errorHandler = ( error, request, response, next ) => {
    logger.error(error.message)

    if ( error.name === 'CastError' ) {
        return response.status(400)
                       .send({ error: 'malformatted id' })

    } else if ( error.name === 'ValidationError' ) {
        return response.status(400)
                       .json({ error: error.message })
    }

    next( error )
}

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler
}