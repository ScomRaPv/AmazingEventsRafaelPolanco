
import { carrusel, buscador, contenedorCheckbox, url, pintartarjetade4en4, filtrarPalabra, pintarCheckbox, filtrarCheckbox } from "./modulos/funciones.js"



fetch(url)
.then(response => response.json())
.then(data =>{

pintartarjetade4en4(data.events, carrusel);

let arrayCategory = Array.from(new Set(data.events.map(event => event.category)))

pintarCheckbox(arrayCategory, contenedorCheckbox )

contenedorCheckbox.addEventListener("change", e => {

    let checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(checkbox => checkbox.value.toLowerCase())
    filtrarCheckbox(data.events, checked)
    let nuevoArreglo = filtrarCheckbox(data.events, checked)
    pintartarjetade4en4(nuevoArreglo, carrusel)
    
    
})

buscador.addEventListener("keyup", e => {
    let nuevoArreglo2 = filtrarPalabra(data.events, e.target.value)
    pintartarjetade4en4(nuevoArreglo2, carrusel)
    
    
    
})


})









