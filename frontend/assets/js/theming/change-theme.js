function setTheme (color) {
    if (color == "dark") {
        document.getElementsByClassName("navbar navbar-light navbar-expand-md")[0].className = "navbar navbar-light navbar-expand-md navigation-clean dark";
        document.getElementsByClassName("navbar-brand")[0].className = "navbar-brand dark";
        let navlink = document.getElementsByClassName("nav-link");
        for (let i = 0; i < navlink.length; i++) {
            navlink[i].className = "nav-link dark"
        }
        document.getElementsByClassName("navbar-toggler-icon")[0].style.backgroundImage = "url('./assets/img/iconfinder-icon.svg')"; 
        document.getElementsByTagName('body')[0].className= "dark";
        let groups = document.getElementsByClassName('list-group-item');
        for (let i = 0; i < groups.length; i++) {
            groups[i].className = "list-group-item dark"
        }
        let hr = document.getElementsByTagName("hr");
        for (let i = 0; i < hr.length; i++) {
            hr[i].className = "hr dark"
        }
        document.getElementsByClassName('footer-basic')[0].className = "footer-basic dark";
        let boxes = document.getElementsByClassName('box');
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].className = "box dark"
        }
        let btn = document.getElementsByClassName("btn btn-primary");
        for (let i = 0; i < btn.length; i++) {
            btn[i].className = "btn btn-primary dark"
        }
        let btn_on = document.getElementsByClassName("bg-success btn btn-secondary");
        for (let i = 0; i < btn_on.length; i++) {
            btn_on[i].className = "bg-success btn btn-secondary dark"
        }
        let btn_off = document.getElementsByClassName("bg-danger btn btn-secondary");
        for (let i = 0; i < btn_off.length; i++) {
            btn_off[i].className = "bg-danger btn btn-secondary dark active"
        }
        let chkbox = document.getElementsByClassName("custom-checkbox");
        for (let i = 0; i < chkbox.length; i++) {
            chkbox[i].className = "custom-control custom-checkbox dark custom-control-inline"
        }
        let radio = document.getElementsByClassName("custom-radio");
        for (let i = 0; i < radio.length; i++) {
            radio[i].className = "custom-control custom-radio dark"
        }
        localStorage.setItem('theme', 'dark');
    } else {
        document.getElementsByClassName("navbar navbar-light navbar-expand-md")[0].className = "navbar navbar-light navbar-expand-md navigation-clean light";
        document.getElementsByClassName("navbar-brand")[0].className = "navbar-brand light";
        let navlink = document.getElementsByClassName("nav-link");
        for (let i = 0; i < navlink.length; i++) {
            navlink[i].className = "nav-link light"
        }
        
        document.getElementsByClassName("navbar-toggler-icon")[0].style.backgroundImage = "url('./assets/img/iconfinder-icon-dark.png')"; 

        document.getElementsByTagName('body')[0].className= "light";
        let groups = document.getElementsByClassName('list-group-item');
        for (let i = 0; i < groups.length; i++) {
            groups[i].className = "list-group-item light"
        }
        let hr = document.getElementsByTagName("hr");
        for (let i = 0; i < hr.length; i++) {
            hr[i].className = "hr light"
        }
        let btn = document.getElementsByClassName("btn btn-primary");
        for (let i = 0; i < btn.length; i++) {
            btn[i].className = "btn btn-primary light"
        }
        let btn_on = document.getElementsByClassName("bg-success btn btn-secondary");
        for (let i = 0; i < btn_on.length; i++) {
            btn_on[i].className = "bg-success btn btn-secondary light"
        }
        let btn_off = document.getElementsByClassName("bg-danger btn btn-secondary");
        for (let i = 0; i < btn_off.length; i++) {
            btn_off[i].className = "bg-danger btn btn-secondary light active"
        }
        let chkbox = document.getElementsByClassName("custom-checkbox");
        for (let i = 0; i < chkbox.length; i++) {
            chkbox[i].className = "custom-control custom-checkbox light custom-control-inline"
        }
        let radio = document.getElementsByClassName("custom-radio");
        for (let i = 0; i < radio.length; i++) {
            radio[i].className = "custom-control custom-radio light"
        }
        document.getElementsByClassName('footer-basic')[0].className = "footer-basic light";
        localStorage.setItem('theme', 'light');
    }
}

// Funcion para comprobar el tema establecido
function checkTheme(){
    if (localStorage.getItem("theme") === 'dark') {
        setTheme("dark");
        document.getElementById("temaOscuro").setAttribute("checked", "");
    } else {
        setTheme("light")
        document.getElementById("temaClaro").setAttribute("checked", "");
    }
}

// Compruebo que tema está configurado
window.onload = checkTheme();