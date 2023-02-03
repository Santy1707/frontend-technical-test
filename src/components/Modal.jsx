import React, { useEffect, useState } from "react";
import { getFlightId } from "../utils/getData";

const Modal = ({ id, setModal }) => {
  const [detail, setDetailFlight] = useState();
  useEffect(() => {
    if (id) {
      const flightId = async () => {
        const idFlight = await getFlightId(id);
        setDetailFlight(idFlight);
      };
      flightId();
    }
  }, [id]);
  console.log(detail);

  if (!detail) {
    return <h1>Cargando......</h1>;
  }
  return (
    <div>
      <h1>Esto es el modal, jajajaja XD</h1>
      <h2>Ciudad de salida: {detail.cityFrom}</h2>
      <h2>Ciudad de destino. {detail.cityTo}</h2>
      <h2>Precio: {detail.price}</h2>
      <h2>Fecha {detail.date.slice(0, 10)}</h2>
      <h2>Hora: {detail.date.slice(11, 25)}</h2>
      <button onClick={() => setModal(false)}>Cancel</button>
    </div>
  );
};

export default Modal;
