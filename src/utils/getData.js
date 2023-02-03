async function getData () {
  try {
    const url = "https://flights-api-production.up.railway.app/api/flights"
    const data = await fetch(url)
    .then(res => res.json())
    return sortPrice(data)
  } catch (error) {
    console.log(error)
  }
}

function sortPrice(flights) {
  const sortPrices = flights.sort((a, b) => a.price - b.price )
  return sortPrices
}


function searchFlights(flights, data){
  const flightsResult = flights.filter( (flight) =>
    flight.availableSeats > data.passengers &&
    flight.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityFrom.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) && 
    flight.cityTo.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(data.cityDestination.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) &&
    flight.date.slice(0, 10) === data.date
  )
  return flightsResult.length ? flightsResult : {message: 'No hay vuelos disponibles'}
}

function searchByPrice( stateFlights, prices ){ 
  const result = stateFlights.filter( (flight) => flight.price >= prices.minPrice && flight.price <= prices.maxPrice )
  return result.length ? result : {message: 'No hay vuelos para ese rango de precios'}
}

function orderByHour( stateFlights, orderType) {
  const orderHour = orderType === '00:24' ? 
  stateFlights.sort((a, b) => a.date.slice(11, 19).split(':').join('') - b.date.slice(11, 19).split(':').join(''))
  :
  stateFlights.sort((a, b) => b.date.slice(11, 19).split(':').join('') - a.date.slice(11, 19).split(':').join(''))
  
  return orderHour
}

export { getData, searchFlights, sortPrice, searchByPrice, orderByHour };
