/**
 * Module used for the console printout:
 * • info
 * • error
 * 
 * with sugnature: @param  {...any} params 
 * 
 */

//~
const info = (...params ) => {
    console.log(...params)
}

const error = (...params ) => {
    console.error(...params)
}

export default {
    info, error
}