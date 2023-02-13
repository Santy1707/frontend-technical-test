import React, { useEffect, useState } from "react";
import { getFlightId, exChangeRate } from "../utils/getData";

const Modal = ({ id, setModal }) => {
  const [detail, setDetailFlight] = useState();
  const [buttonBuy, setButtonBuy] = useState(true);
  const [buyFlight, setBuyFlight] = useState({
    currency: "",
    indatumMiles: "",
    finalPrice: "",
    ...detail,
  });

  useEffect(() => {
    if (id) {
      const flightId = async () => {
        const idFlight = await getFlightId(id);
        setDetailFlight(idFlight);
      };
      flightId();
    }
  }, [id]);

  const handleCurrency = async (event) => {
    setButtonBuy(false);
    const gainedMiles = Math.round(detail.price / 1.67);
    const priceFinal = await exChangeRate();
    const COPrate = priceFinal.conversion_rates.COP;
    setBuyFlight({
      ...buyFlight,
      ...detail,
      currency: event.target.value,
      finalPrice: Math.round(
        event.target.value === "COP" ? COPrate * detail.price : detail.price
      ),
      indatumMiles: gainedMiles,
    });
  };

  const handleSaveData = () => {
    localStorage.setItem(
      "indatum-flights-reservation",
      JSON.stringify(buyFlight)
    );
  };

  if (!detail) {
    return <h1>Loading......</h1>;
  }
  return (
    <article className="container-modal1">
      

      <input type="checkbox" className="modal-container" id="modal-btn" />
      <h2>Origin: {detail.cityFrom}</h2>
      <h2>Destination: {detail.cityTo}</h2>
      <h3>Price: {detail.price}</h3>
      <h3>Date {detail.date.slice(0, 10)}</h3>
      <h3>Time: {detail.date.slice(11, 25)}</h3>
      <select name="currency" id="" onChange={handleCurrency}>
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
        <option value="COP">COP</option>
      </select>
      <h4>
        Total:{" "}
        {buyFlight.finalPrice !== "" ? (
          <p>
            {buyFlight.currency}: {buyFlight.finalPrice}
          </p>
        ) : (
          <p>
            {buyFlight.currency}: {detail.price}
          </p>
        )}
      </h4>
      <p>You have gained {buyFlight.indatumMiles} miles</p>
      <p>Select currency</p>
      <button disabled={buttonBuy} onClick={handleSaveData}>
        Buy
      </button>

      {/* <button className="modal-close" onClick={() => {setModal(false); setIsOpen(false)} }>cancel</button> */}

      <button className="modal__close" onClick={() => setModal(false)}>
        Cancel
      </button>
    </article>
  );
};

export default Modal;
