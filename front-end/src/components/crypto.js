import * as React from 'react';
import {useState} from 'react'
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


export default function Crypto({coin}) {
  const [subscribers, setSubscribers] = useState('')
  const [reddit, setReddit] = useState('')
  const [redditLink, setRedditLink] = useState('')
  
  const {market_cap_rank: rank, name, symbol, current_price: price, market_cap, image} = coin

    /* possible styling
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      })); */

      const Trends = () => {
        return (
          <>
            <h2>{name} Trends</h2>
            <div id="widget">
              <GoogleTrends
                type="TIMESERIES"
                keyword={name}
                url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
              />
              {console.log(name)}
            </div>
          </>
        );
      }

      const [trends, setTrends] = useState(Trends)
 
      //<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2790_RC04/embed_loader.js"></script>
      //<script type="text/javascript">
       // trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"bitcoin","geo":"","time":"today 12-m"}],"category":0,"property":""}, {"exploreQuery":"q=bitcoin&date=today 12-m","guestPath":"https://trends.google.com:443/trends/embed/"});
     // </script>
    
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

  return (
    <div >
      <Accordion onClick={() => statistics(name)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
            {rank}    
            </Grid>
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
            <Grid item xs={2} align="left">
                {formatter.format(price)}
            </Grid>
            <Grid item xs={2} align="left">
                {formatterMarketCap.format(market_cap)}
            </Grid>
          </Grid>

        </AccordionSummary>
        <AccordionDetails >
          <Typography>
          {`Reddit subscribers ` + subscribers}
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
        <a href={redditLink} target="_blank">r/{name} </a>
          
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}