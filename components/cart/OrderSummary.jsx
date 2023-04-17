import { Divider, Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>3</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{`$${155}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{`$${34.50}`}</Typography>
        </Grid>
        
        <Grid item xs={6} sx={{mt: 2}}>
            <Typography variant="subtitle1">Total</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}  sx={{mt: 2}}>
            <Typography>{`$${200.00}`}</Typography>
        </Grid>
      
    </Grid>
  )};