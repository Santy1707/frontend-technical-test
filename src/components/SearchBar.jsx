import React, { useEffect, useState } from "react";
import { searchFlights, searchByPrice, orderByHour } from "../utils/getData";
import Modal from "./Modal";
import "./styles.css";
import logo from "../images/logo.png";

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

  // const [isOpen, setIsOpen] = useState(false);
  // const [modal, setModal] = useState(false);
  const handleInputChange = (event) => {
    console.log(event.target.value);
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

  if (!flights) {
    return <h1>Cargando...</h1>;
  }
  return (
    <div className="container">
      {/* <header className="navbar"> */}
      <div className="navbar__top">
        {/* <div className="navbar__info"> */}
        <img src={logo} width="190px" />
        <div className="navbar__search">
          <h1>Search flights</h1>
          {/* <label htmlFor="">CityFrom</label> */}
          <select name="cityFrom" id="cityFrom" onChange={handleInputChange}>
            <option>Origin</option>
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

          {/* <label htmlFor="">CityTo</label> */}
          <select
            name="cityDestination"
            id="cityDestination"
            onChange={handleInputChange}
          >
            <option>destination</option>
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
              date must be later than current date
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
          <button
            disabled={!allValuesFilled | isInvalid}
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="navbar__lat">
        <div className="navbar__lat__price">
          <h1>Filter by price</h1>
          {/* <label>Filter by prices</label> */}
          <input
            type="number"
            name="minPrice"
            placeholder="min"
            value={prices.minPrice}
            onChange={handlePricesChange}
          />
       
          <input
            type="number"
            name="maxPrice"
            placeholder="max"
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
            Filter
          </button>
        </div>
        <div className="navbar__lat__hours">
          <h1>Filter by time</h1>
          <input
            type="time"
            name="time"
            placeholder="17:05 p.m"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <p>results will be within a two hour range</p>
          <button onClick={handleOrderHour}>Filter</button>
        </div>
      </div>
      {/* </header> */}
      <div className="flights">
        <div className="flights__table">
          <div>from</div>
          <div>to</div>
          <div>price</div>
          <div>time</div>
          <div>seats</div>
          <div>date</div>
          <div></div>
        </div>
        {/* <hr></hr> */}
        {Array.isArray(searchResults) ? (
          searchResults.map((flight) => {
            return (
              <div className="flights__card" key={flight._id}>
                {/* <h2 >ID: {flight._id}</h2> */}
                <h1 className="flights__card__title">
                  <h2 className="flights__card__ms">From: &nbsp;</h2>
                  {flight.cityFrom}
                </h1>
                <h1 className="flights__card__title">
                <h2 className="flights__card__ms">To: &nbsp;</h2>
                  {/* To: */}
                  {flight.cityTo}
                </h1>
                <h2 className="flights__card__info">
                <h2 className="flights__card__ms">Price: &nbsp;</h2>
                  {/* <strong>Price: &nbsp;</strong> */}
                  $ {flight.price}
                </h2>
                <h2 className="flights__card__info">
                <h2 className="flights__card__ms">Time: &nbsp;</h2>
                  {/* <strong>Time: &nbsp;</strong> */}
                  {flight.date.slice(11, 25)}
                </h2>
                <h2 className="flights__card__info">
                <h2 className="flights__card__ms">Seats: &nbsp;</h2>
                  {flight.availableSeats}
                </h2>
                <h2 className="flights__card__info">
                <h2 className="flights__card__ms">Date: &nbsp;</h2>
                  {flight.date.slice(0, 10)}
                </h2>

                {/* the buy button displays the modal */}
                <div className="modal__button">
                  <button
                    className="modal__btn"
                    value={flight._id}
                    onClick={(e) => {
                      changeIdFlight(e);
                    }}
                  >
                    <label htmlFor="modal-toggle" className="modal-btn">
                      buy
                    </label>
                  </button>
                </div>

                {/* {index !== flights.length - 1 && <hr></hr>} */}
              </div>
            );
          })
        ) : (
          <h1>{searchResults.message}</h1>
        )}

        {/* modal  */}

        {/* <input type="checkbox" id="btn-modal"/> */}
        <div className="container-modal">
          <div className="flights__modal">
            {showModal && (
              <div className="overlay">
                <label htmlFor="modal-toggle" className="modal-toggle">
                  &times;
                </label>
                <Modal id={idFlight} setModal={setShowModal}></Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default SearchBar;
