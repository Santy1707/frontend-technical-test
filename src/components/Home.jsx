import { useEffect, useState } from "react";
import { getData } from "../utils/getData";
import SearchBar from "./SearchBar";

export const Home = () => {

  /**
   * Suma dos números.
   * 
   * @useState Estado con la informacion que retorna la funcion getData que hacer el llamado a la API
   * @useEffect cuando se monta el componente ejecutamos una función asyncrona donde hacemos el llamado a la API por medio 
   * de la función getData, el resultado lo guardamos en el estado dataGlobal
   * @returns {html} retornamos el componente SearchBar dentro de un div.
   */

  const [dataGlobal, setdataGlobal] = useState([]);
  useEffect(() => {
    const data = async () => {
      const info = await getData();
      setdataGlobal(info);
    };
    data();
  }, []);

  return (
    <div className="App">
      <SearchBar flights={dataGlobal}></SearchBar>
    </div>
  );
};
