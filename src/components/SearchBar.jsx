import React, { useState } from "react";
import { searchFlights } from "../utils/getData";

const SearchBar = ({flights}) => {
  const [searchResults, setSearchResults] = useState([]);

  const [formValues, setFormValues] = useState({
    cityFrom: '',
    cityDestination: '',
    date: '',
    passengers: '',
  });

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = () => {
    console.log(flights)
    console.log(formValues)
    const result = searchFlights(flights, formValues)
    console.log(result)
    setSearchResults(result)
    setFormValues({
      cityFrom: '',
      cityDestination: '',
      date: '',
      passengers: "",
    })
  }

  return (
    <div>
    <div>
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
        type="text"
        name="date"
        placeholder="Date"
        value={formValues.date}
        onChange={handleInputChange}
        />
      <input
        type="number"
        name="passengers"
        placeholder="Seats"
        value={formValues.passengers}
        onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {Array.isArray(searchResults) ? searchResults.map( (flight) => {
          return (
            <div key={flight._id}>
              <h1 >From: {flight.cityFrom}</h1>
              <h2>To: {flight.cityTo}</h2>
              <h2>Date: {flight.date.slice(0, 10)}</h2>
              <h2>AvailableSeats: {flight.availableSeats}</h2>
            </div> 
          )
        }) : <h1>{searchResults.message}</h1>}
      </div>
    </div>
  );
}

export default SearchBar;
