function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    m = checkTime(m);
    s = checkTime(s);
    day = checkTime(day);
    month = checkTime(month);
    document.getElementById('time').innerHTML = h + ":" + m + ":" + s;  
    document.getElementById('date').innerHTML = day + "/" + month + "/" + year 
    let time = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) i = "0" + i;
    return i;
}

window.onload = startTime();