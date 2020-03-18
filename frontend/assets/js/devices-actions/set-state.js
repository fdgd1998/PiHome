// Controlling light bulbs
console.log("set-state.js loaded")

$(document).ready(function(){
    namespace_temp = '/temp'; // change to an empty string to use the global namespace
    namespace_device = '/device'
    // the socket.io documentation recommends sending an explicit package upon connection
    // this is specially important when using the global namespace
    var socket_temp = io.connect('http://' + document.domain + ':' + location.port + namespace_temp);
    
    socket_temp.on('connect', function(msg) {
        socket_temp.emit('connection', {data: 'Client connected.'});
    });
    
    socket_temp.on('set-temps', function(temps){
        console.log(temps)
        loadTempValues(JSON.parse(temps))
    });
 
    var socket_device = io.connect('http://' + document.domain + ':' + location.port + namespace_device);
    $('input[name=device]').change(function(){
        var id = $(this).attr('id');
        var value = $(this).attr('value')
        socket_device.emit('device-state', JSON.stringify([id, value]));
        console.log("Device: " + id + ". New state: " + value)
    })  
})