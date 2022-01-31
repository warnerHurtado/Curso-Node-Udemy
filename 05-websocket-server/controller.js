
const socketController  = ( socket ) => {
        console.log('Connected client', socket.id);
        
        socket.on('disconnect', () => {
            console.log('Disconnected client', socket.id);
            
        });
        //Con esto le estoy mandando un mensaje desde el frontend con la misma key
        socket.on('enviar-mensaje', ( payload, callback )=> {
            
            const id = 12346;
            callback( id ); //Esta funcion se me ejecuta solo para el que esta enviando un mensaje y despues de enviarlo
            socket.broadcast.emit('enviar-mensaje', payload); //Estoy enviando el mensaje que me llega a todos los que estén conectados

        })
    
}

module.exports = {
    socketController
}