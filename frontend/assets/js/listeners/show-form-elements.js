$(document).ready(function(){
    $("input[name='tema']").change(function(e){
        if($(this).val() == 'temaClaro') {
            setTheme('light')
            $("div[name='temaProg']").attr("hidden","")
        } else if($(this).val() == 'temaOscuro') {
            setTheme('dark')
            $("div[name='temaProg']").attr("hidden","")
        } else if($(this).val() == 'temaProg') {
            $("div[name='temaProg']").removeAttr("hidden")
        }
    });
    
    $("input[name='alarma']").change(function(e){
        if($(this).val() == 'alarmManual') {
            $("ul[id='alarmRutinas']").attr("hidden","")
            $("ul[id='alarmProg']").attr("hidden","")
        } else if($(this).val() == 'alarmAuto') {
            $("ul[id='alarmRutinas']").removeAttr("hidden")
            $("ul[id='alarmProg']").attr("hidden","")
        } else if($(this).val() == 'alarmHorario') {
            $("ul[id='alarmProg']").removeAttr("hidden")
            $("ul[id='alarmRutinas']").attr("hidden","")
        }
    });
    
    $("input[name='luces']").change(function(e){
        if($(this).val() == 'act') {
            $("ul[id='lista-luces']").removeAttr("hidden")
        } else if($(this).val() == 'des') {
            $("ul[id='lista-luces']").attr("hidden","")
        } 
    });
    
    $("input[name='persianas']").change(function(e){
        if($(this).val() == 'act') {
            $("ul[id='lista-persianas']").removeAttr("hidden")
        } else if($(this).val() == 'des') {
            $("ul[id='lista-persianas']").attr("hidden","")
        } 
    });
    
    $("input[name='calefaccion']").change(function(e){
        if($(this).val() == 'calManual') {
            $("ul[id='calAuto']").attr("hidden","")
            $("ul[id='calProg']").attr("hidden","")
        } else if($(this).val() == 'calProg') {
            $("ul[id='calAuto']").removeAttr("hidden")
            $("ul[id='calProg']").attr("hidden","")
        } else if($(this).val() == 'calAuto') {
            $("ul[id='calProg']").removeAttr("hidden")
            $("ul[id='calAuto']").attr("hidden","")
        }
    });
})
