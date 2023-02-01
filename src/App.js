import './App.css';
import { useEffect, useState } from 'react';
import { getData } from './utils/getData';
import SearchBar from './components/SearchBar';

function App() {
  const [dataGlobal, setdataGlobal] = useState()

  useEffect(() => {
    const data = async () => {
      const info = await getData()
      setdataGlobal(info)
    }
    data()
  }, [])

  return (
    <div className="App">
      <SearchBar flights={dataGlobal}></SearchBar>
    </div>
  );
}

export default App;
