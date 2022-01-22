import './App.css';
import Crypto from './components/crypto.js'
import {useState, useEffect} from 'react'
import axios from 'axios'
import ColumnHeader from './components/columnHeader.js'

function App() {
  const [currency, setCurrency] = useState([])
  const [search, setSearch] = useState('')

  const coinGeckoUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=110&page=1&sparkline=false'

  useEffect(()=> {
    axios.get(coinGeckoUrl).then((response) => {
      setCurrency(response.data)
      //console.log(currency)
    }).catch(error => console.log(error))
  },[]) 

  const testUrl = 'https://www.reddit.com/r/bitcoin/about.json'

  const handleChange = (e) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const filtered = currency.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
    <ColumnHeader/>
    <input type='text' placeholder='Search' onChange={handleChange} value={search} />
    {filtered.map((value, id) => {
      return <Crypto coin={value}/>
    })}
    </div>
  );
}

export default App;
