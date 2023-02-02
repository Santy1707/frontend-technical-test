import React, { useEffect, useState } from "react";
import { searchFlights, searchByPrice } from "../utils/getData";

const SearchBar = ({flights}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [prices, setPrices] = useState({
    minPrice: 0,
    maxPrice: 0
  }) 
  const [formValues, setFormValues] = useState({
    cityFrom: '',
    cityDestination: '',
    date: '',
    passengers: '',
  });
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    setSearchResults(flights)
  }, [flights])

  const handleInputChange = (event) => {
    if (event.target.name === 'date') {
      if (event.target.valueAsNumber < Date.now()) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }
    }
    if (event.target.name === 'passengers' && event.target.value > 0){
      setFormValues({
        ...formValues,
        [event.target.name]: parseInt(event.target.value)
      });
    } else {
      setFormValues({
        ...formValues,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handlePricesChange = (event) => {
    setPrices({
      ...prices,
      [event.target.name]: event.target.value
    })
  }

  const handleSearchPrice = () => {
    const resultPrices = searchByPrice(flights, prices)
    setSearchResults(resultPrices);
  }

  const allValuesFilled = Object.values(formValues).every(value => value !== '')
  const handleSearch = () => {
    const result = searchFlights(flights, formValues)
    setSearchResults(result)
    setFormValues({
      cityFrom: '',
      cityDestination: '',
      date: '',
      passengers: '',
    })
  }

  // const handleFilters = () => {
  //     const resultFilter = filters(searchResults, filterData)
  // }

  if (!searchResults) {
    return (<h1>Cargando...</h1>)
  }
  return (
    <div>
    <div>
    <h1>Buscar vuelos</h1>
    <input
        type="text"
        name="cityFrom"
        placeholder="City From"
        value={formValues.cityFrom}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="cityDestination"
        placeholder="City Destination"
        value={formValues.cityDestination}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        invalid={isInvalid}
        value={formValues.date}
        required
        onChange={handleInputChange}
        />
        {isInvalid && <div style={{ color: "red" }}>La fecha debe ser igual o posterior a la fecha actual</div>}
      <input
        type="number"
        name="passengers"
        value={formValues.passengers}
        onChange={handleInputChange}
        min={1}
        max={322}
        />
        <button disabled={!allValuesFilled} onClick={handleSearch}>Search</button>
      </div>

      <div>
      <label>Filter by prices</label>
      <input
        type="number"
        name="minPrice"
        placeholder="min-price"
        value={prices.minPrice}
        onChange={handlePricesChange}
        />
      <input
        type="number"
        name="maxPrice"
        placeholder="max-price"
        value={prices.maxPrice}
        onChange={handlePricesChange}
        />
        <button onClick={handleSearchPrice}> Filtrar </button>
      </div>


      <div>
        {Array.isArray(searchResults) ? searchResults.map( (flight) => {
          return (
            <div key={flight._id}>
              <h1 >From: {flight.cityFrom}</h1>
              <h2>To: {flight.cityTo}</h2>
              <h2>Price: {flight.price}</h2>
              <h2>Hora: {flight.date.slice(11, 25)}</h2>
              <h2>Date: {flight.date.slice(0, 10)}</h2>
              <h2>AvailableSeats: {flight.availableSeats}</h2>
            </div> 
          )
        }) : <h1>{searchResults.message}</h1> }
      </div>
    </div>
  );
}

export default SearchBar;
