let url = "https://mindhub-xj03.onrender.com/api/amazing";


fetch(url)
.then(response => response.json())
.then(data =>{
 
let urlString = window.location.href

let urlArmada = new URL(urlString)

let parametros = new URLSearchParams(urlArmada.search)

let id = parametros.get("id")
let detail = data.events.filter((evento) => evento._id == id)

let tarjetaDetail = document.getElementById("tarjetaDetalle");

pintarTarjeta(detail, tarjetaDetail)

function pintarTarjeta(arregloEventos, divC) {
    for (let j = 0; j < arregloEventos.length; j++) {
        if (arregloEventos[j] != undefined) {
            let Tarjeta = document.createElement("div")
            Tarjeta.innerHTML = `
            <div class="row g-0">
            <div class="col-md-12">
                <img src="${arregloEventos[j].image}" class="img-fluid rounded-start tamañoDetallesIMg" alt="...">
            </div>
            <div class="col-md-12">
                <div class="card-body">
                    <h5 class="card-title">${arregloEventos[j].name}</h5>
                    <p class="card-text">${arregloEventos[j].description}</p>
                    <p class="card-text">Category: ${arregloEventos[j].category}</p>
                    <p class="card-text">Place: ${arregloEventos[j].place}</p>
                    <p class="card-text">capacity: ${arregloEventos[j].capacity}</p>
                    <p class="card-text">Price: $ ${arregloEventos[j].price}</p>
                    </div>
                    </div>
                  </div>
                </div> `;
            divC.appendChild(Tarjeta)

        }

    }

}})