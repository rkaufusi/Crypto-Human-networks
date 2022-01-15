import './App.css';
import Crypto from './components/crypto.js'
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [currency, setCurrency] = useState([])
  const coinGeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  const [search, setSearch] = useState('')

  // QfdjLn4WrJdC1iIhYA_a1w
  // secret ImpKTLCbEUI5enMfipsd0sNnjVwReg

  useEffect(()=> {
    axios.get(coinGeckoUrl).then((response) => {
      setCurrency(response.data)
      console.log(currency)
    }).catch(error => console.log(error))
  },[])

  const filtered = currency.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));
/*      {filtered.map((value, id) => {
        return <Crypto coin={value} testCurrency={currency}/>
      })} */
      console.log(filtered           )
  return (
    <div className="App">
    {filtered.map((value, id) => {
      return <Crypto coin={value}/>
    })}
    </div>
  );
}

export default App;
