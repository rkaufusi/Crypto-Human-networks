import * as React from 'react';
import {useState, useEffect} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GoogleTrends from './GoogleTrends.js'
//import Trends from './Trends.js'
// grid
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import data from '../data.js'
import ColumnHeader from './columnHeader.js'

export default function Crypto({coin}) {
  const [subscribers, setSubscribers] = useState('')
  const [reddit, setReddit] = useState('')
  const [redditLink, setRedditLink] = useState('')
  const [expanded, setExpanded] = useState(false);
  

  const handleChange = (panel) => (event, isExpanded) => {
      console.log(panel);
      console.log(isExpanded);

      setExpanded(isExpanded ? panel : false);
      statistics(panel)
  };
  
  const {market_cap_rank: rank, name, symbol, current_price: price, market_cap, image, total_volume: volume} = coin
 
    /* possible styling
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      })); */
    
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


  const useWindowSize = () => {
    const [size, setSize] = useState(window.innerWidth)
    useEffect(() => {
      const handleResize = () => {
        setSize(window.innerWidth)
      }
      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [])
    return size
  }

  const width = useWindowSize();

  //console.log(width)

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
        //let temp = market_cap.toString()
        let temp = val.toString()

        let toReturn = 0
        let final = ['.']
        console.log(temp.length)
        if(temp.length > 9){
          toReturn = temp.length - 9
        console.log(toReturn)
        let toString = temp.split('')
        for(let i = toReturn - 1; i >= 0; i--){
          final.unshift(toString[i])
        }
        final.push(toString[3])
        final.push(toString[4])
        console.log(final.join('') + 'B')
        return '$' + final.join('') + 'B'
        } 
        if(temp.length <= 9 && temp.length > 6) {
          console.log(`here`)
          let toString = temp.split('')
          let num = temp.length - 6
          for(let i = num - 1; i >= 0; i--){
            final.unshift(toString[i])
          }
          final.push(toString[3])
          final.push(toString[4])
          console.log(final.join('') + 'M', name)
          return '$' + final.join('') + 'M'
        }
      }
      // 12 123,456,789,123
      // 11 12,345,678,91
      return formatterMarketCap.format(val)
    }

    //onViewWidth()

  
  return (
    <div>
      <Accordion onChange={handleChange(name)} expanded={expanded === name}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
            <Grid item xs={1} align="left">
              {symbol.toUpperCase()}
            </Grid>
            <Grid item xs={2.5} align="left">
              {formatter.format(price)}
            </Grid>
            <Grid item xs={2} align="left">
            {width > 860 ? formatterMarketCap.format(market_cap) : onViewWidth(market_cap)}
          </Grid>
            
            <Grid item xs={2} align="left">
            
            {width > 800 ? formatterMarketCap.format(volume) : onViewWidth(volume)}
          </Grid>
          </Grid>

        </AccordionSummary>
        <AccordionDetails >
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
      </div>)}
      </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      </div>
  );
}