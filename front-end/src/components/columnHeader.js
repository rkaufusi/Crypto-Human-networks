import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

export default function ColumnHeader() {
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
            <Grid xs={2.5} align="left">
              Price
            </Grid>
            <Grid xs={2} align="left">
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