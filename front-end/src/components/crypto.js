import * as React from 'react';
import {useState, useEffect} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleTrends from './GoogleTrends.js'
// grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import data from '../data.js'
import {useWindowSize} from '../windowSize.js'

export default function Crypto({coin}) {
  const [subscribers, setSubscribers] = useState('')
  const [reddit, setReddit] = useState('')
  const [redditLink, setRedditLink] = useState('')
  const [expanded, setExpanded] = useState(false);
  const [priceHistory, setPriceHistory] = useState([])
  const width = useWindowSize();

  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      statistics(panel)
      history(panel)
  };
  
  const {market_cap_rank: rank, name, symbol, current_price: price, market_cap, image, total_volume: volume} = coin
 
    /* possible styling
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      })); */

  const history = async (val) => {
    let pHistory = `https://api.coingecko.com/api/v3/coins/${val.toLowerCase()}/market_chart/range?vs_currency=usd&from=1611387323&to=1642923323`
    try {
      const response = await fetch(pHistory)
      const myData = await response.json()
      setPriceHistory(myData.market_caps)  
    } catch (error) {
      console.log(error)
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
      <Accordion onChange={handleChange(name)} expanded={expanded === name}>
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
                  maxHeight: { xs: 25, md: 25 },
                  maxWidth: { xs: 25, md: 25 },
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
        <AccordionDetails onChange={() => console.log(priceHistory)}>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Box
                component="img"
                sx={{
                  height: 25,
                  width: 25,
                  maxHeight: { xs: 25, md: 25 },
                maxWidth: { xs: 25, md: 25 },
                }}
                alt=""
                src='https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png'
              />   
          </Grid>
          <Grid item xs={3}>
            {`Reddit subscribers ` + subscribers}    
          </Grid>
        <Grid item xs={2} align="left">
        <a href={redditLink} target="_blank">r/{name} </a>   
      </Grid>
      <Grid item xs={7} align="left">
      {expanded && (      
        <div>
        <h3>{name} Trends</h3>
        <div id={expanded ? expanded : ''}>
          <GoogleTrends
            searchVal={expanded}
            type="TIMESERIES"
            keyword={name}
            url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
          />
        </div>
        <div>
          {priceHistory}
        </div>
      </div>)}
      </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
  );
}