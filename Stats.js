

let url = "https://mindhub-xj03.onrender.com/api/amazing";

const highest = document.getElementById('r1')
const lowest = document.getElementById('r2')
const larger = document.getElementById('r3')
const statsUp = document.getElementById('statsUpcoming')
const statsPass = document.getElementById('statsPassEvents')

let arrayResults
fetch(url)
    .then((response) => response.json())
    .then(results => {
      
        arrayResults = results

       
        const events = arrayResults.events
        const currentDate = arrayResults.currentDate

   
        const tarjetasPasadasArray = events.filter((event) => event.date < currentDate)
        const tarjetasFuturasArray = events.filter((event) => event.date > currentDate)

       
        highestAttendancePercentage(events)
        const eventWithHighestAttendancePercentage = highestAttendancePercentage(events)
        highest.innerHTML = `${eventWithHighestAttendancePercentage.name}`

        
        lowestAssistancePercentage(events)
        const eventWithLowestAttendancePercentage = lowestAssistancePercentage(events)
        lowest.innerHTML = `${eventWithLowestAttendancePercentage.name}`

      
        findMaxCapacityEvent(events)
        const maxCapacityEvent = findMaxCapacityEvent(events)
        larger.innerHTML = `${maxCapacityEvent.name}`

      
        stats(tarjetasPasadasArray)
        const statsP = stats(tarjetasPasadasArray)
        pintarFilas(statsP, statsPass)
        
     
        stats(tarjetasFuturasArray)
        const statsU = stats(tarjetasFuturasArray)
        pintarFilas(statsU, statsUp)

         function pintarFilas(dato, contenedor) {
          let filas = ''
          dato.categorias.forEach(categoria => {
              filas += `
              <tr>
              <td>${categoria}</td>
              <td>$ ${dato.ganancias[categoria].toFixed(2)}</td>
              <td>${dato.porcentajes[categoria].toFixed(2)} %</td>
              </tr>`
          })
          contenedor.innerHTML = filas
      }
       function stats(datos) {
          const resultado = datos.reduce((resultado, dato) => {
              const categoria = dato.category
             
              if (!resultado.categorias.includes(categoria)) {
                  resultado.categorias.push(categoria)
                  resultado.ganancias[categoria] = 0
                  resultado.attendance[categoria] = 0
                  resultado.capacidad[categoria] = 0
              }
             
              const attendances = dato.assistance ?? dato.estimate
              
              resultado.ganancias[categoria] += dato.price * attendances
              resultado.attendance[categoria] += attendances
              resultado.capacidad[categoria] += dato.capacity
      
              return resultado
          }, { categorias: [], ganancias: {}, porcentajes: {}, attendance: {}, capacidad: {} })
      
          
          resultado.categorias.forEach(categoria => {
              resultado.porcentajes[categoria] = resultado.attendance[categoria] / resultado.capacidad[categoria] * 100
          })
          return resultado
      }
       function findMaxCapacityEvent(evento) {
          return evento.find(event => event.capacity === Math.max(...evento.map(event => event.capacity)))
      }
       function lowestAssistancePercentage(evento) {
          let lowestAssistancePercentage = Infinity
          let eventWithLowestAttendancePercentage = null
          for (let i = 0; i < evento.length; i++) {
              const assistancePercentage = ((evento[i].assistance || evento[i].estimate) / evento[i].capacity) * 100
              if (assistancePercentage < lowestAssistancePercentage) {
                  lowestAssistancePercentage = assistancePercentage
                  eventWithLowestAttendancePercentage = evento[i]
              }
          }
          return eventWithLowestAttendancePercentage;
      }
       function highestAttendancePercentage(evento) {
          let highestAttendancePercentage = 0
          let eventWithHighestAttendancePercentage = null;
          for (let i = 0; i < evento.length; i++) {
              const attendancePercentage = ((evento[i].assistance || evento[i].estimate) / evento[i].capacity) * 100
              if (attendancePercentage > highestAttendancePercentage) {
                  highestAttendancePercentage = attendancePercentage
                  eventWithHighestAttendancePercentage = evento[i];
              }
          }
          return eventWithHighestAttendancePercentage
      }

    }   )

    