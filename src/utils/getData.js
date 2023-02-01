async function getData () {
  const url = "https://flights-api-production.up.railway.app/api/flights"
    const data = await fetch(url)
    .then (res => res.json())
    return data
}

function searchFlights(flights, data){
  const flightsResult = flights.filter( (flight) =>
    flight.availableSeats > data.passengers && 
    flight.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) && 
    flight.cityTo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityDestination.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
    parseInt(flight.date.slice(0, 10).split('-').join(''), 10) < data.date
  )
  return flightsResult.length ? flightsResult : {message: 'Sin resultados de busqueda, XD'}
}

export { getData, searchFlights };
