import { carrusel, buscador, contenedorCheckbox, url, pintartarjetade4en4, filtrarPalabra, pintarCheckbox, filtrarCheckbox } from "./modulos/funciones.js"


fetch(url)
.then(response => response.json())
.then(data =>{

let eventosfuturos = filtrararreglomayores(data.events,data.currentDate)

pintartarjetade4en4(eventosfuturos, carrusel);

let arrayCategory = Array.from(new Set(data.events.map(event => event.category)))

pintarCheckbox(arrayCategory, contenedorCheckbox)

contenedorCheckbox.addEventListener("change", e => {
    let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())
    filtrarCheckbox(data.events, checked)
    let nuevoArreglo = filtrarCheckbox(eventosfuturos, checked)
    pintartarjetade4en4(nuevoArreglo, carrusel)
})
buscador.addEventListener("keyup", e => {
    let nuevoArreglo = filtrarPalabra(eventosfuturos, e.target.value)
    pintartarjetade4en4(nuevoArreglo, carrusel)
})

function filtrararreglomayores(arreglo,fecha) {
    let nuevoarreglo = []
    for (let i = 0; i < arreglo.length; i++) {
       if (arreglo[i].date > fecha) {
         nuevoarreglo.push(arreglo[i])
       }
    } 
    return nuevoarreglo
}

})






