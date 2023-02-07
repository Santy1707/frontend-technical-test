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
    return <h1>Cargando......</h1>;
  }
  return (
    <div>
      <h2>Ciudad de salida: {detail.cityFrom}</h2>
      <h2>Ciudad de destino: {detail.cityTo}</h2>
      <h2>Precio: {detail.price}</h2>
      <h2>Fecha {detail.date.slice(0, 10)}</h2>
      <h2>Hora: {detail.date.slice(11, 25)}</h2>
      <select name="currency" id="" onChange={handleCurrency}>
        <option value="">Select Currency</option>
        <option value="USD">USD</option>
        <option value="COP">COP</option>
      </select>
      <h4>
        Final price:{" "}
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
      <p>Antes de comprar selecciona el tipo de moneda</p>
      <button disabled={buttonBuy} onClick={handleSaveData}>
        Comprar
      </button>
      <button onClick={() => setModal(false)}>Cancel</button>
    </div>
  );
};

export default Modal;
