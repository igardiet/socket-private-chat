const socket = io();

const params = new URLSearchParams( window.location.search );

if ( !params.has( 'name' ) || !params.has('room') )
{
    window.location = 'index.html';
    throw new Error( 'Name and room are mandatory' );
}

const user =
{
    name: params.get( 'name' )
};

socket.on( 'connect', () =>
{
    console.log( 'Connected to server' );

    socket.emit( 'enterChat', user, ( answer ) =>
    {
        console.log( 'Users connected', answer );
    } );
} );

socket.on( 'disconnect', () => console.log( 'Server connection has been lost' ) );

// socket.emit( 'createMessage',
//     {
//         name: 'User',
//         message: 'Message'
//     }, ( answer ) => console.log( 'Server response: ', answer ) );

socket.on( 'createMessage', ( message ) => console.log( 'Server:', message ) );

socket.on( 'personList', ( people ) => console.log( people ) );

socket.on('privateMessage', (message) => console.log('Private message:', message));