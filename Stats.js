import {url} from "./modulos/funciones";

fetch(url)
.then(response => response.json())
.then(data =>{
document.addEventListener('DOMContentLoaded', function() {
  fillStatsTable(data.events, data.currentDate);
});
function fillStatsTable(events, currentDate) {
  const statsSection = document.querySelector('table.table > tbody');
  statsSection.innerHTML = '';
  // Obtener estadísticas de eventos
  const stats = calculateStats(events, currentDate);
  // Llenar la sección de estadísticas
  insertStatsData(statsSection, stats);
  // Obtener y llenar la sección de eventos próximos
  const upcomingEvents = getUpcomingEvents(events, currentDate);
  insertEventData(statsSection, upcomingEvents, 'Upcoming Events');
  // Obtener y llenar la sección de eventos pasados
  const pastEvents = getPastEvents(events, currentDate);
  insertEventData(statsSection, pastEvents, 'Past Events');
}
function calculateStats(events) {
  // Aquí debes calcular las estadísticas de tus eventos. 
  let highestAttendanceEvent = events[0];
  let lowestAttendanceEvent = events[0];
  let largestCapacityEvent = events[0];
  events.forEach(event => {
    if(event.assistance && event.assistance > highestAttendanceEvent.assistance) {
      highestAttendanceEvent = event;
    }
    
    if(event.assistance && event.assistance < lowestAttendanceEvent.assistance) {
      lowestAttendanceEvent = event;
    }
    
    if(event.capacity && event.capacity > largestCapacityEvent.capacity) {
      largestCapacityEvent = event;
    }
  });
  return {
    highestAttendance: highestAttendanceEvent.name,
    lowestAttendance: lowestAttendanceEvent.name,
    largestCapacity: largestCapacityEvent.name
  };
}
function getUpcomingEvents(events, currentDate) {
  return events.filter(event => new Date(event.date) >= new Date(currentDate));
}
function getPastEvents(events, currentDate) {
  return events.filter(event => new Date(event.date) < new Date(currentDate));
}
function insertStatsData(parentElement, stats) {
  parentElement.innerHTML += `
    <tr class="estilo">
      <td class="fw-bold">Event with the highest percentage of attendance</td>
      <td class="fw-bold">Event with the lowest percentage of attendance</td>
      <td class="fw-bold">Event with larger capacity</td>
    </tr>
    <tr>
      <td class="text-body-secondary">${stats.highestAttendance}</td>
      <td class="text-body-secondary">${stats.lowestAttendance}</td>
      <td class="text-body-secondary">${stats.largestCapacity}</td>
    </tr>
  `;
}
function insertEventData(parentElement, events, eventType) {
  parentElement.innerHTML += `
    <tr>
      <th colspan="3" class="tbody-title text-center">${eventType}</th>
    </tr>
  `;
  
  events.forEach(event => {
    parentElement.innerHTML += `
      <tr class="estilo">
        <td>${event.name}</td>
        <td>${event.date}</td>
        <td>${event.place}</td>
      </tr>
    `;
  });
}})