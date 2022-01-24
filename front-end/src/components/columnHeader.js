import * as React from 'react';
import {useState,useEffect} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

export default function ColumnHeader() {
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

  return (
    <Box >
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={1}>
          {width > 800 ? <Grid xs={1}>
            Rank  
          </Grid> : <Grid xs={0}/>}

            <Grid xs={1}>
            </Grid>
            <Grid xs={2} align="left">
              Crypto
            </Grid>
            {width > 800 ? <Grid xs={1} align="left">
            Symbol  
          </Grid> : <Grid xs={0}/>}
            <Grid xs={2.5} align="left">
              Price
            </Grid>
            <Grid xs={2.5} align="left">
              Market Cap
            </Grid>
            <Grid xs={2} align="left">
              24 hour volume
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
    </Box>
  );
}