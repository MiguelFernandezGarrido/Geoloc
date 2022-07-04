let mapa;
function initmap() {
    mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 20,
        center: { lat: 37.7707, lng: -3.89719 }
    });
    mapa.panTo({ lat: 37.7707, lng: -3.89719 });
    if (localStorage.getItem('listaMarcadores') == null) {
        let listaMarcadores = [];
    } else {
        let listaMarcadores = JSON.parse(localStorage.getItem('listaMarcadores'));
    }
    let arrayLista = Array.from(listaMarcadores);
    console.log("error dónde");
    for (let i = 0; i < listaMarcadores.length; i++) {
        let marcador = new google.maps.Marker({
            position: { lat: listaMarcadores[i].lat, lng: listaMarcadores[i].lng },
            map: mapa,
            title: arrayLista[i].title
        });
    }
}
function actualizar() {
    location.reload();
}
// crear objeto
let marcador = {
    lat: 37.7707,
    lng: -3.89719,
    titulo: 'casa'
}
let mark1 = {
    lat: 50.0, 
    lng: -30.0,
    title: 'Marker 1'
}
let mark2 = {
    lat: -50.0,
    lng: 30.0,
    title: 'Marker 2'
}
if (localStorage.getItem('listaMarcadores') == null) {
    let listaMarcadores = [];
} else {
    let listaMarcadores = JSON.parse(localStorage.getItem('listaMarcadores'));
}
let arrayLista = Array.from(listaMarcadores);
console.log(arrayLista);
arrayLista.push(mark1);
arrayLista.push(mark2);
console.log(arrayLista);
localStorage.setItem('listaMarcadores', JSON.stringify(arrayLista));