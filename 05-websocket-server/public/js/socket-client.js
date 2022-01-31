

//Referencias del HTML
const lblOnline  = document.getElementById( 'lblOnline' );
const lblOffline = document.getElementById( 'lblOffline' );
const txtMensaje = document.getElementById( 'txtMensaje');
const btnEnviar  = document.getElementById( 'btnEnviar');


const socket = io();

socket.on('connect', () => {
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
    
})

socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
     
})

socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
    
})

btnEnviar.addEventListener('click', () => {

    const mensaje = txtMensaje.value;

    const payload = {
        id: '123adf',
        msg: mensaje,
        fecha: new Date().getTime()
    }

    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id );
        
    } );
    
})


