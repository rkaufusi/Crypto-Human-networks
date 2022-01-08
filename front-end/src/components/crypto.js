import * as React from 'react';
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

export default function Crypto({coin}) {

    const {market_cap_rank: rank, name, symbol, current_price: price, market_cap} = coin

    console.log(rank, name, symbol, price, market_cap);

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

      /* 
      import * as React from 'react';
      import { DataGrid } from '@mui/x-data-grid';

        export default function RowsGrid() {
            return (
            <div style={{ height: 250, width: '100%' }}>
            <DataGrid
                columns={[{ field: 'name' }]}
                rows={[
          { id: 1, name: 'React' },
          { id: 2, name: 'MUI' },
        ]}
      />
    </div>
  );
}*/

/*          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            justtify="space-around"
            alignItems="center"
        >
            <Item> <Typography>{rank}</Typography></Item>

            <Item> <Typography>{name}</Typography></Item>
            <Item> <Typography>{symbol}</Typography></Item>
            <Item> <Typography>{price}</Typography></Item>
            <Item> <Typography>{market_cap}</Typography></Item>

        </Grid>
        */

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Item>{rank}</Item>
            </Grid>
            <Grid item xs={2}>
                <Item>{name}</Item>
            </Grid>
            <Grid item xs={1}>
                <Item>{symbol}</Item>
            </Grid>
            <Grid item xs={3}>
                <Item>{price}</Item>
            </Grid>
            <Grid item xs={3}>
                <Item>{market_cap}</Item>
            </Grid>
        </Grid>

        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}