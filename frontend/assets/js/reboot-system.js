function confirmation() {
    var reboot = confirm("¿Estás seguro de que quieres reiniciar el sistema? El proceso puede tomar unos minutos.")
    if (reboot) {
        window.location.href = "/reboot"
    }
}