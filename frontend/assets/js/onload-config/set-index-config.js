// Function to modify parent class in order to set current smarthome settings on window load
function loadButtonStatus(device) {
    for (var i = 0; i < device.length; i++){
        console.log(device[i])
        if (device[i][1] == 0) {
            $("input[id='"+device[i][0]+"'][value='1']").parent().removeClass("active")
            $("input[id='"+device[i][0]+"'][value='0']").parent().addClass("active")
        } else {
            $("input[id='"+device[i][0]+"'][value='1']").parent().addClass("active")
            $("input[id='"+device[i][0]+"'][value='0']").parent().removeClass("active")
        }
    }
}

function loadTempValues(device) { 
    for (var i = 0; i < device.length; i++) {
        console.log(device[i])
        $("label[id="+device[i][0]+"][value=temp]").text("Temperatura: "+device[i][2]+"ºC")
        $("label[id="+device[i][0]+"][value=hum]").text("Humedad: "+device[i][1]+"%") 
    }  
}