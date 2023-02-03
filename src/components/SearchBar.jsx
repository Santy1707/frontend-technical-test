import React, { useEffect, useState } from "react";
import {
  searchFlights,
  searchByPrice,
  orderByHour,
  getFlightId,
} from "../utils/getData";
import Modal from "./Modal";

const SearchBar = ({ flights }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState([]);
  const [hour, setHour] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idFlight, setIdFlight] = useState("");
  const [prices, setPrices] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const [formValues, setFormValues] = useState({
    cityFrom: "",
    cityDestination: "",
    date: "",
    passengers: "",
  });
  const [isInvalid, setIsInvalid] = useState(false);
  useEffect(() => {
    setSearchResults(flights);
    setFilters(flights);
  }, [flights]);

  const handleInputChange = (event) => {
    if (event.target.name === "date") {
      if (event.target.valueAsNumber < Date.now()) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }
    }
    if (event.target.name === "passengers" && event.target.value > 0) {
      setFormValues({
        ...formValues,
        [event.target.name]: parseInt(event.target.value),
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
      [event.target.name]: event.target.value,
    });
  };

  const changeIdFlight = (event) => {
    setIdFlight(event.target.value);
    setShowModal(true);
  };

  const handleSearchPrice = () => {
    const resultPrices = searchByPrice(filters, prices);
    setSearchResults(resultPrices);
  };

  const handleOrderHour = () => {
    const hourFilter = orderByHour(filters, hour);
    setSearchResults(hourFilter);
  };

  const allValuesFilled = Object.values(formValues).every(
    (value) => value !== ""
  );
  const allValuesPriceFilled = Object.values(prices).every(
    (value) => value !== ""
  );
  const priceError =
    parseInt(prices.maxPrice) < parseInt(prices.minPrice) ? true : false;
  const handleSearch = () => {
    const result = searchFlights(filters, formValues);
    setSearchResults(result);
    setFilters(result);
    setFormValues({
      cityFrom: "",
      cityDestination: "",
      date: "",
      passengers: "",
    });
  };

  if (!filters.length) {
    return <h1>Cargando...</h1>;
  }
  return (
    <div>
      <div>
        <h1>Buscar vuelos</h1>
        <label htmlFor="">CityFrom</label>
        <select name="cityFrom" id="cityFrom" onChange={handleInputChange}>
          <option>Ciudad de partida</option>
          {flights?.map((flight) => {
            return (
              <>
                <option
                  placeholder="City From"
                  name="cityFrom"
                  key={flight._id}
                  value={flight.cityFrom}
                >
                  {flight.cityFrom}
                </option>
              </>
            );
          })}
        </select>

        <label htmlFor="">CityTo</label>
        <select
          name="cityDestination"
          id="cityDestination"
          onChange={handleInputChange}
        >
          <option>Ciudad de destino</option>
          {flights?.map((flight) => {
            return (
              <>
                <option
                  placeholder="City To"
                  name="cityDestination"
                  key={flight._id}
                  value={flight.cityTo}
                >
                  {flight.cityTo}
                </option>
              </>
            );
          })}
        </select>

        <input
          type="date"
          name="date"
          placeholder="Date"
          invalid={isInvalid}
          value={formValues.date}
          required
          onChange={handleInputChange}
        />
        {isInvalid && (
          <div style={{ color: "red" }}>
            La fecha debe ser igual o posterior a la actual
          </div>
        )}
        <input
          type="number"
          name="passengers"
          placeholder="seats"
          value={formValues.passengers}
          onChange={handleInputChange}
          min={1}
          max={322}
        />
        <button disabled={!allValuesFilled | isInvalid} onClick={handleSearch}>
          Search
        </button>
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
        {priceError && (
          <div
            style={{ color: "red" }}
          >{`El precio maximo elegido: ${prices.maxPrice} debe ser mayor al precio minimo elegido: ${prices.minPrice}`}</div>
        )}
        <button
          disabled={!allValuesPriceFilled | priceError}
          onClick={handleSearchPrice}
        >
          {" "}
          Filtrar{" "}
        </button>

        <div>
          <input
            type="time"
            name="time"
            placeholder="17:05 p.m"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <p>Los resultados seran de un rango de dos horas</p>
          <button onClick={handleOrderHour}>Buscar por hora</button>
        </div>
      </div>

      <div>
        {Array.isArray(searchResults) ? (
          searchResults.map((flight) => {
            return (
              <div key={flight._id}>
                <h2>ID: {flight._id}</h2>
                <h1>From: {flight.cityFrom}</h1>
                <h2>To: {flight.cityTo}</h2>
                <h2>Price: {flight.price}</h2>
                <h2>Hora: {flight.date.slice(11, 25)}</h2>
                <h2>AvailableSeats: {flight.availableSeats}</h2>
                <h2>Date: {flight.date.slice(0, 10)}</h2>
                {/* Renderizado condicional del modal, XD */}
                <button value={flight._id} onClick={(e) => changeIdFlight(e)}>
                  Purchase
                </button>
              </div>
            );
          })
        ) : (
          <h1>{searchResults.message}</h1>
        )}
      </div>
      <div>
        {showModal && <Modal id={idFlight} setModal={setShowModal}></Modal>}
      </div>
    </div>
  );
};

export default SearchBar;
