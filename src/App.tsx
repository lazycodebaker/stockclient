import React, { useEffect } from "react";
import Accordion from "./components/Accordion"
import { Stock } from "./d";
import axios from "axios";

const App: React.FC = () => {

  const [stocks, setStocks] = React.useState<Stock[]>([]);

  useEffect(() => {
    axios.get<Stock[]>("https://stockserver-r9qz.onrender.com/api/stocks").then(({ data }) => {
      setStocks(data);
    })
  }, [])

  return (
    <>
      <nav className="w-full bg-gray-900 h-12 px-4 flex items-center">
        <h1 className="text-gray-50 text-2xl">Stock Price Track</h1>
      </nav>

      <div className="w-full pt-16 sm:px-24 px-2 bg-gray-100 h-screen overflow-y-scroll">

        {
          stocks.map((stock) => (
            <Accordion key={stock.name} stock={stock} />
          ))
        }
      </div>

    </>
  )
}

export default App