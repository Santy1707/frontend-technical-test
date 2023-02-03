import { useEffect, useState } from "react";
import { getData } from "../utils/getData";
import SearchBar from "./SearchBar";

export const Home = () => {
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
      <h1>Hola mundo</h1>
      <SearchBar flights={dataGlobal}></SearchBar>
    </div>
  );
};
