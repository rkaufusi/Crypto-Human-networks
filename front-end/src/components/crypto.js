import * as React from 'react';
import {useState} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  const {market_cap_rank: rank, name, symbol, current_price: price, market_cap, image} = coin

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

      const redditData = (searchName) => {
        data.map((value) => {
          if(value.name === searchName) {
            setReddit(`https://www.reddit.com/r/${value.searchTerm}/about.json`)
          }
        })
        if(reddit === ''){
          setReddit(`https://www.reddit.com/r/${searchName}/about.json`)
        }
      }


      const statistics = async (name) => {
        console.log(`HERE`);
        redditData(name)
        try {
            const response = await fetch(reddit)
            const myData = await response.json()
            setSubscribers(myData.data.subscribers.toLocaleString("en-US"))
          } catch (error) {
            console.log(error);
            setSubscribers('No Data')
          }
        console.log(`checking for ` + name)
        console.log(`number of subscribers ` + subscribers)
      }

  return (
    <div>
      <Accordion onClick={() => statistics(name)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Grid container spacing={2} >
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
        <AccordionDetails>
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
          src={image}
        />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}