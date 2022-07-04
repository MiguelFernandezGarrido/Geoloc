var mapa;
var listaObjetos = [];
function initmap() {
    var coordInicial = { lat: 37.7707, lng: -3.89719 };
    mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        center: coordInicial
    });
    console.log("initmap");
    inicio();
}


function nuevoMarcador() {
    obtenerPosicion();
    actualizar();
}


function actualizar() {
    listaDesplegable = document.getElementById('listaMarcadores');
    console.log("asd");

    if (localStorage.getItem('lista') == null) {
        listaObjetos = [];
    } else {
        listaObjetos = JSON.parse(localStorage.getItem('lista'));
    }
    // vaciar listadeplegable
    listaDesplegable.textContent = '';
    for (let i = 0; i < listaObjetos.length; i++) {
        listaDesplegable.innerHTML += '<option value="' + i + '">' + listaObjetos[i].title + '</option> + <button onclick="eliminar(' + i + ')">X</button>';
        let marcador = new google.maps.Marker({
            position: listaObjetos[i].position,
            map: mapa,
            title: listaObjetos[i].title
        });
    }
}


function eliminar(i) {
    if (localStorage.getItem('lista') == null) {
        alert('No hay marcadores');
    } else {
        listaObjetos = JSON.parse(localStorage.getItem('lista'));
    }
    listaObjetos.splice(i, 1);
    localStorage.setItem('lista', JSON.stringify(listaObjetos));
    actualizar();
}


function obtenerPosicion() {

    if (navigator.geolocation) {
        console.log("obtener posicion");
        navigator.geolocation.getCurrentPosition(getpos, function (error) {
            console.log(error);
        });
    } else {
        alert('No soportado');
    }

    console.log("listaObjetos");
    localStorage.setItem('lista', JSON.stringify(listaObjetos));
}


function getpos(positione) {
    let nombre = document.getElementById('nuevoMarcador');
    let marcador = {
        position: {
            lat: positione.coords.latitude,
            lng: positione.coords.longitude
        },
        map: mapa,
        title: nombre.value
    };
    console.log(marcador);
    listaObjetos.push(marcador);
    console.log(listaObjetos);
    nombre.value = '';
}


function inicio() {
    var listaDesplegable;
    var agregarMarcador = document.getElementById('agregarMarcador');
    console.log("inicio");
    agregarMarcador.addEventListener('click', nuevoMarcador);
    if (listaObjetos.length == 0) {
        listaObjetos.push({
            position: {
                lat: 37.7707,
                lng: -3.89719
            },
            map: mapa,
            title: 'Casa'
        });
    }
    actualizar();
}