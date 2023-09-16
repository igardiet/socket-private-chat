const { Users } = require( "../classes/users" );
const { io } = require( '../server' );
const { createMessage } = require( "../utils/utils" );

const users = new Users();

io.on( 'connection', ( client ) =>
{
    client.on( 'enterChat', ( data, callback ) =>
    {
        if ( !data.name )
        {
            return callback
                ( {
                    error: true,
                    message: 'Name is mandatory'
                } );
        }
        let people = users.addPerson( client.id, data.name );
        client.broadcast.emit( 'personList', users.getPeople() );
        callback( people );
    } );

    client.on( 'createMessage', ( data ) =>
    {
        let person = users.getPerson( client.id );
        let message = createMessage( person.name, data.message );
        client.broadcast.emit( 'createMessage', message );
    } );

    client.on( 'disconnect', () =>
    {
        let deletedPerson = users.deletePerson( client.id );
        client.broadcast.emit( 'createMessage', createMessage( 'Admin', `${deletedPerson.name} has left the chat` ) );
        client.broadcast.emit( 'personList', users.getPeople() );
    } );

    client.on( 'privateMessage', data =>
    {
        let person = users.getPerson( client.id );
        client.broadcast.to(data.towards).emit( 'privateMessage', createMessage( person.name, data.message ) );
    });
} );