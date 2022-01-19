

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';


export default function ButtonAppBar() {
  return (
    <Box >
      <AppBar position="fixed">
        <Toolbar>
        <Grid container spacing={1}>
        <Grid xs={1}>
        Rank
        </Grid>
        <Grid xs={1}>
        
        </Grid>
        <Grid xs={2} align="left">
        Crypto
        </Grid>
        <Grid xs={1} align="left">
        Symbol
        </Grid>
        <Grid xs={2} align="left">
        Price
        </Grid>
        <Grid xs={2} align="left">
        Market Cap
        </Grid>

        </Grid>
        </Toolbar>
      </AppBar>
      
    </Box>
  );
}