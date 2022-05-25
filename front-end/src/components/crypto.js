import * as React from 'react';
import {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleTrends from './GoogleTrends.js'
// grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import data from '../data.js'
import {useWindowSize} from '../windowSize.js'
import Chart from './chart.js'

export default function Crypto({coin}) {
  const [subscribers, setSubscribers] = useState('')
  const [redditLink, setRedditLink] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [priceHistory, setPriceHistory] = useState([])
  const width = useWindowSize();

  const handleChange = (panel, searchVal) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      history(searchVal)
      statistics(panel) 
  };


 

  
  const {id, market_cap_rank: rank, name, symbol, current_price: price, market_cap, image, total_volume: volume} = coin

  const history = async (val) => {
    let dateVal = new Date()
    let tillDate = Math.floor(dateVal.getTime() / 1000)
    let fromDate = Math.floor((tillDate / 1000) - 7952400)
    //let pHistory = `https://api.coingecko.com/api/v3/coins/${val.toLowerCase()}/market_chart/range?vs_currency=usd&from=1650235010&to=1653513936`
    let pHistory = `https://api.coingecko.com/api/v3/coins/${val.toLowerCase()}/market_chart/range?vs_currency=usd&from=${fromDate}&to=${tillDate}`

    try {
      const response = await fetch(pHistory)
      const myData = await response.json()
      setPriceHistory(myData.market_caps)
    } catch (error) {
      console.log(`price history ` + error)
    }
  }
    
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const formatterMarketCap = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  })

  const statistics = async (name) => {
    let reddit = ''
    data.map((value) => {
      if(value.name === name) {
        reddit = `https://www.reddit.com/r/${value.searchTerm}/about.json`
        setRedditLink(`https://www.reddit.com/r/${value.searchTerm}`)
      }
    })
    if(reddit === ''){
      reddit = `https://www.reddit.com/r/${name}/about.json`
      setRedditLink(`https://www.reddit.com/r/${name}`)
    }
    try {
      const response = await fetch(reddit)
      const myData = await response.json()
      setSubscribers(myData.data.subscribers.toLocaleString("en-US"))
    } catch (error) {
        console.log(error);
        setSubscribers('No Data')
      }
  }

  const onViewWidth = (val) => { 
    if(width < 860){
      let temp = val.toString()
      let toReturn = 0
      let final = ['.']

      if(temp.length > 9){
        toReturn = temp.length - 9
        let toString = temp.split('')
        for(let i = toReturn - 1; i >= 0; i--){
          final.unshift(toString[i])
        }
        final.push(toString[3])
        final.push(toString[4])
        return '$' + final.join('') + 'B'
      } 
      if(temp.length <= 9 && temp.length > 6) {
        let toString = temp.split('')
        let num = temp.length - 6
        for(let i = num - 1; i >= 0; i--){
          final.unshift(toString[i])
        }
        final.push(toString[3])
        final.push(toString[4])
        return '$' + final.join('') + 'M'
        }
      }
      return formatterMarketCap.format(val)
    }

  return (
    <div>
      <Accordion onChange={handleChange(name, id)} expanded={expanded === name}>
        <AccordionSummary
          expandIcon={width > 800 ? <ExpandMoreIcon /> : null}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={2}>
            {width > 800 ? <Grid item xs={1}>
            {rank}   
            </Grid> : <Grid item xs={0}/>}
  
            <Grid item xs={1}>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25,
                }}
                alt=""
                src={image}
              />
            </Grid>
            <Grid item xs={2} align="left">
              {name} 
            </Grid>
              {width > 800 ? <Grid item xs={1} align="left">
              {symbol.toUpperCase()}
              </Grid> : <Grid item xs={0}/>}

            <Grid item xs={2.5} align="left">
              {formatter.format(price)}
            </Grid>
            <Grid item xs={2.5} align="left">
            {width > 860 ? formatterMarketCap.format(market_cap) : onViewWidth(market_cap)}
          </Grid>           
            <Grid item xs={2} align="left">           
            {width > 800 ? formatterMarketCap.format(volume) : onViewWidth(volume)}
          </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails >
          <Grid container spacing={1}>
            <Grid item xs={2} align="center">
              <Box
                component="img"
                sx={{
                  height: 40,
                  width: 40,
                }}
                alt=""
                src='https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png'
              />   
          </Grid>
          <Grid item xs={3} align="left">
            {`Reddit subscribers ` + subscribers}    
          </Grid>
        <Grid item xs={3} align="left">
        <a href={redditLink} target="_blank">r/{name} </a>   
      </Grid>
      <Grid item xs={6} align="left">
      {expanded && (      
        <div>
        <h3>Google Trends</h3>
        <div id={expanded ? expanded : ''}>
          <GoogleTrends
            searchVal={expanded}
            type="TIMESERIES"
            keyword={name}
            url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
          />
        </div>

      </div>)}
      </Grid>
      <Grid item xs={6}>
      <h3>Market Cap History</h3>
      <Chart ph={priceHistory ? priceHistory : ''}/>
    </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
  );
}