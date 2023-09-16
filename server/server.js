const express = require( 'express' );
const http = require( 'http' );
const socketIo = require( 'socket.io' );
const path = require( 'path' );

const app = express();
let server = http.createServer( app );

const publicPath = path.resolve( __dirname, '../public' );
const port = process.env.PORT || 3000;

app.use( express.static( publicPath ) );

module.exports.io = socketIo( server );
require( './sockets/socket' );

server.listen( port, ( err ) =>
{
    if ( err ) throw new Error( err );
    console.log( `Server running on port ${port}` );
} );