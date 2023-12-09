
export let url = "https://mindhub-xj03.onrender.com/api/amazing"

export let carrusel = document.getElementById("pruebacarucel");

export let buscador = document.getElementById("inputBusqueda");

export let contenedorCheckbox = document.getElementById("contenedorCheckbox");

export function pintartarjetade4en4(arregloEvento, divPrincipal) {
    divPrincipal.innerHTML = ""
    if (arregloEvento.length == 0) {
        divPrincipal.innerHTML = `<div class="alert alert-light d-flex justify-content-center align-items-center fs-2" role="alert">
        <p>No se encontro ningun resultado</p>
      </div>`
    }
    for (let i = 0; i < arregloEvento.length; i += 4) {
        let carruselitem
        if (i < 4) {
            carruselitem = document.createElement("div")
            carruselitem.classList.add("carousel-item", "active")
        } else {
            carruselitem = document.createElement("div")
            carruselitem.classList.add("carousel-item")
        }
        let contenedor = document.createElement("div")
        contenedor.classList.add("d-flex", "justify-content-around", "flex-wrap")

        for (let j = i; j < i + 4; j++) {
            if (arregloEvento[j] != undefined) {
                let card = document.createElement("div")
                card.classList.add("card", "cardstilo")
                card.innerHTML = `
                         <img src="${arregloEvento[j].image}" class="card-img-top tamañoimagen" alt="Maraton">
                            <div class="card-body">
                                <h5 class="card-title">${arregloEvento[j].name}</h5>
                                <p class="card-text tamañode">${arregloEvento[j].description} </p>
                                <p class="card-text">${arregloEvento[j].category} </p>
                                <div class="d-flex flex-row mb-3 d-flex align-items-center">
                                    <p>Price: ${arregloEvento[j].price}</p>
                                    <a href="Detail.html?id=${arregloEvento[j]._id}" class="btn btn-primary ms-auto p-2">Details</a>
                                </div>
                          </div>  `

                contenedor.appendChild(card)
            }

            carruselitem.appendChild(contenedor)
            divPrincipal.appendChild(carruselitem)
        }

    }
}

export function filtrarPalabra(arregloEventos, palabraClave) {
    let arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(palabraClave.toLowerCase()) || evento.description.toLowerCase().includes(palabraClave.toLowerCase()))
    return arregloFiltrado
   

}

export function pintarCheckbox(arregloCategory, divC) {
    for (let j = 0; j < arregloCategory.length; j++) {
        if (arregloCategory[j] != undefined) {
            let checkbox = document.createElement("div")
            checkbox.classList.add("form-check", "form-check-inline", "p-2")
            checkbox.innerHTML = `
       <input class="form-check-input bg-secondary" type="checkbox" id="${arregloCategory[j]}" value="${arregloCategory[j]}">
       <label class="form-check-label" for="${arregloCategory[j]}">${arregloCategory[j]}</label> `;
            divC.appendChild(checkbox)
        }

    }

}

export function filtrarCheckbox(arreglo, arregloChecked) {
    let arregloFinal = arreglo.filter(event => arregloChecked.includes(event.category.toLowerCase()))
    return arregloFinal
    
}
